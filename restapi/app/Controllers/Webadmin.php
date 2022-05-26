<?php namespace App\Controllers;
use App\Models\Webmodel;
use CodeIgniter\Controller;
use Symfony\Component\Config\Definition\Exception\Exception;
//define('webmodel', 'adf');
class Webadmin extends Controller
{
    protected $token_expire_time = 3600; //3600
    private $webmodel;
    function __construct()
    {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        header("Content-Type: application/json");
        header("X-XSS-Protection: 0");
        header('X-Content-Type-Options: nosniff');
        $this->webmodel = new Webmodel();
        $this->checkEntryLevel();
    }
    public function index()
    {
        echo 'Web Services.!' . '<br>';
    }
    public function ShowMyHeader(){
        $headers = array();
        foreach($_SERVER as $key => $value) {
            if (substr($key, 0, 5) <> 'HTTP_') {
               continue;
            }
            $header = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
            $headers[$header] = $value;
        }
        // foreach ($headers as $header => $value) {
        //     echo "$header: $value <br />\n";
        // }
    }
	
	// 'changepassword','getAllCompanies','getAllParticipants','getAllPlan','getAllContest','addparticipant','editparticipant','deleteparticipants','addcompany','addcontest','editcompany','deletecompany','editplan','addplan','editcontest','deletecontest','getAllFaq','deleteFaq','editFaq','addFaq'
    private function checkEntryLevel() {
        $uri = current_url(true);
        //echo $uri.'hii its a url';
        $listOfChkJWT=['adminLogin','changepassword','getAllCompanies','getAllParticipants','getAllPlan','getAllContest','addparticipant','editparticipant','deleteparticipants','addcompany','addcontest','editcompany','deletecompany','editplan','addplan','editcontest','deletecontest','getAllFaq','deleteFaq','editFaq','addFaq'];
        $currReqAction=$uri->getSegment(2);
        if (array_key_exists('HTTP_AUTHORIZATION', $_SERVER)) {
            $header = $_SERVER["HTTP_AUTHORIZATION"];
        } else {
            $header = '';
        }
        
        if (in_array($currReqAction,$listOfChkJWT) && in_array(strtolower($_SERVER["REQUEST_METHOD"]),["post","get"])) {
            
            // if exist, should check
            try {
                require __DIR__ . './../Libraries/Authorization_Token.php';
            } catch (Exception $e) {
                print_r($e);
                exit;
            }
            $auth = new \Authorization_Token();
            if (isset($header) && $header!="") {
                $validatedResult = $auth->validateToken(true);  
            }
            else {
                http_response_code(401);
                header('Content-Type: application/json');
                $data_insert=array(
                    "status" => "authentication_error",
                    "message" => "Unauthorized request."
                );
                echo json_encode($data_insert);
                die();
            }
        }
    }	
    public function adminLogin()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userName = $request->user_name;
            $password = $request->user_password;
            $retryAvailable = true;
            $throttle = \Config\Services::throttler();
            $allow = $throttle->check( $this->request->getIPAddress(), 40, 300);
            if(!$allow['status']){
                $minutes = floor(($allow['time'] / 60) % 60);
                $seconds = $allow['time'] % 60;
                if($minutes<1){
                    $minutes = '';
                }else if($minutes==1){
                    $minutes = '1 minute';
                }else{
                    $minutes = "$minutes minutes";
                }
                if($seconds<1){
                    $seconds = '';
                }else if($seconds==1){
                    $seconds = '1 second';
                }else{
                    $seconds = "$seconds seconds";
                }
                $retrialMessage =  "Too many failed attempts, Please wait for few mins to try again.";
                $this->webmodel->commonThrow(400, $retrialMessage);
            }else{
                $retryAvailable = (int) $allow['value'];
                $retryAvailable--;
            }
            $where = "(`web_id`=1 OR `web_id`=2) AND (`user_name`=" . $this->webmodel->removeEscape($userName). " AND `user_password`='" . hash('sha256', $password)."')";
            //echo $where;
            $result = $this->webmodel->commonLISTWHERE('remco_admin', $where, false);
            if ($result) {
                try {
                    require __DIR__ . './../Libraries/Authorization_Token.php';
                } catch (Exception $e) {
                    print_r($e);
                    exit;
                }
                $auth = new \Authorization_Token();
                $iat = time(); // time of token issued at
                $nbf = $iat + 0; //not before in seconds
                $exp = $iat + $this->token_expire_time; // expire time of token in seconds
                $token = array(
                    "iss" => "https://remco.zerosoft.in/",
                    "aud" => "https://remco.zerosoft.in/",
                    "iat" => $iat,
                    "nbf" => $nbf,
                    "exp" => $exp,
                    "data" => array(
                        "id" => $result[0]->web_id,
                        "username" => $result[0]->user_name
                    )
                );
                $token = $auth->generateToken($token);
                //print_r($auth->userData());
                $response['token'] = $token;
                unset($result[0]->user_password);
                unset($result[0]->user_original);
                $response['status'] = '200';
                $response['data'] = $result[0];
                $response['error'] = 'Login successfully';
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '400';
                $response['error'] = "Wrong username/password/role, you have $retryAvailable attempts left.";
                echo json_encode($response);
                exit;
            }
        }
    }
    public function changepassword()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $oldpassword = $request->oldpassword;
            //echo $oldpassword;
            $newpassword = hash('sha256',$request->newpassword);
            //echo $newpassword;
            
            $where = "`user_password`=" .$this->webmodel->removeEscape( hash('sha256', $oldpassword)) . " AND `web_id`=1";  //. hash('sha256'
            //echo $where;
            $result = $this->webmodel->commonLISTWHERE('remco_admin', $where, false);
            
            $id = $result[0]->web_id;
            //echo $id;
            //exit();
            if ($result) {
                $data = array(
                    'user_password' => $newpassword
                );
                $result = $this->webmodel->commonEDIT('remco_admin', $data, $id);
                //echo $result;
            }
            if ($result) {
                $response['status'] = '200';
                $response['data'] = $result[0];
                $response['error'] = 'Password changed successfully';
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '400';
                $response['error'] = 'Wrong password';
                echo json_encode($response);
                exit;
            }
        }
    }

  public function getAllCompanies(){
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
      $result = $this->webmodel->commonLIST('remco_companies');
      if($result){
        $response['status'] = '200';
        $response['data'] = $result;
        echo json_encode($response);
        exit;
      }else{
        $this->webmodel->commonThrow();
      }
    }
  }

  public function getAllContactUs(){
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
      $result = $this->webmodel->commonLIST('remco_contact');
      if($result){
        $response['status'] = '200';
        $response['data'] = $result;
        echo json_encode($response);
        exit;
      }else{
        $this->webmodel->commonThrow();
      }
    }
  }
  
   public function getAllParticipants(){
     
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
      $result = $this->webmodel->commonLIST('remco_participants');
      if($result){
        $response['status'] = '200';
        $response['data'] = $result;
        echo json_encode($response);
        exit;
      }else{
        $this->webmodel->commonThrow();
      }
    }
  }

  public function getParticipants(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $Id = json_decode(json_encode($request),true);
    // 'Id':companyId, 'ContestID':participants
    $companyId = $Id['Id'];
    $contestId = $Id['ContestID'];
    // print_r($companyId);
    // print_r($contestId);

    $sql = "SELECT * FROM remco_contest_participants WHERE campaign_company_id=$companyId AND campaign_id=$contestId ORDER BY web_id DESC";
     $result = $this->webmodel->customSql($sql);
     //print_r($result);

        if($result){
            $response['status'] = '200';
            $response['data'] = $result;
            echo json_encode($response);
            exit;
        }else{
            $this->webmodel->commonThrow();
        }
    }
}

public function getAllSweepParticipants(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $companyId = json_decode(json_encode($request),true);
        $company_Id = $companyId['Id'];
        $sweepId = $companyId['sweepID'];

        //print_r($Id);
    $sql = "SELECT * FROM remco_sweepstakes_participants WHERE campaign_company_id=$company_Id AND campaign_id=$sweepId ORDER BY web_id DESC";
            
     $result = $this->webmodel->customSql($sql);
     //print_r($result);
        if($result){
            $response['status'] = '200';
            $response['data'] = $result;
            echo json_encode($response);
            exit;
        }else{
            $this->webmodel->commonThrow();
        }
    }
}

public function getAllLearnParticipants(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $companyId = json_decode(json_encode($request),true);
        $company_Id = $companyId['Id'];
        $learnId = $companyId['learnID'];

        //print_r($Id);
    $sql = "SELECT * FROM remco_learn_participants WHERE campaign_company_id=$company_Id AND campaign_id=$learnId ORDER BY web_id DESC";
            
     $result = $this->webmodel->customSql($sql);
     //print_r($result);
        if($result){
            $response['status'] = '200';
            $response['data'] = $result;
            echo json_encode($response);
            exit;
        }else{
            $this->webmodel->commonThrow();
        }
    }
}

public function getAllEmailParticipants(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $Id = json_decode(json_encode($request),true);
        // 'Id':companyId, 'ContestID':participants
        $companyId = $Id['Id'];
        $emailId = $Id['emailID'];
        // print_r($emailId);
        // exit();
        
         //$result = $this->webmodel->commonLIST('remco_company_sweepstakes');
    /* $sql = "SELECT * FROM remco_email_participants
            LEFT JOIN remco_company_email
            ON remco_email_participants.campaign_id = remco_company_email.web_id
            LEFT JOIN remco_participants
            ON remco_email_participants.campaign_participant_id = remco_participants.web_id
            WHERE campaign_company_id =$Id";
     */
    $sql = "SELECT * FROM remco_email_participants WHERE campaign_company_id=$companyId AND   campaign_id=$emailId ORDER BY web_id DESC";
            
     $result = $this->webmodel->customSql($sql);
     //print_r($result);
        if($result){
            $response['status'] = '200';
            $response['data'] = $result;
            echo json_encode($response);
            exit;
        }else{
            $this->webmodel->commonThrow();
        }
    }
}

public function question_count() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $sample_id = $_GET["sample_id"];
      $learn_id = $_GET["learn_id"];
      $sql="SELECT count(*) Count_1 from remco_company_learn_questions WHERE company_id=$sample_id AND learn_form_id=$learn_id";
    //   $sql="SELECT * FROM `remco_company_learn_questions` WHERE company_id=$company_id AND learn_form_id=$learn_id";
      $result = $this->webmodel->customSql($sql);
      if ($result) {
        $response['status'] = '200';
        $response['data'] = $result;
        echo json_encode($response);
        exit;
      } else {
        $this->webmodel->commonThrow();
      }
    }
  }

  public function getAllQuiz(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $companyId = json_decode(json_encode($request),true);
    //print_r($companyId['Id']);
    $Id = $companyId['Id'];
    //'Id':companyId,'quizId':quiz
    //$QId = $QuizId[];
    //print_r($companyId['quizId']);
    $quiz = $companyId['quizId'];

    $sql = "SELECT * FROM remco_company_learn_questions WHERE company_id =$Id AND learn_form_id=$quiz";
     $result = $this->webmodel->customSql($sql);
     //print_r($result);

        if($result){
            $response['status'] = '200';
            $response['data'] = $result;
            echo json_encode($response);
            exit;
        }else{
            $this->webmodel->commonThrow();
        }
    }
}

  public function getAllPlan(){
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
      $result = $this->webmodel->commonLIST('remco_subscription');
      if($result){
        $response['status'] = '200';
        $response['data'] = $result;
        echo json_encode($response);
        exit;
      }else{
        $this->webmodel->commonThrow();
      }
    }
  }
  public function getAllContest(){
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
      $result = $this->webmodel->commonLIST('remco_contest');
      if($result){
        $response['status'] = '200';
        $response['data'] = $result;
        echo json_encode($response);
        exit;
      }else{
        $this->webmodel->commonThrow();
      }
    }
  }
  public function getAllLearn(){
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
      $result = $this->webmodel->commonLIST('remco_learn');
      //print_r($result);
      if($result){
        $response['status'] = '200';
        $response['data'] = $result;
        echo json_encode($response);
        exit;
      }else{
        $this->webmodel->commonThrow();
      }
    }
  }
   public function getAllSweep(){
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
      $result = $this->webmodel->commonLIST('remco_sweepstakes');
      if($result){
        $response['status'] = '200';
        $response['data'] = $result;
        echo json_encode($response);
        exit;
      }else{
        $this->webmodel->commonThrow();
      }
    }
  }
   public function getAllSocial(){
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
      $result = $this->webmodel->commonLIST('remco_social_comments');
      if($result){
        $response['status'] = '200';
        $response['data'] = $result;
        echo json_encode($response);
        exit;
      }else{
        $this->webmodel->commonThrow();
      }
    }
  }
    public function deleteParticipant(){
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
            
            $result = $this->webmodel->commonDELETE('remco_participants',"`web_id` = ".$userid);
             //$result = $this->webmodel->commonLISTWHERE('remco_parcipants', $where);
             
            if($result){
                $response['status'] = "200";
                $response['data'] = $result;
                $response['error'] = 'Participant deleted successfully';
                echo json_encode($response);
                exit;
            }
            else{
                $response['status'] = "500";
                $response['error'] = 'Participant cannot be deleted';
                echo json_encode($response);
                exit;
            }
        }
    }
    
    public function addparticipant(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);;
             
            $data = array(
                'participant_fname' => $request->participant_fname,
                'participant_lname' => $request->participant_lname,
                'participant_email' => $request->participant_email,
                'participant_password' => hash('sha256', $request->participant_password),
                'participant_country_code' => $request->participant_country_code,
                'participant_phone' => $request->participant_phone,
                'participant_register_type' => 'website',
                'participant_subscription_status' => $request->participant_subscription_status,
                'participant_status' => $request->participant_status,
                'participant_created' => time(),
            );
            $email = $request->participant_email;
            $name = $request->participant_fname;
            $pass = $request->participant_password;
            $resultExist = $this->webmodel->commonLISTWHERE('remco_participants', "`participant_email`=" . $this->webmodel->removeEscape($email) , false);
            if ($resultExist) {
                $response['status'] = '300';
                $response['error'] = 'Email id already exist.';
                echo  json_encode($response);
                exit;
            }
            
            $resultcompExist = $this->webmodel->commonLISTWHERE('remco_companies', "`company_email`=" . $this->webmodel->removeEscape($email) , false);
            if ($resultcompExist) {
                $response['status'] = '300';
                $response['error'] = 'Email id already exist.';
                echo  json_encode($response);
                exit;
            }

            $randToken = rand("1000000", "9999999");
            $randTokenHash = md5(md5($randToken));
            $data["participant_confirmation"] =  $randTokenHash;
            $subject = "click to login your account- Remco";
            $msg = "<html><head></head><body><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%'><tbody><tr><td style='background-color:#f6f5f1'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:70%; margin-top:60px; margin-bottom:60px;border:1px solid #056C93;'><tbody><tr><td colspan='3' style='background-color:#056C93; text-align:center; padding:10px 0%'><img alt='logo' src='https://remco.zerosoft.in/web/assets/images/logo.png' style='height:90px;'/></td></tr><tr><td style='background-color:#ffffff'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:80%;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif; font-size: 13px;'><tbody><tr><td colspan='3'><p>&nbsp;Hi " . $name . ",</p></td></tr><tr><td><p>Our remco team has created a participant account for you. Please refer the below login credentials and click the below link to login.</p></td></tr><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%; border-collapse: collapse; border-color: #000;'>
            <tr><td height='25' align='left'>User name:  " . $email . "</td></tr>
            <tr><td height='25' align='left'>Password:  " . $pass . "</td></tr>
            <tr><td height='25' align='left'><b><a href=\"http://zerosoft.in/dev/remco/restapi/public/index.php/Webservices/participantConfirmation?v_token=" . $randTokenHash . "\">Click to login your account</a></b></td></tr>
            <tr height='25'></tr></table></td></tr><tr><td><p>Thanks &amp; Regards ,</p></td></tr>
            <tr><td>Remco Team</td></tr></tbody></table></td></tr><tr><td colspan='3' style='background-color:#056C93; text-align:center;padding:20px 0%;color:#fff;'>&copy; 2021. Remco. All Rights Reserved.</td></tr></tbody></table></td></tr></tbody></table></body></html>";
            $from = 'info@remco.com';
            $sendEmail = array(
                'Subject' => $subject,
                'Message' => $msg,
                'To' => $email,
                'Cc' => '',
                'Clientname' =>  "Remco",
                'From' => $from,
            );
            $this->webmodel->sendEmail($sendEmail);

            $result = $this->webmodel->commonADD('remco_participants', $data);
            if ($result) {
                //$mail = sendemail($sendEmail);
                $response['status'] = '200';
                $response['error'] = 'Participant added successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Can not be registered';
                echo json_encode($response);
                exit;
            }
        }
    }

    public function participantConfirmation() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $v_token = $_GET["v_token"];
        $resultExist = $this->webmodel->commonLISTWHERE('remco_participants', "`participant_confirmation`=" . $this->webmodel->removeEscape($v_token) , false);
        if ($resultExist) {
            // var_dump($resultExist[0]->web_id);
            $subss = array(
            'participant_status' => '1', 'participant_confirmation' => ''
            );
            $this->webmodel->commonEDIT('remco_participants', $subss, $resultExist[0]->web_id);
            header("Location: https://remco.zerosoft.in/web/login/success");
            exit;
        } else {
            header("Location: https://remco.zerosoft.in/web/login/error");
            exit;
        }
        } else {
        header("Location: https://remco.zerosoft.in/web/login/error");
        exit;
        }
    }

  public function editparticipant(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);;
             
            $data = array(
                'participant_fname' => $request->participant_fname,
                'participant_lname' => $request->participant_lname,
                'participant_email' => $request->participant_email,
                //'participant_password' => hash('sha256', $request->participant_password),
                'participant_country_code' => $request->participant_country_code,
                'participant_phone' => $request->participant_phone,
                'participant_register_type' => 'website',
                'participant_subscription_status' => $request->participant_subscription_status,
                'participant_status' => $request->participant_status,
                //'participant_created' => time(),
            );
            $email = $request->participant_email;
            $name = $request->participant_fname;
            $resultExist = $this->webmodel->commonLISTWHERE('remco_participants', "`participant_email`=" . $this->webmodel->removeEscape($email) ." AND `web_id` != ".$userid  , false);
            if ($resultExist) {
                $response['status'] = '300';
                $response['error'] = 'Email id already exist.';
                echo  json_encode($response);
                exit;
            }
            
            $resultcompExist = $this->webmodel->commonLISTWHERE('remco_companies', "`company_email`=" . $this->webmodel->removeEscape($email) , false);
            if ($resultcompExist) {
                $response['status'] = '300';
                $response['error'] = 'Email id already exist.';
                echo  json_encode($response);
                exit;
            }
           
            $result = $this->webmodel->commonEDITWHERE('remco_participants', $data, "`web_id`=" . $userid);
            if ($result) {
                //$mail = sendemail($sendEmail);
                $response['status'] = '200';
                $response['error'] = 'Participant Updated successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to update participant';
                echo json_encode($response);
                exit;
            }
        }
  }

  public function getAllCompanyContest() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $sql="SELECT * FROM remco_company_contest INNER JOIN remco_companies on remco_company_contest.company_contest_id=remco_companies.web_id ORDER BY remco_company_contest.web_id DESC";
      $result = $this->webmodel->customSql($sql);
      if ($result) {
        $response['status'] = '200';
        $response['data'] = $result;
        echo json_encode($response);
        exit;
      } else {
        $this->webmodel->commonThrow();
      }
    }
  }

  public function getAllCompanyEmailForms() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $sql="SELECT * FROM remco_company_email INNER JOIN remco_companies on remco_company_email.company_email_id=remco_companies.web_id ORDER BY remco_company_email.web_id DESC";
      $result = $this->webmodel->customSql($sql);
      if ($result) {
        $response['status'] = '200';
        $response['data'] = $result;
        echo json_encode($response);
        exit;
      } else {
        $this->webmodel->commonThrow();
      }
    }
  }

  public function getAllCompanyLearn() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $sql="SELECT * FROM remco_company_learn INNER JOIN remco_companies on remco_company_learn.company_learn_id=remco_companies.web_id ORDER BY remco_company_learn.web_id DESC";
      $result = $this->webmodel->customSql($sql);
      if ($result) {
        $response['status'] = '200';
        $response['data'] = $result;
        echo json_encode($response);
        exit;
      } else {
        $this->webmodel->commonThrow();
      }
    }
  }

  public function getAllCompanySocial() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $sql="SELECT * FROM remco_company_social_comments INNER JOIN remco_companies on remco_company_social_comments.company_social_comments_id=remco_companies.web_id ORDER BY remco_company_social_comments.web_id DESC";
      $result = $this->webmodel->customSql($sql);
      if ($result) {
        $response['status'] = '200';
        $response['data'] = $result;
        echo json_encode($response);
        exit;
      } else {
        $this->webmodel->commonThrow();
      }
    }
  }

  public function getAllCompanySweep() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $sql="SELECT * FROM remco_company_sweepstakes INNER JOIN remco_companies on remco_company_sweepstakes.company_sweepstakes_id=remco_companies.web_id ORDER BY remco_company_sweepstakes.web_id DESC";
      $result = $this->webmodel->customSql($sql);
      if ($result) {
        $response['status'] = '200';
        $response['data'] = $result;
        echo json_encode($response);
        exit;
      } else {
        $this->webmodel->commonThrow();
      }
    }
  }

  public function addcompany(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);;
             
            $data = array(
                'company_name' => $request->company_name,
                'company_description' => $request->company_description,
                'company_country_code' => $request->company_country_code,
                'company_phone' => $request->company_phone,
                'company_website' => $request->company_website,
                'company_email' => $request->company_email,
                'company_password' => hash('sha256', $request->company_password),
                'company_status' => $request->company_status,
                'company_subscription_status' => $request->company_subscription_status,
                'company_created' => time(),
            );
            $email = $request->company_email;
            $name = $request->company_name;
            $pass = $request->company_password;
            $resultExist = $this->webmodel->commonLISTWHERE('remco_participants', "`participant_email`=" . $this->webmodel->removeEscape($email) , false);
            if ($resultExist) {
                $response['status'] = '300';
                $response['error'] = 'Email id already exist.';
                echo  json_encode($response);
                exit;
            }
            
            $resultcompExist = $this->webmodel->commonLISTWHERE('remco_companies', "`company_email`=" . $this->webmodel->removeEscape($email) , false);
            if ($resultcompExist) {
                $response['status'] = '300';
                $response['error'] = 'Email id already exist.';
                echo  json_encode($response);
                exit;
            }

            $randToken = rand("1000000", "9999999");
            $randTokenHash = md5(md5($randToken));
            $data["company_confirmation"] =  $randTokenHash;
            $subject = "Sign up Confirmation for Company account- Remco";
            $msg = "<html><head></head><body><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%'><tbody><tr><td style='background-color:#f6f5f1'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:70%; margin-top:60px; margin-bottom:60px;border:1px solid #056C93;'><tbody><tr><td colspan='3' style='background-color:#056C93; text-align:center; padding:10px 0%'><img alt='logo' src='https://remco.zerosoft.in/web/assets/images/logo.png' style='height:90px;'/></td></tr><tr><td style='background-color:#ffffff'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:80%;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif; font-size: 13px;'><tbody><tr><td colspan='3'><p>&nbsp;Hi " . $name . ",</p></td></tr><tr><td><p>Our remco team has created you to a company admin account. We have shared your account details below. Please click the below link to login.</p></td></tr><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%; border-collapse: collapse; border-color: #000;'>
            <tr><td height='25' align='left'>User name:  " . $name . "</td></tr>
            <tr><td height='25' align='left'>Password:  " . $pass . "</td></tr>
            <tr><td height='25' align='left'><b><a href=\"http://zerosoft.in/dev/remco/restapi/public/index.php/Webadmin/companyConfirmation?v_token=" . $randTokenHash . "\">Click to verify your account</a></b></td></tr>
            <tr height='25'></tr></table></td></tr><tr><td><p>Thanks &amp; Regards ,</p></td></tr>
            <tr><td>Remco Team</td></tr></tbody></table></td></tr><tr><td colspan='3' style='background-color:#056C93; text-align:center;padding:20px 0%;color:#fff;'>&copy; 2021. Remco. All Rights Reserved.</td></tr></tbody></table></td></tr></tbody></table></body></html>";
            $from = 'info@remco.com';
            $mailsend = array(
                'Subject' => $subject,
                'Message' => $msg,
                'To' => $email,
                'Cc' => '',
                'Clientname' =>  "Remco",
                'From' => $from,
            );
            $this->webmodel->sendEmail($mailsend);
            $result = $this->webmodel->commonADD('remco_companies', $data);
            $campaign_type = ['contest','email','learn','sweep'];
            $pre_entry_form_campaign_title = ['Contest Form Fields','Email Form Fields','Learn & Earn Form Fields','Sweepstakes Form Fields'];
            for($pre=0;$pre<=3;$pre++){
                $entrydata = array(
                    'company_id' => $result,
                    'campaign_type' => $campaign_type[$pre],
                    'pre_entry_form_campaign_title' => $pre_entry_form_campaign_title[$pre],
                    'pre_entry_form_email' => 1,
                    'pre_entry_form_name' => 1,
                    'pre_entry_form_address' => 0,
                    'pre_entry_form_city' => 0,
                    'pre_entry_form_state' => 0,
                    'pre_entry_form_country' => 0,
                    'pre_entry_form_birthday' => 0,
                    'pre_entry_form_phone' => 0,
                    'pre_entry_form_entry_code' => 0,
                );
                $entrydata = $this->webmodel->commonADD('remco_pre_entry_form', $entrydata);
            }
            if($entrydata){
                //$mail = sendemail($sendEmail);
                $response['status'] = '200';
                $response['error'] = 'Company details added successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Can not be registered';
                echo json_encode($response);
                exit;
            }
        }
  }

  public function companyConfirmation() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $v_token = $_GET["v_token"];
      $resultExist = $this->webmodel->commonLISTWHERE('remco_companies', "`company_confirmation`=" . $this->webmodel->removeEscape($v_token) , false);
      if ($resultExist) {
        // var_dump($resultExist[0]->web_id);
        $subss = array(
            'company_status' => '1', 'company_confirmation' => '','plan_name' => 'free plan','user_limit' =>'20',
            'company_subscription_status' => '1','company_confirmation_status'=>'1'
        );
        $this->webmodel->commonEDIT('remco_companies', $subss, $resultExist[0]->web_id);
        $user_id=$resultExist[0]->web_id;
        $data = array(
          'subscribe_user_id' => $user_id,
          'subscribe_dtime' => time(),
          'subscribe_plan_id' => 0,
          'subscribe_plan_amount' => 'free',
          'subscribe_date' => time(),
          'user_limit' => '20',
          'subscribe_status' => "active",
          'subscribe_payment_status' => "0",
          'subscribe_expired_date' => '-',
          'subscribe_plan_name' => 'free plan',
          'subscribe_payment_type' => '',
          'subscr_id' => '',
          'subscribe_response' => ''
      );
        $result = $this->webmodel->commonADD('remco_companies_subscriptions', $data);
        header("Location: http://remco.zerosoft.in/web/login/success");
        exit;
      } else {
        header("Location: http://remco.zerosoft.in/web/login/error");
        exit;
      }
    } else {
      header("Location: http://remco.zerosoft.in/web/login/error");
      exit;
    }
  }

  public function editcompany(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);;
             
            $data = array(
                'company_name' => $request->company_name,
                'company_description' => $request->company_description,
                'company_country_code' => $request->company_country_code,
                'company_phone' => $request->company_phone,
                'company_website' => $request->company_website,
                'company_email' => $request->company_email,
                'company_status' => $request->company_status,
                'company_subscription_status' => $request->company_subscription_status,
                'company_created' => time(),
            );
            $email = $request->company_email;
            $name = $request->company_name;
            $resultExist = $this->webmodel->commonLISTWHERE('remco_companies', "`company_email`=" . $this->webmodel->removeEscape($email) ." AND `web_id` != ".$userid  , false);
            if ($resultExist) {
                $response['status'] = '300';
                $response['error'] = 'Email id already exist.';
                echo  json_encode($response);
                exit;
            }
            
            $resultcompExist = $this->webmodel->commonLISTWHERE('remco_participants', "`participant_email`=" . $this->webmodel->removeEscape($email) , false);
            if ($resultcompExist) {
                $response['status'] = '300';
                $response['error'] = 'Email id already exist.';
                echo  json_encode($response);
                exit;
            }
           
            $result = $this->webmodel->commonEDITWHERE('remco_companies', $data, "`web_id`=" . $userid);
            if ($result) {
                //$mail = sendemail($sendEmail);
                $response['status'] = '200';
                $response['error'] = 'Company details Updated successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to update company details';
                echo json_encode($response);
                exit;
            }
        }
  }
  public function deletecompany(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);
        
        $result = $this->webmodel->commonDELETE('remco_companies',"`web_id` = ".$userid);
         //$result = $this->webmodel->commonLISTWHERE('remco_parcipants', $where);
         
        if($result){
            $response['status'] = "200";
            $response['data'] = $result;
            $response['error'] = 'Company details deleted successfully';
            echo json_encode($response);
            exit;
        }
        else{
            $response['status'] = "500";
            $response['error'] = 'Company details cannot be deleted';
            echo json_encode($response);
            exit;
        }
    }
}
public function editplan(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);
             
            $data = array(
                'plan_name' => $request->plan_name,
                'plan_amount' => $request->plan_amount,
                'plan_description' => $request->plan_description,
                'plan_campaign_limit' => $request->plan_campaign_limit,
            );
    
            $result = $this->webmodel->commonEDITWHERE('remco_subscription', $data, "`web_id`=" . $userid);
           
            
            if ($result) {
                //$mail = sendemail($sendEmail);
                $response['status'] = '200';
                $response['error'] = 'Plan details Updated successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to update plan details';
                echo json_encode($response);
                exit;
            }
        }
  }
  public function addplan(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);;
             
            $data = array(
				'plan_name' => $request->plan_name,
                'plan_amount' => $request->plan_amount,
                'plan_description' => $request->plan_description,
                'plan_campaign_limit' => $request->plan_campaign_limit,
            );
           
            $result = $this->webmodel->commonADD('remco_subscription', $data);
            if ($result) {
                //$mail = sendemail($sendEmail);
                $response['status'] = '200';
                $response['error'] = 'Plan details added successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Can not be registered';
                echo json_encode($response);
                exit;
            }
        }
  }
  public function deleteplan(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);
        
        $result = $this->webmodel->commonDELETE('remco_subscription',"`web_id` = ".$userid);
         //$result = $this->webmodel->commonLISTWHERE('remco_parcipants', $where);
         
        if($result){
            $response['status'] = "200";
            $response['data'] = $result;
            $response['error'] = 'Plan details deleted successfully';
            echo json_encode($response);
            exit;
        }
        else{
            $response['status'] = "500";
            $response['error'] = 'Plan details cannot be deleted';
            echo json_encode($response);
            exit;
        }
    }
}
public function addcontest(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);
        $start = strtotime($request->contest_start_date);
        $end = strtotime($request->contest_end_date);
        //print_r($start);
        //print_r($end);
             
            $data = array(
				'contest_title' => $request->contest_title,
                'contest_description' => $request->contest_description,
                'contest_start_date'  => $start,
                'contest_end_date'  => $end,
                'contest_start_time'  => $request->contest_start_time,
                'contest_end_time'  => $request->contest_end_time,
                'contest_time_zone' => $request->contest_time_zone,
                'contest_date_format' => $request->contest_date_format,
                'contest_winners_number' => $request->contest_winners_number,
                'contest_page_url' => $request->contest_page_url,
                'contest_entry_frequency' => $request->contest_entry_frequency,
                'contest_gallery_logo' => $request->contest_gallery_logo,
                'contest_gallery_entry_form' => $request->contest_gallery_entry_form,
                'contest_gallery_label' => $request->contest_gallery_label,
                'contest_content_approval' => $request->contest_content_approval,
                'contest_gallery_sorting' => $request->contest_gallery_sorting,
                'contest_no_of_images_displayed' => $request->contest_no_of_images_displayed,
                'contest_caption_preview' => $request->contest_caption_preview,
                'contest_allow_sharing' => $request->contest_allow_sharing,
                'contest_custom_caption' => $request->contest_custom_caption,
                'contest_user_voting' => $request->contest_user_voting,
                'contest_has_images' => $request->contest_has_images,
                'contest_product_images' => $request->contest_product_images,
                'contest_background_images' => $request->contest_background_images,
                'contest_official_rules' => $request->contest_official_rules,
            );
           //print_r($start);
            //print_r(contest_end_date);
           
            $result = $this->webmodel->commonADD('remco_contest', $data);
            if ($result) {
                //$mail = sendemail($sendEmail);
                $response['status'] = '200';
                $response['error'] = 'Contest details added successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Can not be registered';
                echo json_encode($response);
                exit;
            }
        }
  }
  public function editcontest(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);
        $start = strtotime($request->contest_start_date);
        $end = strtotime($request->contest_end_date);
        //print_r($start);
        //print_r($end);
             
            $data = array(
                'contest_title' => $request->contest_title,
                'contest_description' => $request->contest_description,
                'contest_start_time'  => $request->contest_start_time ,
                'contest_end_time'  => $request->contest_end_time,
                'contest_start_date'  =>$start,
                'contest_end_date'  => $end,
                'contest_time_zone' => $request->contest_time_zone,
                'contest_date_format' => $request->contest_date_format,
                'contest_winners_number' => $request->contest_winners_number,
                'contest_page_url' => $request->contest_page_url,
                'contest_entry_frequency' => $request->contest_entry_frequency,
                'contest_gallery_logo' => $request->contest_gallery_logo,
                'contest_gallery_entry_form' => $request->contest_gallery_entry_form,
                'contest_gallery_label' => $request->contest_gallery_label,
                'contest_content_approval' => $request->contest_content_approval,
                'contest_gallery_sorting' => $request->contest_gallery_sorting,
                'contest_no_of_images_displayed' => $request->contest_no_of_images_displayed,
                'contest_caption_preview' => $request->contest_caption_preview,
                'contest_allow_sharing' => $request->contest_allow_sharing,
                'contest_custom_caption' => $request->contest_custom_caption,
                'contest_user_voting' => $request->contest_user_voting,
                'contest_has_images' => $request->contest_has_images,
                'contest_product_images' => $request->contest_product_images,
                'contest_background_images' => $request->contest_background_images,
                'contest_official_rules' => $request->contest_official_rules,
            );
            //print_r ($data);
    
            $result = $this->webmodel->commonEDITWHERE('remco_contest', $data, "`web_id`=" . $userid);
           
            
            if ($result) {
                //$mail = sendemail($sendEmail);
                $response['status'] = '200';
                $response['error'] = 'Contest details Updated successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to update contest details';
                echo json_encode($response);
                exit;
            }
        }
  }
  public function deletecontest(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);
        
        $result = $this->webmodel->commonDELETE('remco_contest',"`web_id` = ".$userid);
         //$result = $this->webmodel->commonLISTWHERE('remco_parcipants', $where);
         
        if($result){
            $response['status'] = "200";
            $response['data'] = $result;
            $response['error'] = 'Contest details deleted successfully';
            echo json_encode($response);
            exit;
        }
        else{
            $response['status'] = "500";
            $response['error'] = 'Contest details cannot be deleted';
            echo json_encode($response);
            exit;
        }
    }
    }
	public function editlearn(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);
        $start = strtotime($request->learn_start_date);
        $end = strtotime($request->learn_end_date);
        //print_r($start);
        //print_r($end);
             
            $data = array(
                'learn_title' => $request->learn_title,
                'learn_description' => $request->learn_description,
                'learn_start_date'  => $start,
                'learn_end_date'  => $end,
                'learn_start_time' => $request->learn_start_time,
                'learn_end_time' => $request->learn_end_time,
                'learn_time_zone' => $request->learn_time_zone,
                'learn_date_format' => $request->learn_date_format,
                'learn_add_questions' => $request->learn_add_questions,
                'learn_landing_url' => $request->learn_landing_url,
                'learn_logo' => $request->learn_logo,
                'learn_background_image' => $request->learn_background_image,
                'learn_official_rules' => $request->learn_official_rules,
            );
            //print_r($data);
            $result = $this->webmodel->commonEDITWHERE('remco_learn', $data, "`web_id`=" . $userid);
           
            
            if ($result) {
                //$mail = sendemail($sendEmail);
                $response['status'] = '200';
                $response['error'] = 'Learn&earn details Updated successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to update learn&earn details';
                echo json_encode($response);
                exit;
            }
        }
  }
   public function addlearn(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);
        //print_r($splittedstring,'efeufgieufgiue');
        $start = strtotime($request->learn_start_date);
        $end = strtotime($request->learn_end_date);
        //print_r($start);
        //print_r($end);
             
            $data = array(
				'learn_title' => $request->learn_title,
                'learn_description' => $request->learn_description,
                'learn_start_date'  => $start,
                'learn_end_date'  => $end,
                'learn_start_time' => $request->learn_start_time,
                'learn_end_time' => $request->learn_end_time,
                'learn_time_zone' => $request->learn_time_zone,
                'learn_date_format' => $request->learn_date_format,
                'learn_add_questions' => $request->learn_add_questions,
                'learn_landing_url' => $request->learn_landing_url,
                'learn_logo' => $request->learn_logo,
                'learn_background_image' => $request->learn_background_image,
                'learn_official_rules' => $request->learn_official_rules,
            );
           
            $result = $this->webmodel->commonADD('remco_learn', $data);
            if ($result) {
                //$mail = sendemail($sendEmail);
                $response['status'] = '200';
                $response['error'] = 'Learn&earn details added successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Can not be registered';
                echo json_encode($response);
                exit;
            }
        }
  }
    public function deletelearn(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);
        
        $result = $this->webmodel->commonDELETE('remco_learn',"`web_id` = ".$userid);
         //$result = $this->webmodel->commonLISTWHERE('remco_learn', $where);
         
        if($result){
            $response['status'] = "200";
            $response['data'] = $result;
            $response['error'] = 'Learn&earn details deleted successfully';
            echo json_encode($response);
            exit;
        }
        else{
            $response['status'] = "500";
            $response['error'] = 'Learn&earn details cannot be deleted';
            echo json_encode($response);
            exit;
        }
    }
  }

  public function addEmailForms() {
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      $start = strtotime($request->email_start_date);
      $end = strtotime($request->email_end_date);
        
      $data = array(
        'email_title' => $request->email_title,
        'email_description' => $request->email_description,
        'email_start_date' => $start,
        'email_end_date' => $end,
        'email_start_time' => $request->email_start_time,
        'email_end_time' => $request->email_end_time,
        'email_time_zone' => $request->email_time_zone,
        'email_date_format' => $request->email_date_format,
        'email_landing_url' => $request->email_landing_url,
        'email_logo' => $request->email_logo,
        'email_product_img' => $request->email_product_img,
        'email_background_img' => $request->email_background_img,
        'email_official_rules' => $request->email_official_rules
      );
         
      $result = $this->webmodel->commonADD('remco_email', $data);
      if ($result) {
        $response['status'] = '200';
        $response['error'] = 'Email Forms Added Successfully';
        $response['data'] = $result;
        echo json_encode($response);
        exit;
      } else {
        $response['status'] = '500';
        $response['error'] = 'Failed to Add Email Forms';
        echo json_encode($response);
        exit;
      }
    }
  }

  public function editEmailForms() {
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      $userid = $this->webmodel->removeEscape($request->web_id);
      $start = strtotime($request->email_start_date);
      $end = strtotime($request->email_end_date);
           
      $data = array(
        'email_title' => $request->email_title,
        'email_description' => $request->email_description,
        'email_start_date' => $start,
        'email_end_date' => $end,
        'email_start_time' => $request->email_start_time,
        'email_end_time' => $request->email_end_time,
        'email_time_zone' => $request->email_time_zone,
        'email_date_format' => $request->email_date_format,
        'email_landing_url' => $request->email_landing_url,
        'email_logo' => $request->email_logo,
        'email_product_img' => $request->email_product_img,
        'email_background_img' => $request->email_background_img,
        'email_official_rules' => $request->email_official_rules
      );
      
      $result = $this->webmodel->commonEDITWHERE('remco_email', $data, "`web_id`=" . $userid);
            
      if ($result) {
        $response['status'] = '200';
        $response['error'] = 'Email Forms Updated Successfully';
        $response['data'] = $result;
        echo json_encode($response);
        exit;
      } else {
        $response['status'] = '500';
        $response['error'] = 'Failed to Update Email Forms';
        echo json_encode($response);
        exit;
      }
    }
  }
   
  public function deleteEmailForms() {
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      $userid = $this->webmodel->removeEscape($request->web_id);
      
      $result = $this->webmodel->commonDELETE('remco_email',"`web_id` = ".$userid);
        
      if ($result) {
        $response['status'] = "200";
        $response['data'] = $result;
        $response['error'] = 'Email Forms deleted successfully';
        echo json_encode($response);
        exit;
      }
      else {
        $response['status'] = "500";
        $response['error'] = 'Failed to Delete Email Forms';
        echo json_encode($response);
        exit;
      }
    }
  }
  
  public function addsweep(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);
        $start = strtotime($request->sweepstakes_start_date);
        $end = strtotime($request->sweepstakes_end_date);
        //print_r($start);
        //print_r($end);
             
            $data = array(
				'sweepstakes_title' => $request->sweepstakes_title,
                'sweepstakes_description' => $request->sweepstakes_description,
                'sweepstakes_start_date'  => $start,
                'sweepstakes_end_date'  => $end,
                'sweepstakes_start_time'  => $request->sweepstakes_start_time,
                'sweepstakes_end_time'  => $request->sweepstakes_end_time,
                'sweepstakes_time_zone' => $request->sweepstakes_time_zone,
                'sweepstakes_date_format' => $request->sweepstakes_date_format,
                'sweepstakes_winners' => $request->sweepstakes_winners,
                'sweepstakes_page_url' => $request->sweepstakes_page_url,
                'sweepstakes_entry_frequency' => $request->sweepstakes_entry_frequency,
                'sweepstakes_logo' => $request->sweepstakes_logo,
                'sweepstakes_product' => $request->sweepstakes_product,
                'sweepstakes_background' => $request->sweepstakes_background,
                'sweepstakes_official_rules' => $request->sweepstakes_official_rules,
            );
           //print_r($start);
            //print_r(contest_end_date);
           
            $result = $this->webmodel->commonADD('remco_sweepstakes', $data);
            if ($result) {
                //$mail = sendemail($sendEmail);
                $response['status'] = '200';
                $response['error'] = 'Sweepstakes details added successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Can not be registered';
                echo json_encode($response);
                exit;
            }
        }
  }
  
    public function editsweep(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);
        $start = strtotime($request->sweepstakes_start_date);
        $end = strtotime($request->sweepstakes_end_date);
        //print_r($start);
        //print_r($end);
             
            $data = array(
                'sweepstakes_title' => $request->sweepstakes_title,
                'sweepstakes_description' => $request->sweepstakes_description,
                'sweepstakes_start_date'  => $start,
                'sweepstakes_end_date'  => $end,
                'sweepstakes_start_time'  => $request->sweepstakes_start_time,
                'sweepstakes_end_time'  => $request->sweepstakes_end_time,
                'sweepstakes_time_zone' => $request->sweepstakes_time_zone,
                'sweepstakes_date_format' => $request->sweepstakes_date_format,
                'sweepstakes_winners' => $request->sweepstakes_winners,
                'sweepstakes_page_url' => $request->sweepstakes_page_url,
                'sweepstakes_entry_frequency' => $request->sweepstakes_entry_frequency,
                'sweepstakes_logo' => $request->sweepstakes_logo,
                'sweepstakes_product' => $request->sweepstakes_product,
                'sweepstakes_background' => $request->sweepstakes_background,
                'sweepstakes_official_rules' => $request->sweepstakes_official_rules,
            );
            //print_r ($data);
    
            $result = $this->webmodel->commonEDITWHERE('remco_sweepstakes', $data, "`web_id`=" . $userid);
            
            if ($result) {
                //$mail = sendemail($sendEmail);
                $response['status'] = '200';
                $response['error'] = 'Sweepstakes details Updated successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to update sweepstakes details';
                echo json_encode($response);
                exit;
            }
        }
  }
  public function deletesweep(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);
        
        $result = $this->webmodel->commonDELETE('remco_sweepstakes',"`web_id` = ".$userid);
         //$result = $this->webmodel->commonLISTWHERE('remco_parcipants', $where);
         
        if($result){
            $response['status'] = "200";
            $response['data'] = $result;
            $response['error'] = 'Sweepstakes details deleted successfully';
            echo json_encode($response);
            exit;
        }
        else{
            $response['status'] = "500";
            $response['error'] = 'Sweepstakes details cannot be deleted';
            echo json_encode($response);
            exit;
        }
    }
    }

  public function getAllEmailForms() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $result = $this->webmodel->commonLIST('remco_email');
      if ($result) {
        $response['status'] = '200';
        $response['data'] = $result;
        echo json_encode($response);
        exit;
      } else {
        $this->webmodel->commonThrow();
      }
    }
  }

  public function getplanhistory() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $web_id = $_GET["company_id"];
      $sql="SELECT * FROM remco_companies_subscriptions WHERE remco_companies_subscriptions.subscribe_user_id=$web_id AND remco_companies_subscriptions.subscribe_plan_amount!='free'";
      $result = $this->webmodel->customSql($sql);
      if ($result) {
        $response['status'] = '200';
        $response['data'] = $result;
        echo json_encode($response);
        exit;
      } else {
        $this->webmodel->commonThrow();
      }
    }
  }

//   public function getEmail() {
//     if ($_SERVER['REQUEST_METHOD'] == 'GET') {
//       $web_id = $_GET["company_id"];
//       $sql="SELECT user_limit,company_email FROM remco_companies WHERE remco_companies.web_id= $web_id ";
//       $result = $this->webmodel->customSql($sql);
//       if ($result) {
//         $response['status'] = '200';
//         $response['data'] = $result;
//         echo json_encode($response);
//         exit;
//       } else {
//         $this->webmodel->commonThrow();
//       }
//     }
//   }

  public function addsocial(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);
        $start = strtotime($request->social_comments_start_date);
        $end = strtotime($request->social_comments_end_date);
        //print_r($start);
        //print_r($end);
             
            $data = array(
				'social_comments_connectfrom' => $request->social_comments_connectfrom,
                'social_comments_start_date'  => $start,
                'social_comments_end_date'  => $end,
                'social_comments_start_time'  => $request->social_comments_start_time,
                'social_comments_end_time'  => $request->social_comments_end_time,
                'social_comments_time_zone' => $request->social_comments_time_zone,
                'social_comments_winners' => $request->social_comments_winners,
                'social_comments_new_entry' => $request->social_comments_new_entry,
            );
           //print_r($start);
            //print_r(contest_end_date);
           
            $result = $this->webmodel->commonADD('remco_social_comments', $data);
            if ($result) {
                //$mail = sendemail($sendEmail);
                $response['status'] = '200';
                $response['error'] = 'Social comments details added successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Can not be registered';
                echo json_encode($response);
                exit;
            }
        }
  }
  public function editsocial(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);
        $start = strtotime($request->social_comments_start_date);
        $end = strtotime($request->social_comments_end_date);
        //print_r($start);
        //print_r($end);
             
            $data = array(
                'social_comments_connectfrom' => $request->social_comments_connectfrom,
                'social_comments_start_date'  => $start,
                'social_comments_end_date'  => $end,
                'social_comments_start_time'  => $request->social_comments_start_time,
                'social_comments_end_time'  => $request->social_comments_end_time,
                'social_comments_time_zone' => $request->social_comments_time_zone,
                'social_comments_winners' => $request->social_comments_winners,
                'social_comments_new_entry' => $request->social_comments_new_entry,
            );
            //print_r ($data);
    
            $result = $this->webmodel->commonEDITWHERE('remco_social_comments', $data, "`web_id`=" . $userid);
           
            
            if ($result) {
                //$mail = sendemail($sendEmail);
                $response['status'] = '200';
                $response['error'] = 'Social comments details Updated successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to update social comments details';
                echo json_encode($response);
                exit;
            }
        }
  }
  public function deletesocial(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);
        
        $result = $this->webmodel->commonDELETE('remco_social_comments',"`web_id` = ".$userid);
         
        if($result){
            $response['status'] = "200";
            $response['data'] = $result;
            $response['error'] = 'Social comments details deleted successfully';
            echo json_encode($response);
            exit;
        }
        else{
            $response['status'] = "500";
            $response['error'] = 'Social comments details cannot be deleted';
            echo json_encode($response);
            exit;
        }
    }
    }

    public function addProduct() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            
            $data = array(
            'product_title' => $request->product_title,
            'product_description' => $request->product_description,
            'product_image' => $request->product_image,
            );
                
            $result = $this->webmodel->commonADD('remco_products', $data);
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Product Added Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Add Product';
                echo json_encode($response);
                exit;
            }
        }
    }
    
    public function editProduct() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
                
            $data = array(
            'product_title' => $request->product_title,
            'product_description' => $request->product_description,
            'product_image' => $request->product_image,
            );
            
            $result = $this->webmodel->commonEDITWHERE('remco_products', $data, "`web_id`=" . $userid);
                
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Product Updated Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Update Product';
                echo json_encode($response);
                exit;
            }
        }
    }
       
    public function deleteProduct() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
            
            $result = $this->webmodel->commonDELETE('remco_products',"`web_id` = ".$userid);
            
            if ($result) {
                $response['status'] = "200";
                $response['data'] = $result;
                $response['error'] = 'Produt deleted successfully';
                echo json_encode($response);
                exit;
            }
            else {
                $response['status'] = "500";
                $response['error'] = 'Failed to Delete Product';
                echo json_encode($response);
                exit;
            }
        }
    }

    public function getAllProducts() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $result = $this->webmodel->commonLIST('remco_products');
            if ($result) {
                $response['status'] = '200';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $this->webmodel->commonThrow();
            }
        }
    }

    public function addTestimonial() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            
            $data = array(
                'testimonial_name' => $request->testimonial_name,
                'testimonial_designation' => $request->testimonial_designation,
                'testimonial_title' => $request->testimonial_title,
                'testimonial_message' => $request->testimonial_message,
                'testimonial_image' => $request->testimonial_image,
            );
                
            $result = $this->webmodel->commonADD('remco_testimonials', $data);
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Testimonial Added Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Add Testimonial';
                echo json_encode($response);
                exit;
            }
        }
    }
    
    public function editTestimonial() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
                
            $data = array(
                'testimonial_name' => $request->testimonial_name,
                'testimonial_designation' => $request->testimonial_designation,
                'testimonial_title' => $request->testimonial_title,
                'testimonial_message' => $request->testimonial_message,
                'testimonial_image' => $request->testimonial_image,
            );
            
            $result = $this->webmodel->commonEDITWHERE('remco_testimonials', $data, "`web_id`=" . $userid);
                
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Testimonial Updated Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Update Testimonial';
                echo json_encode($response);
                exit;
            }
        }
    }
       
    public function deleteTestimonial() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
            
            $result = $this->webmodel->commonDELETE('remco_testimonials',"`web_id` = ".$userid);
            
            if ($result) {
                $response['status'] = "200";
                $response['data'] = $result;
                $response['error'] = 'Testimonial deleted successfully';
                echo json_encode($response);
                exit;
            }
            else {
                $response['status'] = "500";
                $response['error'] = 'Failed to Delete Testimonial';
                echo json_encode($response);
                exit;
            }
        }
    }

    public function getAllTestimonials() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $result = $this->webmodel->commonLIST('remco_testimonials');
            if ($result) {
                $response['status'] = '200';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $this->webmodel->commonThrow();
            }
        }
    }

    public function addBlogs() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            
            $data = array(
            'blog_title' => $request->blog_title,
            'blog_description' => $request->blog_description,
            'blog_image' => $request->blog_image,
            'blog_created_time' => time()
            );
                
            $result = $this->webmodel->commonADD('remco_blogs', $data);
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Blog Added Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Add Blog';
                echo json_encode($response);
                exit;
            }
        }
    }
    
    public function editBlogs() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
                
            $data = array(
            'blog_title' => $request->blog_title,
            'blog_description' => $request->blog_description,
            'blog_image' => $request->blog_image,
            'blog_created_time' => time()
            );
            
            $result = $this->webmodel->commonEDITWHERE('remco_blogs', $data, "`web_id`=" . $userid);
                
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Blog Updated Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Update Blog';
                echo json_encode($response);
                exit;
            }
        }
    }
       
    public function deleteBlogs() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
            
            $result = $this->webmodel->commonDELETE('remco_blogs',"`web_id` = ".$userid);

            if ($result) {
                $response['status'] = "200";
                $response['data'] = $result;
                $response['error'] = 'Blog deleted successfully';
                echo json_encode($response);
                exit;
            }
            else {
                $response['status'] = "500";
                $response['error'] = 'Failed to Delete Blog';
                echo json_encode($response);
                exit;
            }
        }
    }

    public function getAllBlogs() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $result = $this->webmodel->commonLIST('remco_blogs');
            if ($result) {
                $response['status'] = '200';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $this->webmodel->commonThrow();
            }
        }
    }

    public function addFaq() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            
            $data = array(
            'faq_question' => $request->faq_question,
            'faq_answer' => $request->faq_answer,
            );
                
            $result = $this->webmodel->commonADD('remco_faq', $data);
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Faq Added Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Add Faq';
                echo json_encode($response);
                exit;
            }
        }
    }
    
    public function editFaq() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
                
            $data = array(
            'faq_question' => $request->faq_question,
            'faq_answer' => $request->faq_answer,
            );
            
            $result = $this->webmodel->commonEDITWHERE('remco_faq', $data, "`web_id`=" . $userid);
                
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Faq Updated Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Update Faq';
                echo json_encode($response);
                exit;
            }
        }
    }
       
    public function deleteFaq() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
            
            $result = $this->webmodel->commonDELETE('remco_faq',"`web_id` = ".$userid);
            
            if ($result) {
                $response['status'] = "200";
                $response['data'] = $result;
                $response['error'] = 'Faq deleted successfully';
                echo json_encode($response);
                exit;
            }
            else {
                $response['status'] = "500";
                $response['error'] = 'Failed to Delete Faq';
                echo json_encode($response);
                exit;
            }
        }
    }

    public function getAllFaq() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $result = $this->webmodel->commonLIST('remco_faq');
            if ($result) {
                $response['status'] = '200';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $this->webmodel->commonThrow();
            }
        }
    }

    public function addBlockChain() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            
            $data = array(
                'block_images' => $request->block_images,
            );
                
            $result = $this->webmodel->commonADD('remco_block_chain', $data);
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Block Chain Added Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Add Block Chain';
                echo json_encode($response);
                exit;
            }
        }
    }
    
    public function editBlockChain() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
                
            $data = array(
                'block_images' => $request->block_images,
            );
            
            $result = $this->webmodel->commonEDITWHERE('remco_block_chain', $data, "`web_id`=" . $userid);
                
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Block Chain Updated Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Update Block Chain';
                echo json_encode($response);
                exit;
            }
        }
    }
       
    public function deleteBlockChain() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
            
            $result = $this->webmodel->commonDELETE('remco_block_chain',"`web_id` = ".$userid);
            
            if ($result) {
                $response['status'] = "200";
                $response['data'] = $result;
                $response['error'] = 'Block Chain deleted successfully';
                echo json_encode($response);
                exit;
            }
            else {
                $response['status'] = "500";
                $response['error'] = 'Failed to Delete Block Chain';
                echo json_encode($response);
                exit;
            }
        }
    }

    public function getAllBlockChains() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $result = $this->webmodel->commonLIST('remco_block_chain');
            if ($result) {
                $response['status'] = '200';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $this->webmodel->commonThrow();
            }
        }
    }
    public function editContent() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
                
            $data = array(
            'title' => $request->title,
            'description' => $request->description,
            'content_image' => $request->content_image,
            );
            
            $result = $this->webmodel->commonEDITWHERE('remco_contacts', $data, "`web_id`=" . $userid);
                
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Content Updated Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Update Content';
                echo json_encode($response);
                exit;
            }
        }
    }
    
    public function getAllContent() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $result = $this->webmodel->commonLIST('remco_contacts');
            if ($result) {
                $response['status'] = '200';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $this->webmodel->commonThrow();
            }
        }
    }
    public function editSite() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
                
            $data = array(
            'title' => $request->title,
            'site_link' => $request->site_link,
            );
            
            $result = $this->webmodel->commonEDITWHERE('remco_site_settings', $data, "`web_id`=" . $userid);
                
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Social Link Updated Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Update Social link';
                echo json_encode($response);
                exit;
            }
        }
    }
    
    public function getAllSite() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $result = $this->webmodel->commonLIST('remco_site_settings');
            if ($result) {
                $response['status'] = '200';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $this->webmodel->commonThrow();
            }
        }
    }
    public function editContactInfo() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
                
            $data = array(
            'address' => $request->address,
            'mail_id' => $request->mail_id,
            'phone' => $request->phone,
            'copy_rights' => $request->copy_rights,
            );
            
            $result = $this->webmodel->commonEDITWHERE('remco_contact_info', $data, "`web_id`=" . $userid);
                
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Contact Updated Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Update Contact';
                echo json_encode($response);
                exit;
            }
        }
    }
    
    public function getAllContactInfo() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $result = $this->webmodel->commonLIST('remco_contact_info');
            if ($result) {
                $response['status'] = '200';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $this->webmodel->commonThrow();
            }
        }
    }

    public function addWhyRunEmailForms() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            
            $data = array(
            'element' => $request->element,
            'title' => $request->title,
            'description' => $request->description,
            );
                
            $result = $this->webmodel->commonADD('remco_why_run_email_forms', $data);
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Why Email Forms Added Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Add Why Email Forms';
                echo json_encode($response);
                exit;
            }
        }
    }
    
    public function editWhyRunEmailForms() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
                
            $data = array(
            'element' => $request->element,
            'title' => $request->title,
            'description' => $request->description,
            );
            
            $result = $this->webmodel->commonEDITWHERE('remco_why_run_email_forms', $data, "`web_id`=" . $userid);
                
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Why Email Forms Updated Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Update Why Email Forms';
                echo json_encode($response);
                exit;
            }
        }
    }
       
    public function deleteWhyRunEmailForms() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
            
            $result = $this->webmodel->commonDELETE('remco_why_run_email_forms',"`web_id` = ".$userid);
            
            if ($result) {
                $response['status'] = "200";
                $response['data'] = $result;
                $response['error'] = 'Why Email Forms deleted successfully';
                echo json_encode($response);
                exit;
            }
            else {
                $response['status'] = "500";
                $response['error'] = 'Failed to Delete Why Email Forms';
                echo json_encode($response);
                exit;
            }
        }
    }

    public function getAllWhyRunEmailForms() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $result = $this->webmodel->commonLIST('remco_why_run_email_forms');
            if ($result) {
                $response['status'] = '200';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $this->webmodel->commonThrow();
            }
        }
    }

    public function addWhyRunContest() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            
            $data = array(
            'element' => $request->element,    
            'title' => $request->title,
            'description' => $request->description,
            );
                
            $result = $this->webmodel->commonADD('remco_why_run_Contest', $data);
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Contest Added Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Add Contest';
                echo json_encode($response);
                exit;
            }
        }
    }
    
    public function editWhyRunContest() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
                
            $data = array(
                'element' => $request->element,    
                'title' => $request->title,
    
                'description' => $request->description,
    
                
            );
            
            $result = $this->webmodel->commonEDITWHERE('remco_why_run_Contest', $data, "`web_id`=" . $userid);
                
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Contest Updated Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Update Contest';
                echo json_encode($response);
                exit;
            }
        }
    }
       
    public function deleteWhyRunContest() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
            
            $result = $this->webmodel->commonDELETE('remco_why_run_Contest',"`web_id` = ".$userid);
            
            if ($result) {
                $response['status'] = "200";
                $response['data'] = $result;
                $response['error'] = 'Contest deleted successfully';
                echo json_encode($response);
                exit;
            }
            else {
                $response['status'] = "500";
                $response['error'] = 'Failed to Delete Contest';
                echo json_encode($response);
                exit;
            }
        }
    }

    public function getAllWhyRunContest() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $result = $this->webmodel->commonLIST('remco_why_run_Contest');
            if ($result) {
                $response['status'] = '200';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $this->webmodel->commonThrow();
            }
        }
    }
    public function addWhyRunLearnAndEarn() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            
            $data = array(
            'element' => $request->element,
            'title' => $request->title,
            'description' => $request->description,
            );
                
            $result = $this->webmodel->commonADD('remco_why_run_learn_and_earn', $data);
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Learn And Earn Added Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Add Learn And Earn';
                echo json_encode($response);
                exit;
            }
        }
    }
    
    public function editWhyRunLearnAndEarn() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
                
            $data = array(
            'element' => $request->element,
            'title' => $request->title,
            'description' => $request->description,
            );
            
            $result = $this->webmodel->commonEDITWHERE('remco_why_run_learn_and_earn', $data, "`web_id`=" . $userid);
                
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Learn And Earn Updated Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Update Learn And Earn';
                echo json_encode($response);
                exit;
            }
        }
    }
       
    public function deleteWhyRunLearnAndEarn() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
            
            $result = $this->webmodel->commonDELETE('remco_why_run_learn_and_earn',"`web_id` = ".$userid);
            
            if ($result) {
                $response['status'] = "200";
                $response['data'] = $result;
                $response['error'] = 'Learn And Earn deleted successfully';
                echo json_encode($response);
                exit;
            }
            else {
                $response['status'] = "500";
                $response['error'] = 'Failed to Delete Learn And Earn';
                echo json_encode($response);
                exit;
            }
        }
    }

    public function getAllWhyRunLearnAndEarn() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $result = $this->webmodel->commonLIST('remco_why_run_learn_and_earn');
            if ($result) {
                $response['status'] = '200';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $this->webmodel->commonThrow();
            }
        }
    }
    public function addWhyRunSocialMedia() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            
            $data = array(
            'element' => $request->element,
            'title' => $request->title,
            'description' => $request->description,
            );
                
            $result = $this->webmodel->commonADD('remco_why_run_social_media', $data);
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Social Commends Added Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Add Social Commends';
                echo json_encode($response);
                exit;
            }
        }
    }
    
    public function editWhyRunSocialMedia() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
                
            $data = array(
            'element' => $request->element,
            'title' => $request->title,
            'description' => $request->description,
            );
            
            $result = $this->webmodel->commonEDITWHERE('remco_why_run_social_media', $data, "`web_id`=" . $userid);
                
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Social Commends Updated Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Update Social Commends';
                echo json_encode($response);
                exit;
            }
        }
    }
       
    public function deleteWhyRunSocialMedia() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
            
            $result = $this->webmodel->commonDELETE('remco_why_run_social_media',"`web_id` = ".$userid);
            
            if ($result) {
                $response['status'] = "200";
                $response['data'] = $result;
                $response['error'] = 'Social Commends deleted successfully';
                echo json_encode($response);
                exit;
            }
            else {
                $response['status'] = "500";
                $response['error'] = 'Failed to Delete Social Commends';
                echo json_encode($response);
                exit;
            }
        }
    }

    public function getAllWhySocialMedia() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $result = $this->webmodel->commonLIST('remco_why_run_social_media');
            if ($result) {
                $response['status'] = '200';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $this->webmodel->commonThrow();
            }
        }
    }

    public function addWhyRunSweepStakes() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            
            $data = array(
            'element' => $request->element,
            
            'title' => $request->title,
            
            'description' => $request->description,
            );
                
            $result = $this->webmodel->commonADD('remco_why_run_sweep-stakes', $data);
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Sweep Stakes Added Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Add Sweep Stakes';
                echo json_encode($response);
                exit;
            }
        }
    }
    
    public function editWhyRunSweepStakes() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
                
            $data = array(
            'element' => $request->element,
            'title' => $request->title,
            'description' => $request->description,
            );
            
            $result = $this->webmodel->commonEDITWHERE('remco_why_run_sweep-stakes', $data, "`web_id`=" . $userid);
                
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Sweep Stakes Updated Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Update Sweep Stakes';
                echo json_encode($response);
                exit;
            }
        }
    }
       
    public function deleteWhyRunSweepStakes() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
            
            $result = $this->webmodel->commonDELETE('remco_why_run_sweep-stakes',"`web_id` = ".$userid);
            
            if ($result) {
                $response['status'] = "200";
                $response['data'] = $result;
                $response['error'] = 'Sweep Stakes deleted successfully';
                echo json_encode($response);
                exit;
            }
            else {
                $response['status'] = "500";
                $response['error'] = 'Failed to Delete Sweep Stakes';
                echo json_encode($response);
                exit;
            }
        }
    }

    public function getAllWhySweepStakes() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $result = $this->webmodel->commonLIST('remco_why_run_sweep-stakes');
            if ($result) {
                $response['status'] = '200';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $this->webmodel->commonThrow();
            }
        }
    }
    public function addProductsFeatures() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            
            $data = array(
            'title' => $request->title,
            'description' => $request->description,
            );
                
            $result = $this->webmodel->commonADD('remco_products_features', $data);
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Product Features Added Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Add Product Features';
                echo json_encode($response);
                exit;
            }
        }
    }
    
    public function editProductsFeatures() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
                
            $data = array(
            'title' => $request->title,
            'description' => $request->description,
            );
            
            $result = $this->webmodel->commonEDITWHERE('remco_products_features', $data, "`web_id`=" . $userid);
                
            if ($result) {
                $response['status'] = '200';
                $response['error'] = 'Product Features Updated Successfully';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Failed to Update Product Features';
                echo json_encode($response);
                exit;
            }
        }
    }
       
    public function deleteProductsFeatures() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
            
            $result = $this->webmodel->commonDELETE('remco_products_features',"`web_id` = ".$userid);
            
            if ($result) {
                $response['status'] = "200";
                $response['data'] = $result;
                $response['error'] = 'Product Features deleted successfully';
                echo json_encode($response);
                exit;
            }
            else {
                $response['status'] = "500";
                $response['error'] = 'Failed to Delete Product Features';
                echo json_encode($response);
                exit;
            }
        }
    }

    public function getAllProductsFeatures() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $result = $this->webmodel->commonLIST('remco_products_features');
            if ($result) {
                $response['status'] = '200';
                $response['data'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $this->webmodel->commonThrow();
            }
        }
    }
}