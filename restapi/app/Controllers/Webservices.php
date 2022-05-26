<?php namespace App\Controllers;
use App\Models\Webmodel;
use CodeIgniter\Controller;
use CodeIgniter\HTTP\Request;
use Symfony\Component\Config\Definition\Exception\Exception;
include  dirname(__FILE__).'../../ThirdParty/paypal/PayPalSubscription.php';
class Webservices extends Controller
{
//    WebModel web = new Webmodel();
    private $webmodel;
    protected $token_expire_time = 864000;
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
        // $this->ShowMyHeader();
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
    private function checkEntryLevel(){
        $uri = current_url(true);
        $listOfChkJWT=["getActiveId","learnwinnerAnnounce","getActiveIdSweep","addAnswer","addcreditsLearn","getActiveIdLearn","getAllcreditsLearn","getAllAnswers","addfbcredits","getplanhistory","addinstacredits","getEmails","winnerAnnounce","getAllcredits","getImageId","getAllSocialImages","addVote","getVerificationCode","getRandomKey","getAllimages","getplandetails","getplan","makePayment1","pay","getAllCompanyEmailForms","getAllCompanySocialComments","getAllfaqs","getAllCompanyEntryFields","getEmail","getAllCompaniesContest","getAllCompaniesId","addPreEntryForm"];
        $currReqAction=$uri->getSegment(3);
        if(array_key_exists('HTTP_AUTHORIZATION', $_SERVER)){
            $header = $_SERVER["HTTP_AUTHORIZATION"];
        }else{
            $header = '';
        }
        // print_r(in_array(($currReqAction),$listOfChkJWT));
        if(in_array($currReqAction,$listOfChkJWT) && in_array(strtolower($_SERVER["REQUEST_METHOD"]),["post","get"])){
            try {
                require __DIR__ . './../Libraries/Authorization_Token.php';
            } catch (Exception $e) {
                print_r($e);
                exit;
            }
            $auth = new \Authorization_Token();
            if(isset($header) && $header!=""){
                $validatedResult = $auth->validateToken();
            }
            else{
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

    public function companyRegistration() {
      if ($_SERVER['REQUEST_METHOD'] == 'POST') {
          $postdata = file_get_contents("php://input");
          $request = json_decode($postdata);
          $splite = explode("/", $request->company_country_code);
          $countryName = $splite[1];
          $countryCode = $splite[0];
            $data = array(
              'company_name' => $request->company_name,
              'company_description' => $request->company_description,
              'company_email' => $request->company_email,
              'company_password' => hash('sha256', $request->company_password),
              'company_code' => $this->webmodel->generateRandomPassword(7, false, 'ud'),
              'company_website' => $request->company_website,
              'company_country_code' => $countryCode,
              'company_country_name' => $countryName,
              'company_phone' => $request->company_phone,
              'company_register_type' => 'website',
              'company_subscription_status' => '0',
              'company_status' => '0',
              'company_created' => time(),
          );
          $email = $request->company_email;
          $name = $request->company_name;
          $resultExist = $this->webmodel->commonLISTWHERE('remco_companies', "`company_email`=" . $this->webmodel->removeEscape($email) , false);
          if($resultExist){
          $sql="SELECT web_id,company_confirmation_status FROM `remco_companies` WHERE `company_email`='".$email."'";
          $confirm_id= $this->webmodel->customSql($sql);
          $confirmation_id=$confirm_id[0]->company_confirmation_status;
          $confirmation_web_id=$confirm_id[0]->web_id;
            if($confirmation_id=='1'){
              $resultExist = $this->webmodel->commonLISTWHERE('remco_companies', "`company_email`=" . $this->webmodel->removeEscape($email) , false);
              if ($resultExist) {
                $response['status'] = '300';
                $response['error'] = 'Email id already exist.';
                echo  json_encode($response);
                exit;
              }
            }else{
              $resultExist = $this->webmodel->commonLISTWHERE('remco_companies', "`company_confirmation_status`='0'");
              if ($resultExist) {
                $response['status'] = '200';
                $response['error'] = 'Registered successfully, To activate your account please confirm in your registered email-address.';
                echo  json_encode($response);
                  $randToken = rand("1000000", "9999999");
                  $randTokenHash = md5(md5($randToken));
                  $data["company_confirmation"] = $randTokenHash;
                  $subject = "Sign up Confirmation for Company account- Remco";
                  $msg = "<html><head></head><body><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%'><tbody><tr><td style='background-color:#f6f5f1'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:70%; margin-top:60px; margin-bottom:60px;border:1px solid #056C93;'><tbody><tr><td colspan='3' style='background-color:#056C93; text-align:center; padding:10px 0%'><img alt='logo' src='https://remco.zerosoft.in/web/assets/images/logo.png' style='height:90px;'/></td></tr><tr><td style='background-color:#ffffff'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:80%;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif; font-size: 13px;'><tbody><tr><td colspan='3'><p>&nbsp;Hi " . $name . ",</p></td></tr><tr><td><p>Thank you for signing up for company account in Remco, There is one more step to complete the registration. Please verify yourself by clicking the below mentioned link</p></td></tr><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%; border-collapse: collapse; border-color: #000;'>
                  <tr><td height='25' align='center'><b><a href=\"http://zerosoft.in/dev/remco/restapi/public/index.php/Webservices/companyConfirmation?v_token=" . $randTokenHash . "\">Sign up Confirmation</a></b></td></tr>
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
                  $result = $this->webmodel->commonEDITWHERE('remco_companies', $data, "`web_id`=" . $confirmation_web_id);
                exit;
              }
            }
          }
              $resultpartExist = $this->webmodel->commonLISTWHERE('remco_participants', "`participant_email`=" . $this->webmodel->removeEscape($email) , false);
          if ($resultpartExist) {
              $response['status'] = '300';
              $response['error'] = 'Email id already exist.';
              echo  json_encode($response);
              exit;
          }
          $randToken = rand("1000000", "9999999");
          $randTokenHash = md5(md5($randToken));
          $data["company_confirmation"] =  $randTokenHash;
          $subject = "Sign up Confirmation for Company account- Remco";
          $msg = "<html><head></head><body><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%'><tbody><tr><td style='background-color:#f6f5f1'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:70%; margin-top:60px; margin-bottom:60px;border:1px solid #056C93;'><tbody><tr><td colspan='3' style='background-color:#056C93; text-align:center; padding:10px 0%'><img alt='logo' src='https://remco.zerosoft.in/web/assets/images/logo.png' style='height:90px;'/></td></tr><tr><td style='background-color:#ffffff'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:80%;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif; font-size: 13px;'><tbody><tr><td colspan='3'><p>&nbsp;Hi " . $name . ",</p></td></tr><tr><td><p>Thank you for signing up for company account in Remco, There is one more step to complete the registration. Please verify yourself by clicking the below mentioned link</p></td></tr><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%; border-collapse: collapse; border-color: #000;'>
          <tr><td height='25' align='center'><b><a href=\"http://zerosoft.in/dev/remco/restapi/public/index.php/Webservices/companyConfirmation?v_token=" . $randTokenHash . "\">Sign up Confirmation</a></b></td></tr>
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
          
          $result = $this->webmodel->commonADD('remco_companies', $data);
          
          $campaign_type = ['contest','email','learn','sweep'];
          $pre_entry_form_campaign_title = ['Contest Form Fields','Email Form Fields','Learn & Earn Form Fields','Sweepstakes Form Fields'];
          for($pre=0;$pre<=3;$pre++){
                  //for($i=0;$i<=3;$i++)
                  //{
                  //    echo $campaign_type[$i];
                  //    echo "<br>";
                  //    echo $pre_entry_form_campaign_title[$i];
                  //    echo "<br>";
                  //}
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
          if ($entrydata) {
              //$mail = sendemail($sendEmail);
              $response['status'] = '200';
              $response['error'] = 'Registered successfully, To activate your account please confirm in your registered email-address.';
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
            'subscribe_status' => "Active",
            'subscribe_payment_status' => "0",
            'subscribe_expired_date' => '-',
            'subscribe_plan_name' => 'free plan',
            'subscribe_payment_type' => '',
            'subscr_id' => '',
            'subscribe_response' => ''
        );
          $result = $this->webmodel->commonADD('remco_companies_subscriptions', $data);
          header("Location: http://remco.zerosoft.in/web/login/success");
          // header("Location: http://localhost:4200/login/success");
          exit;
        } else {
          header("Location: http://remco.zerosoft.in/web/login/error");
          // header("Location: http://localhost:4200/login/error");
          exit;
        }
      } else {
        header("Location: http://remco.zerosoft.in/web/login/error");
        // header("Location: http://localhost:4200/login/error");
        exit;
      }
    }
    public function blogsDetails() {
      if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $web_id = $_GET["web_id"];
        $resultExist = $this->webmodel->commonLISTWHERE('remco_blogs', "`web_id`=" . $web_id , false);
        if ($resultExist) {
          //$mail = sendemail($sendEmail);
          $response['status'] = '200';
          $response['error'] = 'data gets successfully.';
          $response['data'] = $resultExist;
          echo json_encode($response);
          exit;
      } else {
          $response['status'] = '500';
          $response['error'] = 'data not found';
          echo json_encode($response);
          exit;
      }
      }
    }
    public function participantRegistration() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $splite = explode("/", $request->participant_country_code);
            $name = $splite[1];
            $code = $splite[0];
              $data = array(
                'participant_fname' => $request->participant_fname,
                'participant_lname' => $request->participant_lname,
                'participant_email' => $request->participant_email,
                'participant_password' => hash('sha256', $request->participant_password),
                'participant_country_code' => $code,
                'participant_country_name' => $name,
                'participant_phone' => $request->participant_phone,
                'participant_register_type' => 'website',
                'participant_subscription_status' => '0',
                'participant_status' => '0',
                'participant_created' => time(),
            );
            $email = $request->participant_email;
            $name = $request->participant_fname;
            $resultExist = $this->webmodel->commonLISTWHERE('remco_participants', "`participant_email`=" . $this->webmodel->removeEscape($email) , false);
            if ($resultExist) {
                $response['status'] = '300';
                $response['error'] = 'Email id already exist.';
                echo  json_encode($response);
                exit;
            }
            $resultpartExist = $this->webmodel->commonLISTWHERE('remco_companies', "`company_email`=" . $this->webmodel->removeEscape($email) , false);
            if ($resultpartExist) {
                $response['status'] = '300';
                $response['error'] = 'Email id already exist.';
                echo  json_encode($response);
                exit;
            }
            $randToken = rand("1000000", "9999999");
            $randTokenHash = md5(md5($randToken));
            $data["participant_confirmation"] =  $randTokenHash;
            $subject = "Sign up Confirmation for Participant account- Remco";
            $msg = "<html><head></head><body><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%'><tbody><tr><td style='background-color:#f6f5f1'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:70%; margin-top:60px; margin-bottom:60px;border:1px solid #056C93;'><tbody><tr><td colspan='3' style='background-color:#056C93; text-align:center; padding:10px 0%'><img alt='logo' src='https://remco.zerosoft.in/web/assets/images/logo.png' style='height:90px;'/></td></tr><tr><td style='background-color:#ffffff'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:80%;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif; font-size: 13px;'><tbody><tr><td colspan='3'><p>&nbsp;Hi " . $name . ",</p></td></tr><tr><td><p>Thank you for signing up for participant account in Remco, There is one more step to complete the registration. Please verify yourself by clicking the below mentioned link</p></td></tr><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%; border-collapse: collapse; border-color: #000;'>
            <tr><td height='25' align='center'><b><a href=\"http://zerosoft.in/dev/remco/restapi/public/index.php/Webservices/participantConfirmation?v_token=" . $randTokenHash . "\">Sign up Confirmation</a></b></td></tr>
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
                $response['error'] = 'Registered successfully, To activate your account please confirm in your registered email-address.';
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
  public function userLogin() {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      $password = $request->password;
      $email = $request->email;
      $companyemail = "`company_email`=" . $this->webmodel->removeEscape($email);
      $resultCompany = $this->webmodel->commonLISTWHERE('remco_companies', $companyemail, false);
      if ($resultCompany) {
        $where = "`company_password`='" . hash('sha256', $password) . "' AND `company_email`=" . $this->webmodel->removeEscape($email). " AND `company_status`=1";
        $result = $this->webmodel->commonLISTWHERE('remco_companies', $where, false);
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
              "iss" => "https://remco.zerosoft.in",
              "aud" => "https://remco.zerosoft.in",
              "iat" => $iat,
              "nbf" => $nbf,
              "exp" => $exp,
              "data" => array(
                  "id" => $result[0]->web_id,
                  "email" => $result[0]->company_email
              )
          );
          $token = $auth->generateToken($token);
          //print_r($auth->userData());
          $result[0]->token = $token;
          $response['status'] = '200';
          $response['error'] = 'Login Successfully';
          $response['role'] = 'Company';
          unset($result[0]->company_password);
          $response['data'] = $result[0];
          echo json_encode($response);
          exit;
        }
        $where = "`company_password`='" . hash('sha256', $password) . "' AND `company_email`=" . $this->webmodel->removeEscape($email);
        $result = $this->webmodel->commonLISTWHERE('remco_companies', $where, false);
        if ($result) {
          $response['status'] = '300';
          $response['error'] = 'Your account is not active, please contact admin';
          echo json_encode($response);
          exit;
        }
        $where = "`company_email`=" . $this->webmodel->removeEscape($email) ;
        $result = $this->webmodel->commonLISTWHERE('remco_companies', $where, false);
        if ($result) {
          $response['status'] = '300';
          $response['error'] = 'Your password is wrong';
          echo json_encode($response);
          exit;
        }
        $response['status'] = '500';
        $response['error'] = "It seems your email doesn't matched any account, please register before login.";
        echo json_encode($response);
        exit;
      } else {
        $participantemail = "`participant_email`=" . $this->webmodel->removeEscape($email);
        $resultParticipant = $this->webmodel->commonLISTWHERE('remco_participants', $participantemail, false);
        if ($resultParticipant) {
          $where = "`participant_password`='" . hash('sha256', $password) . "' AND `participant_email`=" . $this->webmodel->removeEscape($email). " AND `participant_status`=1";
          $result = $this->webmodel->commonLISTWHERE('remco_participants', $where, false);
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
                    "email" => $result[0]->participant_email
                )
            );
            $token = $auth->generateToken($token);
            //print_r($auth->userData());
            $result[0]->token = $token;
            $response['status'] = '200';
            $response['error'] = 'Login Successfully';
            $response['role'] = 'Participant';
            unset($result[0]->participant_password);
            $response['data'] = $result[0];
            echo json_encode($response);
            exit;
          }
          $where = "`participant_password`='" . hash('sha256', $password) . "' AND `participant_email`=" . $this->webmodel->removeEscape($email);
          $result = $this->webmodel->commonLISTWHERE('remco_participants', $where, false);
          if ($result) {
            $response['status'] = '300';
            $response['error'] = 'Your account is not active, please contact admin';
            echo json_encode($response);
            exit;
          }
          $where = "`participant_email`=" . $this->webmodel->removeEscape($email) ;
          $result = $this->webmodel->commonLISTWHERE('remco_participants', $where, false);
          if ($result) {
            $response['status'] = '300';
            $response['error'] = 'Your password is wrong';
            echo json_encode($response);
            exit;
          }
          $response['status'] = '500';
          $response['error'] = "It seems your email doesn't matched any account, please register before login.";
          echo json_encode($response);
          exit;
        } else {
          $response['status'] = '500';
          $response['error'] = "It seems your email doesn't matched any account, please register before login.";
          echo json_encode($response);
          exit;
        }
      }
    }
  }
  public function forgotPassword() {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      $email = $request->email;
      $companyemail = "`company_email`=" . $this->webmodel->removeEscape($email);
      $resultCompany = $this->webmodel->commonLISTWHERE('remco_companies', $companyemail, false);
      if ($resultCompany) {
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
            "id" => $resultCompany[0]->web_id,
            "name" => $resultCompany[0]->company_name,
            "role" => 'Company'
          )
        );
        $token = $auth->generateToken($token);
        $name = $resultCompany[0]->company_name;
        $email = $resultCompany[0]->company_email;
        $this->sendForgotMail($name, $email, $token);
        $response['status'] = '200';
        $response['error'] = 'Password Reset Link is send to your Registed Mail';
        echo json_encode($response);
        exit;
      } else {
        $participantemail = "`participant_email`=" . $this->webmodel->removeEscape($email);
        $resultParticipant = $this->webmodel->commonLISTWHERE('remco_participants', $participantemail, false);
        if ($resultParticipant) {
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
              "id" => $resultParticipant[0]->web_id,
              "name" => $resultParticipant[0]->participant_fname,
              "role" => 'Participant'
            )
          );
          $token = $auth->generateToken($token);
          $name = $resultParticipant[0]->participant_fname;
          $email = $resultParticipant[0]->participant_email;
          $this->sendForgotMail($name, $email, $token);
          $response['status'] = '200';
          $response['error'] = 'Password Reset Link is send to your Registed Mail';
          echo json_encode($response);
          exit;
        } else {
          $response['status'] = '500';
          $response['error'] = "It seems your email doesn't matched any account, please register and try again.";
          echo json_encode($response);
          exit;
        }
      }
    }
  }
  public function sendForgotMail($name, $email, $token) {
    $subject = "Password Reset - Remco";
    $msg = "<html><head></head><body><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%'><tbody><tr><td style='background-color:#f6f5f1'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:70%; margin-top:60px; margin-bottom:60px;border:1px solid #056C93;'><tbody><tr><td colspan='3' style='background-color:#056C93; text-align:center; padding:10px 0%'><img alt='logo' src='https://remco.zerosoft.in/web/assets/images/logo.png' style='height:90px;'/></td></tr><tr><td style='background-color:#ffffff'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:80%;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif; font-size: 13px;'><tbody><tr><td colspan='3'><p>&nbsp;Hi " . $name . ",</p></td></tr><tr><td><p><tr><td><p>We received your request to reset your password, Please kindly click on the link below to reset your password.</p></td></tr></p></td></tr><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%; border-collapse: collapse; border-color: #000;'>
    <tr><td height='25' align='center'><b><a href=\"https://remco.zerosoft.in/web/reset-password?v_token=" . $token . "\">Reset Password</a></b></td></tr>
    <tr height='25'></tr></table></td></tr><tr><td><p>Thanks &amp; Regards ,</p></td></tr>
    <tr><td>Remco Team</td></tr></tbody></table></td></tr><tr><td colspan='3' style='background-color:#056C93; text-align:center;padding:20px 0%;color:#fff;'>&copy; 2021. Remco. All Rights Reserved.</td></tr></tbody></table></td></tr></tbody></table></body></html>";
    $from = 'info@remco.com';
    $sendEmail = array(
      'Subject' => $subject,
      'Message' => $msg,
      'To' => $email,
      'Cc' => '',
      'Clientname' => "Remco",
      'From' => $from,
    );
    $this->webmodel->sendEmail($sendEmail);
  }
  public function resetPassword() {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      $token = $request->token;
      $new_pass = hash('sha256',$request->new_pass);
      try {
        require __DIR__ . './../Libraries/Authorization_Token.php';
      } catch (Exception $e) {
        print_r($e);
        exit;
      }
      $auth = new \Authorization_Token();
      $result = $auth->decodeToken($token);
      if ($result['status'] === '200') {
        $role = $result['data']->data->role;
        $id = $result['data']->data->id;
        if ($role === 'Company') {
          $where = "`web_id`=" . $id;
          $result = $this->webmodel->commonLISTWHERE('remco_companies', $where, false);
          if ($result) {
            $id = $result[0]->web_id;
            $data = array(
              'company_password' => $new_pass
            );
            $resultUpdate = $this->webmodel->commonEDIT('remco_companies', $data, $id);
          }
        } else {
          $where = "`web_id`=" . $id;
          $result = $this->webmodel->commonLISTWHERE('remco_participants', $where, false);
          if ($result) {
            $id = $result[0]->web_id;
            $data = array(
              'participant_password' => $new_pass
            );
            $resultUpdate = $this->webmodel->commonEDIT('remco_participants', $data, $id);
          }
        }
        if ($result) {
          $response['status'] = '200';
          $response['data'] = $result[0];
          $response['role'] = $role;
          $response['error'] = 'Password changed successfully';
          echo json_encode($response);
          exit;
        } else {
          $response['status'] = '400';
          $response['error'] = 'Token is wrong';
          echo json_encode($response);
          exit;
        }
      } else {
        $response['status'] = '400';
        $response['error'] = 'Token is wrong';
        echo json_encode($response);
        exit;
      }
    }
  }
  public function participantLoginSocial()  {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      $email = $request->participant_email;
      $where = "`company_email`=" . $this->webmodel->removeEscape($email);
      $result = $this->webmodel->commonLISTWHERE('remco_companies', $where, false);
      if($result)
      {
          $response['status'] = '500';
        $response['error'] = "It seems your email is already registered with another account.";
        echo json_encode($response);
        exit;
      }
      $where = "`participant_status`= 1 AND `participant_email`=" . $this->webmodel->removeEscape($email) ;
      $result = $this->webmodel->commonLISTWHERE('remco_participants', $where,false);
          $wherestatus = "`participant_status`= 0 AND `participant_email`=" . $this->webmodel->removeEscape($email);
          $resultstatus = $this->webmodel->commonLISTWHERE('remco_participants', $wherestatus, false);
      if ($result) {
        $response['status'] = '200';
        $response['error'] = 'Login Successfully';
    //    unset($result[0]->participant_password);
        $response['data'] = $result[0];
        echo json_encode($response);
        exit;
      } else if($resultstatus){
            $response['status'] = '300';
            $response['error'] = 'Your account is not active, please contact admin';
            echo json_encode($response);
            exit;
      }
      else {
               $data = array(
                'participant_fname' => $request->firstName,
                'participant_lname' => $request->lastName,
                'participant_email' => $email,
                'participant_password' => '',
                'participant_country_code' => '',
                'participant_phone' => '',
                'participant_register_type' => 'website',
                'participant_subscription_status' => '0',
                'participant_status' => '0',
                'participant_created' => time(),
            );
            //echo $request->firstName;
            $name = $request->firstName;
            $randToken = rand("1000000", "9999999");
            $randTokenHash = md5(md5($randToken));
            $data["participant_confirmation"] =  $randTokenHash;
            $subject = "Sign up Confirmation for Participant account- Remco";
            $msg = "<html><head></head><body><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%'><tbody><tr><td style='background-color:#f6f5f1'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:70%; margin-top:60px; margin-bottom:60px;border:1px solid #056C93;'><tbody><tr><td colspan='3' style='background-color:#056C93; text-align:center; padding:10px 0%'><img alt='logo' src='https://remco.zerosoft.in/web/assets/images/logo.png' style='height:90px;'/></td></tr><tr><td style='background-color:#ffffff'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:80%;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif; font-size: 13px;'><tbody><tr><td colspan='3'><p>&nbsp;Hi " . $name . ",</p></td></tr><tr><td><p>Thank you for signing up for participant account in Remco, There is one more step to complete the registration. Please verify yourself by clicking the below mentioned link</p></td></tr><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%; border-collapse: collapse; border-color: #000;'>
            <tr><td height='25' align='center'><b><a href=\"https://zerosoft.in/dev/remco/restapi/public/index.php/Webservices/participantConfirmation?v_token=" . $randTokenHash . "\">Sign up Confirmation</a></b></td></tr>
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
                $response['error'] = 'Registered successfully, To activate your account please confirm in your registered email-address.';
                $response['data'] = $data;
                $response['id'] = $result;
                echo json_encode($response);
                exit;
            } else {
                $response['status'] = '500';
                $response['error'] = 'Can not be registered';
                echo json_encode($response);
                exit;
            }
        // $response['status'] = '500';
        // $response['error'] = "It seems your email doesn't matched any account, please register before login.";
        // echo json_encode($response);
        // exit;
      }
    }
  }
  public function changepassword() {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      $role = $request->role;
      $old_pass = $request->old_pass;
      $new_pass = hash('sha256',$request->new_pass);
      if ($role === 'Company') {
        $where = "`company_password`='" . hash('sha256', $old_pass) . "' AND `web_id`=" . $request->userId;
        $result = $this->webmodel->commonLISTWHERE('remco_companies', $where, false);
        if ($result) {
          $id = $result[0]->web_id;
          $data = array(
            'company_password' => $new_pass
          );
          $result = $this->webmodel->commonEDIT('remco_companies', $data, $id);
        }
      } else {
        $where = "`participant_password`='" . hash('sha256', $old_pass) . "' AND `web_id`=" . $request->userId;
        $result = $this->webmodel->commonLISTWHERE('remco_participants', $where, false);
        if ($result) {
          $id = $result[0]->web_id;
          $data = array(
            'participant_password' => $new_pass
          );
          $result = $this->webmodel->commonEDIT('remco_participants', $data, $id);
        }
      }
      if ($result) {
          $response['status'] = '200';
          $response['data'] = $result[0];
          $response['error'] = 'Password changed successfully';
          echo json_encode($response);
          exit;
      } else {
          $response['status'] = '400';
          $response['error'] = 'Old password is wrong';
          echo json_encode($response);
          exit;
      }
    }
  }

  public function pay(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      $splite = explode("-",$request->plan_campaign_limit);
      $no_of_users = $splite[1];
      $userid = $request->companyId;
      $data = array(
        'plan_name' => $request->plan_name,
        'plan_amount' => $request->plan_amount,
        'no_of_users' => $no_of_users,
      );
      $result = $this->webmodel->commonEDITWHERE('remco_companies', $data, "`web_id`=" . $userid);
      if ($result) {
          //$mail = sendemail($sendEmail);
          $response['status'] = '200';
          $response['error'] = 'subscription added successfully';
          $response['data'] = $result;
          echo json_encode($response);
          exit;
      } else {
          $response['status'] = '500';
          $response['error'] = 'Can not be add subscription';
          echo json_encode($response);
          exit;
      }
    }
  }

  public function addAnswer(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      // $data=array(
      //   'faq_respondent_id' => $request->userId,
      //   'faq_question_id' => $request->question_id,
      //   'faq_answer' => $request->faq_answer,
      // );
      $question_id=$request->question_id;
      $submitted_answer=$request->faq_answer;
      $reference_id=$request->reference_id;
      $question_legnth=$request->question_legnth;

      $update="UPDATE remco_learn_participants SET question_legnth = $question_legnth WHERE user_random_key='".$reference_id."'";
      $result = $this->webmodel->customSql1($update);

      $sql="SELECT web_id,learn_question_ans FROM remco_company_learn_questions where web_id=$question_id";
      $answer = $this->webmodel->customSql($sql);
      foreach($answer as $results_a)
      {
            $getted_answer = $results_a->	learn_question_ans;
            $getted_web_id = $results_a->web_id;
      }
      if($getted_answer == $submitted_answer){
        $update="UPDATE remco_learn_participants SET reference_credits = reference_credits + 1, correct_answer=correct_answer+1 WHERE user_random_key='".$reference_id."'";
        $result = $this->webmodel->customSql1($update);
      }else{
      }
      if ($result) {
          //$mail = sendemail($sendEmail);
          $response['status'] = '200';
          $response['error'] = 'Answer added successfully';
          $response['data'] = $result;
          echo json_encode($response);
          exit;
      } else {
          $response['status'] = '500';
          $response['error'] = 'Can not be Added';
          echo json_encode($response);
          exit;
      }
    }
  }

  public function addContactUs(){ 
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $data = array(
            'contact_name' => $request->name,
            'contact_email' => $request->email,
            'contact_message' => $request->message,
        );
        $email = $request->email;
            $name = $request->name;
            $message = $request->message;
            $subject = "Contact Details- Remco";
            $msg = "<html><head></head><body><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%'><tbody><tr><td style='background-color:#f6f5f1'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:70%; margin-top:60px; margin-bottom:60px;border:1px solid #1d3571;'><tbody><tr><td colspan='3' style='background-color:#1d3571; text-align:center; padding:10px 0%'><img alt='logo' src='https://remco.zerosoft.in/web/assets/images/logo.png' style='height:90px;'/></td></tr><tr><td style='background-color:#ffffff'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:80%;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif; font-size: 13px;'><tbody><tr><td colspan='3'><p>&nbsp;Hi " . $name . ",</p></td></tr><tr><td><p>Admin created an account for you.</p></td></tr><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%; border-collapse: collapse; border-color: #000;'>
            <tr><td height='25' align='left'>Name:  " . $name . "</td></tr>
            <tr><td height='25' align='left'>Email: " . $email . "</td></tr>
            <tr><td height='25' align='left'>message: " . $message . "</td></tr>
            <tr height='25'></tr></table></td></tr><tr><td><p>Thanks &amp; Regards ,</p></td></tr>
            <tr><td> Remco Team</td></tr></tbody></table></td></tr><tr><td colspan='3' style='background-color:#1d3571; text-align:center;padding:20px 0%;color:#fff;'>&copy; 2021 | Remco | All Rights Reserved.</td></tr></tbody></table></td></tr></tbody></table></body></html>";
            // $from = 'info@remco.com';
            $from = 'sathrak.zerosoft@hotmail.com';
            $sendEmail = array(
                'Subject' => $subject,
                'Message' => $msg,
                'To' => $from,
                'Cc' => '',
                'Clientname' =>  "Remco",
                'From' => $email,
            );
            $this->webmodel->sendEmail($sendEmail);
        $result = $this->webmodel->commonADD('remco_contact', $data);
        if ($result) {
            //$mail = sendemail($sendEmail);
            $response['status'] = '200';
            $response['error'] = 'Contact details added successfully';
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

  public function getevents()
  {

      if ($_SERVER['REQUEST_METHOD'] == 'GET') {  
          
          $start = $_REQUEST['start'];

          $end = $_REQUEST['end'];

          $type = $_REQUEST['type'];

          $current_time = time();

          if($type=='Contest'){
          $sql="SELECT * from remco_companies INNER JOIN remco_company_contest on remco_companies.web_id = remco_company_contest.company_contest_id WHERE $current_time between company_start_date and company_end_date ORDER BY remco_company_contest.web_id DESC LIMIT $start,6";
          }else if($type=='Learn'){
            $sql="SELECT * from remco_companies INNER JOIN remco_company_learn on remco_companies.web_id = remco_company_learn.company_learn_id WHERE $current_time between company_start_date and company_end_date ORDER BY remco_company_learn.web_id DESC LIMIT $start,6";
          }else{
            $sql="SELECT * from remco_companies INNER JOIN remco_company_sweepstakes on remco_companies.web_id = remco_company_sweepstakes.company_sweepstakes_id WHERE $current_time between company_start_date and company_end_date ORDER BY remco_company_sweepstakes.web_id DESC LIMIT $start,6";
          }
          $result = $this->webmodel->customSql($sql);

          if ($result) {
              $response['status'] = '200';
              $response['data'] = $result;
              echo json_encode($response);
              exit;
          } else {
              $response['status'] = '500';  
              echo json_encode($response);
              exit;
          }
      }
  }

  public function getVerificationCode(){ 
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $email = $request->email;
        $campany_id = $request->campaign_id;
        $email_verify="SELECT * FROM remco_gallery_vote WHERE voter_email='".$email."' AND campaign_contest_id=$campany_id";
        $result=$this->webmodel->customSql($email_verify);
        // $result = $this->webmodel->commonLISTWHERE('remco_gallery_vote', "`voter_email`=" . $this->webmodel->removeEscape($email) , "`campaign_contest_id`=" . $campany_id, false);
        if ($result) {
            $response['status'] = '300';
            $response['error'] = 'This email id already Voted.';
            echo  json_encode($response);
            exit;
        }
            $v_code = $request->varification_code;
            $subject = "Verification Code- Remco";
            $msg = "<html><head></head><body><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%'><tbody><tr><td style='background-color:#f6f5f1'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:70%; margin-top:60px; margin-bottom:60px;border:1px solid #1d3571;'><tbody><tr><td colspan='3' style='background-color:#1d3571; text-align:center; padding:10px 0%'><img alt='logo' src='https://remco.zerosoft.in/web/assets/images/logo.png' style='height:90px;'/></td></tr><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' style= border-collapse: collapse; border-color: #000;'>
            <tr><td height='25' align='left'>Your one time use verification code for voting is:  " . $v_code . "</td></tr>
            <tr height='25'></tr></table></td></tr><tr><td><p>Thanks &amp; Regards ,</p></td></tr>
            <tr><td> Remco Team</td></tr></tbody></table></td></tr><tr><td colspan='3' style='background-color:#1d3571; text-align:center;padding:20px 0%;color:#fff;'>&copy; 2021 | Remco | All Rights Reserved.</td></tr></tbody></table></td></tr></tbody></table></body></html>";
            // $from = 'info@remco.com';
            $from = $email;
            $sendEmail = array(
                'Subject' => $subject,
                'Message' => $msg,
                'To' => $from,
                'Cc' => '',
                'Clientname' =>  "Remco",
                'From' => 'test@zerosoft@gmail.com',
            );
            $this->webmodel->sendEmail($sendEmail);
            if ($sendEmail) {
              //$mail = sendemail($sendEmail);
              $response['status'] = '200';
              $response['error'] = 'verification code send in your email';
              $response['data'] = $sendEmail;
              echo json_encode($response);
              exit;
          } else {
              $response['status'] = '500';
              $response['error'] = 'please try again';
              echo json_encode($response);
              exit;
          }
    }
  }

  public function addVote(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
        $data = array(
          'voter_email' => $request->email,
          'voter_id' => $request->id,
          'voting_status' => '1',
          'gallery_image' => $request->voted_image,
          'image_id' => $request->voted_image_id,
          'campaign_contest_id' => $request->campaign_id,
        );
      $result = $this->webmodel->commonADD('remco_gallery_vote', $data);
      if ($result) {
          //$mail = sendemail($sendEmail);
          $response['status'] = '200';
          $response['error'] = 'User voting successfully';
          $response['data'] = $result;
          echo json_encode($response);
          exit;
      } else {
          $response['status'] = '500';
          $response['error'] = 'Can not be voted';
          echo json_encode($response);
          exit;
      }
    }
  }

  // public function addcredits(){
  //   if($_SERVER['REQUEST_METHOD'] == 'POST'){
  //     $postdata = file_get_contents("php://input");
  //     $request = json_decode($postdata);
  //     $credit_id=$request->credit_id;
  //     // $sql="SELECT * FROM `remco_companies_subscriptions` WHERE `subscribe_user_id`='".$userId."'";
  //     $sql="UPDATE remco_contest_participants SET reference_credits = reference_credits + 1 WHERE user_random_key='".$credit_id."'";
  //   }
  // }

  public function addcredits() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $img_id = $_GET["web_id"];
      $campaign_type = $_GET["campany_type"];
      if($campaign_type=='contest'){
      $sql="UPDATE remco_contest_participants SET reference_credits = reference_credits + 1 WHERE user_random_key='".$img_id."'";
      }else if($campaign_type=='learn'){
        $sql="UPDATE remco_learn_participants SET reference_credits = reference_credits + 1 WHERE user_random_key='".$img_id."'";
      }
      $result = $this->webmodel->customSql1($sql);
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

  // public function addcreditsLearn() {
  //   if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  //     $img_id = $_GET["web_id"];
  //     $sql="UPDATE remco_learn_participants SET reference_credits = reference_credits + 1 WHERE user_random_key='".$img_id."'";
  //     $result = $this->webmodel->customSql1($sql);
  //     if ($result) {
  //       $response['status'] = '200';
  //       $response['data'] = $result;
  //       echo json_encode($response);
  //       exit;
  //     } else {
  //       $this->webmodel->commonThrow();
  //     }
  //   }
  // }

  public function addinstacredits() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $img_id = $_GET["web_id"];
      $campany_type = $_GET["campaign_type"];
      if($campany_type=='contest'){
        $sql="UPDATE remco_contest_participants SET reference_credits = reference_credits + 1,insta_creditted='1' WHERE user_random_key='".$img_id."'";
      }else if($campany_type=='learn'){
        $sql="UPDATE remco_learn_participants SET reference_credits = reference_credits + 1,insta_creditted='1' WHERE user_random_key='".$img_id."'";
      }
      $result = $this->webmodel->customSql1($sql);
      // $data = array(
      //   'insta_creditted' => '1',
      // );
      // $result = $this->webmodel->commonEDITWHERE('remco_contest_participants', $data, "`user_random_key`=" . $img_id); 
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

  public function addfbcredits() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $img_id = $_GET["web_id"];
      $campany_type = $_GET["campaign_type"];
      if($campany_type=='contest'){
      $sql="UPDATE remco_contest_participants SET reference_credits = reference_credits + 1,fb_creditted='1' WHERE user_random_key='".$img_id."'";
      }else if($campany_type=='learn'){
        $sql="UPDATE remco_learn_participants SET reference_credits = reference_credits + 1,fb_creditted='1' WHERE user_random_key='".$img_id."'";
      }
      $result = $this->webmodel->customSql1($sql); 
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

  public function addContacWithtUs(){ 
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $data = array(
            'contact_name' => $request->name,
            'contact_email' => $request->email,
            'contact_message' => $request->message,
        );
        $email = $request->email;
            $name = $request->name;
            $message = $request->message;
            $subject = "Contact Details- Remco";
            $msg = "<html><head></head><body><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%'><tbody><tr><td style='background-color:#f6f5f1'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:70%; margin-top:60px; margin-bottom:60px;border:1px solid #1d3571;'><tbody><tr><td colspan='3' style='background-color:#1d3571; text-align:center; padding:10px 0%'><img alt='logo' src='https://remco.zerosoft.in/web/assets/images/logo.png' style='height:90px;'/></td></tr><tr><td style='background-color:#ffffff'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:80%;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif; font-size: 13px;'><tbody><tr><td colspan='3'><p>&nbsp;Hi " . $name . ",</p></td></tr><tr><td><p>Admin created an account for you.</p></td></tr><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%; border-collapse: collapse; border-color: #000;'>
            <tr><td height='25' align='left'>Name:  " . $name . "</td></tr>
            <tr><td height='25' align='left'>Email: " . $email . "</td></tr>
            <tr><td height='25' align='left'>message: " . $message . "</td></tr>
            <tr height='25'></tr></table></td></tr><tr><td><p>Thanks &amp; Regards ,</p></td></tr>
            <tr><td> Remco  Team</td></tr></tbody></table></td></tr><tr><td colspan='3' style='background-color:#1d3571; text-align:center;padding:20px 0%;color:#fff;'>&copy; 2021 | Remco | All Rights Reserved.</td></tr></tbody></table></td></tr></tbody></table></body></html>";
            $from = 'info@remco.com';
            $sendEmail = array(
                'Subject' => $subject,
                'Message' => $msg,
                'To' => $from,
                'Cc' => '',
                'Clientname' =>  "Remco",
                'From' => $email,
            );
            $this->webmodel->sendEmail($sendEmail);
        $result = $this->webmodel->commonADD('remco_contact', $data);
        if ($result) {
            //$mail = sendemail($sendEmail);
            $response['status'] = '200';
            $response['error'] = 'Contact details added successfully';
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
  public function getAccountDetails() {
    if ($_SERVER['REQUEST_METHOD'] == 'POST')  {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      $role = $request->role;
      $where = "`web_id`=" . $request->userId;
      if($role === 'Company') {
        $result = $this->webmodel->commonLISTWHERE('remco_companies', $where, false);
        unset($result[0]->company_password);
      } else {
        $result = $this->webmodel->commonLISTWHERE('remco_participants', $where, false);
        unset($result[0]->participant_password);
      }
      if ($result) {
        $response['status'] = '200';
        $response['data'] = $result[0];
        echo json_encode($response);
        exit;
       } else {
        $response['status'] = '500';
        $response['error'] = 'No details found';
        echo json_encode($response);
        exit;
      }
    }
  }

  public function getRefId() {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      $ref_id=$request->ref;
      $sql1="UPDATE remco_contest_participants SET reference_credits = reference_credits + 1 WHERE user_random_key='".$ref_id."'";
      $sql="SELECT 	user_random_key,campaign_id FROM `remco_contest_participants` WHERE `user_random_key`='".$ref_id."'";
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

  public function getRefIdLearn() {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      $ref_id=$request->ref;
      $sql1="UPDATE remco_learn_participants SET reference_credits = reference_credits + 1 WHERE user_random_key='".$ref_id."'";
      $sql="SELECT 	user_random_key,campaign_company_id,campaign_id FROM `remco_learn_participants` WHERE `user_random_key`='".$ref_id."'";
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

  public function getImageId() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $img_id = $_GET["web_id"];
      $resultExist = $this->webmodel->commonLISTWHERE('remco_contest_gallary', "`web_id`=" . $img_id , false);
      if ($resultExist) {
        //$mail = sendemail($sendEmail);
        $response['status'] = '200';
        $response['error'] = 'Image gets successfully.';
        $response['data'] = $resultExist;
        echo json_encode($response);
        exit;
    } else {
        $response['status'] = '500';
        $response['error'] = 'data not found';
        echo json_encode($response);
        exit;
    }
    }
  }

  public function getcompId() {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      $ref_id=$request->comp_id;
      $sql="SELECT company_contest_id,campaign_type FROM `remco_company_contest` WHERE `web_id`='".$ref_id."'";

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

  public function getcompIdLearn() {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      $ref_id=$request->comp_id;
      // print_r($ref_id);
      $sql="SELECT company_learn_id,campaign_type FROM `remco_company_learn` WHERE `web_id`='".$ref_id."'";
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


  public function editCompanyInfo() {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      // $splite = explode("/", $request->company_country_code);
      // $countryCode = $splite[0];
      // $countryName = $splite[1];
      $data = array(
        'company_name' => $request->company_name,
        'company_description' => $request->company_description,
        'company_email' => $request->company_email,
        'company_website' => $request->company_website,
        'company_country_code' => $request->company_country_code,
        // 'company_country_name' => $request->company_country,
        'company_phone' => $request->company_phone,
        'profile' => $request->profile,
      );
      $email = $request->company_email;
      $company_id = $request->company_id;
      $where = "`web_id`=" . $request->company_id . " AND `company_email`=" . $this->webmodel->removeEscape($email);
      $resultExist = $this->webmodel->commonLISTWHERE('remco_companies', $where, false);
      if ($resultExist) {
        $id = $resultExist[0]->web_id;
        $result = $this->webmodel->commonEDIT('remco_companies', $data, $id);
        if ($result) {
          $response['status'] = '200';
          $response['error'] = 'Profile Info updated successfully';
          $response['data'] = $result;
          echo json_encode($response);
          exit;
        } else {
          $response['status'] = '500';
          $response['error'] = 'Can not be updated';
          echo json_encode($response);
          exit;
        }
      } else {
        $response['status'] = '400';
        $response['error'] = 'Email id is wrong';
        echo json_encode($response);
        exit;
      }
    }
  }
  public function editParticipantInfo() {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      // $splite = explode("/", $request->participant_country_code);
      // $name = $splite[1];
      // $code = $splite[0];
      $data = array(
        'participant_fname' => $request->participant_fname,
        'participant_lname' => $request->participant_lname,
        'participant_email' => $request->participant_email,
        'participant_country_code' => $request->participant_country_code,
        // 'participant_country_name' => $name,
        'participant_phone' => $request->participant_phone,
        'profile' => $request->profile,
      );
      $email = $request->participant_email;
      $participant_id = $request->participant_id;
      $where = "`web_id`=" . $request->participant_id . " AND `participant_email`=" . $this->webmodel->removeEscape($email);
      $resultExist = $this->webmodel->commonLISTWHERE('remco_participants', $where, false);
      if ($resultExist) {
        $id = $resultExist[0]->web_id;
        $result = $this->webmodel->commonEDIT('remco_participants', $data, $id);
        if ($result) {
          $response['status'] = '200';
          $response['error'] = 'Profile Info updated successfully';
          $response['data'] = $result;
          echo json_encode($response);
          exit;
        } else {
          $response['status'] = '500';
          $response['error'] = 'Can not be updated';
          echo json_encode($response);
          exit;
        }
      } else {
        $response['status'] = '400';
        $response['error'] = 'Email id is wrong';
        echo json_encode($response);
        exit;
      }
    }
  }
  public function getAllPlan() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $result = $this->webmodel->commonLIST('remco_subscription');
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
  public function getAllContents() {
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

  public function getAllfaqs() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $quiz_id = $_GET["quiz_id"];
      $campany_id = $_GET["campany_id"];
      $sql ="SELECT * FROM remco_company_learn_questions WHERE learn_form_id=$quiz_id AND company_id=$campany_id";
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

  public function getAllAnswers() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $ans_id = $_GET["quiz_id"];
      $campany_id = $_GET["campany_id"];
      $sql ="SELECT faq_answer FROM remco_company_learn_answers WHERE faq_respondent_id=$campany_id";
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

    // public function getAllAnswers() {
  //   if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  //     $ans_id = $_GET["quiz_id"];
  //     $campany_id = $_GET["campany_id"];
  //     $sql ="SELECT * FROM remco_company_learn_answers INNER JOIN remco_company_learn_questions ON remco_company_learn_answers.company_id = remco_company_learn_questions.company_id WHERE remco_company_learn_answers.faq_respondent_id=$campany_id GROUP BY remco_company_learn_questions.web_id HAVING COUNT(*) > 1";
  //     $result = $this->webmodel->customSql($sql);
  //     if ($result) {
  //       $response['status'] = '200';
  //       $response['data'] = $result;
  //       echo json_encode($response);
  //       exit;
  //     } else {
  //       $this->webmodel->commonThrow();
  //     }
  //   }
  // }

  public function getSubmissionImage() {
    if ($_SERVER['REQUEST_METHOD'] == 'POST')  {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      $submission_id = $request->submission_id;
      $sql ="SELECT * FROM `remco_contest_gallary` WHERE contest_url_type='image' AND submission='".$submission_id."'";
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

  public function serachResult() {
    if ($_SERVER['REQUEST_METHOD'] == 'POST')  {
      $current_time = time();
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      $search_value = $request->search_value;
      $sql ="SELECT * from remco_companies INNER JOIN remco_company_contest on remco_companies.web_id = remco_company_contest.company_contest_id WHERE $current_time between company_start_date and company_end_date and remco_companies.company_name LIKE '%word1%' AND remco_companies.company_name='".$search_value."'";
      print_r($sql);
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
  
  public function getAllimages() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $web_id = $_GET["web_id"];
      // $id = $_GET["id"];
      $sql ="SELECT * FROM `remco_contest_gallary` WHERE contest_url_type='image' AND campaign_id=$web_id";
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

  public function getAllSocialImages() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $sql ="SELECT * FROM `remco_contest_gallary` WHERE contest_url_type!='image'";
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

  public function getAllfaq() {
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
  public function getAllSites() {
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
  public function getAllContact() {
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
  public function getAllBlockChain() {
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
  public function getAllWhyRunSocialMedia() {
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
  public function getAllWhyRunSweepStakes() {
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
  public function getContest(){
    // if($_SERVER['REQUEST_METHOD'] == 'POST'){
      $current_time = time();
      $present_contest_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_contest
      WHERE  $current_time between company_start_date and company_end_date";
      $present_contest_resultdata = $this->webmodel->customSql($present_contest_sql);
      $before_contest_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_contest
      WHERE  $current_time > company_end_date";
      $before_contest_resultdata = $this->webmodel->customSql($before_contest_sql);
      $beforesqldata = array(
        'company_campaign_mode' => 'Finished',
        );
        $aftersqldata = array(
          'company_campaign_mode' => 'Live',
        );
        if($present_contest_resultdata){
              $present_contest_count = count($present_contest_resultdata);
              for($i=0; $i<$present_contest_count; $i++){
                  $contest_userid = $present_contest_resultdata[$i]->web_id;
               $contest_result = $this->webmodel->commonEDITWHERE('remco_company_contest', $aftersqldata, "`web_id`=" . $contest_userid); 
              }
          }
          if($before_contest_resultdata){
            $before_contest_count = count($before_contest_resultdata);
            for($i=0; $i<$before_contest_count; $i++){
                $contest_userid = $before_contest_resultdata[$i]->web_id;
            $contest_result = $this->webmodel->commonEDITWHERE('remco_company_contest', $beforesqldata, "`web_id`=" . $contest_userid);
          }
          // $this->winnerAnnounce();
      // }
    }
  }

  public function winnerAnnounce(){
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $web_id = $_GET["web_id"];
      $sql1 = "SELECT reference_credits,campaign_company_id from remco_contest_participants where campaign_participant_id=$web_id";
      $get_sql1 = $this->webmodel->customSql($sql1);
      foreach($get_sql1 as $results_a)
      {
            $get_sql2 = $results_a->campaign_company_id;
      }
      $sql2 = "SELECT winning_credits from remco_company_contest where company_contest_id=$get_sql2";
      $get_sql3 = $this->webmodel->customSql($sql2);
      foreach($get_sql3 as $results_b)
      {
            $get_sql4 = $results_b->winning_credits;
      }
      $winningStatus = array(
        'winning_status' => 'Winner',
        );
        $loserStatus = array(
          'winning_status' => 'loser',
        );
      $current_time = time();
      $before_contest_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_contest
      WHERE  $current_time > company_end_date";
      $before_contest_resultdata = $this->webmodel->customSql($before_contest_sql);
      $get_sql5 = $get_sql1[0]-> reference_credits;
      if($before_contest_resultdata){
        if($get_sql4 >= $get_sql5){
          $sql0="UPDATE remco_contest_participants SET winning_status = 'winner' WHERE 	campaign_participant_id='".$web_id."'";
          $result = $this->webmodel->customSql1($sql0);
        }
      }
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

  public function learnwinnerAnnounce(){
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $web_id = $_GET["web_id"];
      // print_r($web_id);
      $sql1="SELECT * FROM remco_company_learn_answers where faq_respondent_id=$web_id";
      $sql11 = $this->webmodel->customSql($sql1);
      foreach($sql11 as $results_a)
      {
        $question_id=$results_a->faq_question_id;
        $answer=$results_a->faq_answer;
      }
      $sql2="SELECT * from remco_company_learn_questions where web_id=$question_id";
      $sql21 = $this->webmodel->customSql($sql2);
      foreach($sql21 as $results_b)
      {
        $question[]=$results_b->learn_question;
        $question_web_id=$results_b->web_id;
        $option1=$results_b->learn_question_option1;
        $option2=$results_b->learn_question_option2;
        $option3=$results_b->learn_question_option3;
        $option4=$results_b->learn_question_option4;
        $learn_answer=$results_b->learn_question_ans;
      }
      $question_length=count($question);
      for($question=0;$question<$question_length;$question++){
        if($question_web_id==$question_id){
          if($option1==$answer){
            $a=['A'];
            if($learn_answer==$a[0]){
              echo 'your A ans is correct';
            }else{
              echo '1st answer is wrong';
            }
          }else if($option2==$answer){
            $b=['B'];
            if($learn_answer==$b[0]){
              echo 'your B ans is correct';
            }
          }else if($option3==$answer){
            $c=['C'];
            if($learn_answer==$c[0]){
              echo 'your C ans is correct';
            }
          }else if($option4==$answer){
            $d=['D'];
            if($learn_answer==$d[0]){
              echo 'your D ans is correct';
            }
          }
        }
      }
    }
  }

  public function learandearnnwinnerAnnounce(){
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $web_id = $_GET["web_id"];
      $sql1 = "SELECT reference_credits,campaign_company_id from remco_learn_participants where campaign_participant_id=$web_id";
      $get_sql1 = $this->webmodel->customSql($sql1);
      foreach($get_sql1 as $results_a)
      {
            $get_sql2 = $results_a->campaign_company_id;
      }
      $sql2 = "SELECT winning_credits from remco_company_learn where company_learn_id=$get_sql2";
      $get_sql3 = $this->webmodel->customSql($sql2);
      foreach($get_sql3 as $results_b)
      {
            $get_sql4 = $results_b->winning_credits;
      }
      $winningStatus = array(
        'winning_status' => 'Winner',
        );
        $loserStatus = array(
          'winning_status' => 'loser',
        );
      $current_time = time();
      $before_contest_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_learn
      WHERE  $current_time > company_end_date";
      $before_contest_resultdata = $this->webmodel->customSql($before_contest_sql);
      $get_sql5 = $get_sql1[0]-> reference_credits;
      if($before_contest_resultdata){
        if($get_sql4 >= $get_sql5){
          $sql0="UPDATE remco_learn_participants SET winning_status = 'winner' WHERE 	campaign_participant_id='".$web_id."'";
          $result = $this->webmodel->customSql1($sql0);
        }
      }
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

  public function getAllCompanyContests() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $this->getContest();
      $current_time = time();
      $sql="SELECT * from remco_companies INNER JOIN remco_company_contest on remco_companies.web_id = remco_company_contest.company_contest_id WHERE $current_time between company_start_date and company_end_date";
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

  public function getEmaill(){

    $current_time = time();

    $present_email_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_email
    WHERE  $current_time between company_start_date and company_end_date";
    $present_email_resultdata = $this->webmodel->customSql($present_email_sql);

    $before_email_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_email
    WHERE  $current_time > company_end_date";
    $before_email_resultdata = $this->webmodel->customSql($before_email_sql);

    $before_email_data = array(
      'company_campaign_mode' => 'Finished',
    );
    $present_email_data = array(
        'company_campaign_mode' => 'Live',
    );

    if($present_email_resultdata){
      $present_email_count = count(array($present_email_resultdata));
      //$present_email_count = 1;
      for($i=0; $i<$present_email_count; $i++){
          $email_userid = $present_email_resultdata[$i]->web_id;
       $email_result = $this->webmodel->commonEDITWHERE('remco_company_email', $present_email_data, "`web_id`=" . $email_userid); 
      } 
  }

    if($before_email_resultdata){
      $before_email_count = count($before_email_resultdata);
      for($i=0; $i<$before_email_count; $i++){
        $email_userid = $before_email_resultdata[$i]->web_id;
        $email_result = $this->webmodel->commonEDITWHERE('remco_company_email', $before_email_data, "`web_id`=" . $email_userid); 
      }
    }
  }

  public function getAllCompanyEmailForms() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $this->getEmaill();
      $current_time = time();
      $sql="SELECT * from remco_companies INNER JOIN remco_company_email on remco_companies.web_id = remco_company_email.company_email_id WHERE $current_time between company_start_date and company_end_date";
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

  public function getLearn(){
    $current_time = time();
      $present_learn_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_learn
      WHERE  $current_time between company_start_date and company_end_date";
      $present_learn_resultdata = $this->webmodel->customSql($present_learn_sql);

      $before_learn_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_learn
      WHERE  $current_time > company_end_date";
      $before_learn_resultdata = $this->webmodel->customSql($before_learn_sql);

      $before_learn_data = array(
          'company_campaign_mode' => 'Finished',
      );
      $present_learn_data = array(
          'company_campaign_mode' => 'Live',
      );
      if($present_learn_resultdata){
          $present_learn_count = count($present_learn_resultdata);  
          for($i=0; $i<$present_learn_count; $i++){
              $learn_userid = $present_learn_resultdata[$i]->web_id;
          $learn_result = $this->webmodel->commonEDITWHERE('remco_company_learn', $present_learn_data, "`web_id`=" . $learn_userid)              ; 
          } 
      }

      if($before_learn_resultdata){
          $before_learn_count = count($before_learn_resultdata);
          for($i=0; $i<$before_learn_count; $i++){
              $learn_userid = $before_learn_resultdata[$i]->web_id;
          $learn_result = $this->webmodel->commonEDITWHERE('remco_company_learn', $before_learn_data, "`web_id`=" . $learn_userid); 
          }
      }
  }

  public function getAllCompanyLearnAndEarn() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $this->getLearn();
      $current_time = time();
      $sql="SELECT * from remco_companies INNER JOIN remco_company_learn on remco_companies.web_id = remco_company_learn.company_learn_id WHERE $current_time between company_start_date and company_end_date";
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

  public function getsocial(){

    $current_time = time();

    $present_social_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_social_comments
    WHERE  $current_time between company_start_date and company_end_date";
    $present_social_resultdata = $this->webmodel->customSql($present_social_sql);
   
    $before_social_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_social_comments
    WHERE  $current_time > company_end_date";
    $before_social_resultdata = $this->webmodel->customSql($before_social_sql);
   
    $before_social_data = array(
        'company_campaign_mode' => 'Finished',
    );
    $present_social_data = array(
        'company_campaign_mode' => 'Live',
    );
   
    if($present_social_resultdata){
        $present_social_count = count($present_social_resultdata);
        for($i=0; $i<$present_social_count; $i++){
            $social_userid = $present_social_resultdata[$i]->web_id;
         $social_result = $this->webmodel->commonEDITWHERE('remco_company_social_comments', $present_social_data, "`web_id`=" .$social_userid); 
        } 
    }
   
    if($before_social_resultdata){
        $before_social_count = count($before_social_resultdata);
        for($i=0; $i<$before_social_count; $i++){
            $social_userid = $before_social_resultdata[$i]->web_id;
        $social_result = $this->webmodel->commonEDITWHERE('remco_company_social_comments', $before_social_data, "`web_id`=" .$social_userid); 
        }
    }

  }

  public function getAllCompanySocialComments() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $this->getsocial();
      $current_time = time();
      $sql="SELECT * from remco_companies INNER JOIN remco_company_social_comments on remco_companies.web_id = remco_company_social_comments.company_social_comments_id WHERE $current_time between company_start_date and company_end_date";
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

  public function getSweep(){
    $current_time = time();
      $present_sweep_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_sweepstakes
      WHERE  $current_time between company_start_date and company_end_date";
      $present_sweep_resultdata = $this->webmodel->customSql($present_sweep_sql);
    
      $before_sweep_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_sweepstakes
      WHERE  $current_time < company_start_date";
      $before_sweep_resultdata = $this->webmodel->customSql($before_sweep_sql);
    
      $before_sweep_data = array(
          'company_campaign_mode' => 'Finished',
      );
      $present_sweep_data = array(
          'company_campaign_mode' => 'Live',
      );
      
      if($present_sweep_resultdata){
          $present_sweep_count = count($present_sweep_resultdata);
          //$present_sweep_count = 1;
          for($i=0; $i<$present_sweep_count; $i++){
              $sweep_userid = $present_sweep_resultdata[$i]->web_id;
          $sweep_result = $this->webmodel->commonEDITWHERE('remco_company_sweepstakes', $present_sweep_data, "`web_id`=" .  $sweep_userid); 
          } 
      }
    
      if($before_sweep_resultdata){
          $before_sweep_count = count($before_sweep_resultdata);
          for($i=0; $i<$before_sweep_count; $i++){
              $sweep_userid = $before_sweep_resultdata[$i]->web_id;
          $sweep_result = $this->webmodel->commonEDITWHERE('remco_company_sweepstakes', $before_sweep_data, "`web_id`=" . $sweep_userid); 
          }
      }
  }


  public function getAllCompanySweepStakes() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $this->getSweep();
      $current_time = time();
      $sql="SELECT * from remco_companies INNER JOIN remco_company_sweepstakes on remco_companies.web_id = remco_company_sweepstakes.company_sweepstakes_id WHERE $current_time between company_start_date and company_end_date";
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

  // public function getContestCount(){
  //   if($_SERVER['REQUEST_METHOD']=='GET'){
  //     $sql="SELECT count(*) Count_1 from remco_company_contest WHERE company_campaign_mode='Live'";
  //     $result = $this->webmodel->customSql($sql);
  //     if($result){
  //       $response['status'] = '200';
  //       $response['data'] = $result;
  //       echo json_encode($response);
  //       exit;
  //     }else{
  //       $this->webmodel->commonThrow();
  //     }
  //   }
  // }

  public function getContestCount() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $sql="SELECT count(*) Count_1 from remco_company_contest WHERE company_campaign_mode='Live'";
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


  public function getCount() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') { 
      $current_time = time();
      $sql="SELECT count(*) Count_1 from remco_company_contest WHERE $current_time between company_start_date and company_end_date union all select count(*) Count_2 from remco_company_email WHERE $current_time between company_start_date and company_end_date union all select count(*) Count_3 from remco_company_learn WHERE $current_time between company_start_date and company_end_date union all select count(*) Count_4 from remco_company_social_comments WHERE $current_time between company_start_date and company_end_date union all select count(*) Count_5 from remco_company_sweepstakes WHERE $current_time between company_start_date and company_end_date";
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
  public function getAllCompanyEntryFields() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $web_id = $_GET["company_id"];
      $type = $_GET["campaign_type"];
      if($type == 'contest'){
      $sql="SELECT * FROM remco_pre_entry_form WHERE company_id= $web_id AND campaign_type= 'contest' ";
      }else if($type=='email'){
        $sql="SELECT * FROM remco_pre_entry_form WHERE company_id= $web_id AND campaign_type= 'email' ";
      }else if($type=='learn'){
        $sql="SELECT * FROM remco_pre_entry_form WHERE company_id= $web_id AND campaign_type= 'learn' ";
      }else{
        $sql="SELECT * FROM remco_pre_entry_form WHERE company_id= $web_id AND campaign_type= 'sweep' ";
      }
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
  public function getEmail() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $web_id = $_GET["company_id"];
      $sql="SELECT user_limit,company_email FROM remco_companies WHERE remco_companies.web_id= $web_id ";
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

  public function getEmails() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $web_id = $_GET["company_id"];
      $sql="SELECT participant_email FROM remco_participants WHERE remco_participants.web_id= $web_id ";
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

  public function getAllcredits() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $credit_id = $_GET["credit_id"];
      $campaign_type = $_GET["campaign_type"];
      $referal_code = $_GET["referal_code"];
      if($campaign_type=='contest'){
        $sql="SELECT insta_creditted,fb_creditted,reference_credits FROM remco_contest_participants WHERE remco_contest_participants.campaign_participant_id= $credit_id AND user_random_key='".$referal_code."'";
      }else if($campaign_type=='learn'){
        $sql="SELECT insta_creditted,fb_creditted,reference_credits FROM remco_learn_participants WHERE remco_learn_participants.campaign_participant_id= $credit_id AND user_random_key='".$referal_code."'";
      }
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

  // public function getAllcreditsLearn() {
  //   if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  //     $credit_id = $_GET["credit_id"];
  //     $sql="SELECT insta_creditted,fb_creditted,reference_credits FROM remco_learn_participants WHERE remco_learn_participants.campaign_participant_id= $credit_id ";
  //     $result = $this->webmodel->customSql($sql);
  //     if ($result) {
  //       $response['status'] = '200';
  //       $response['data'] = $result;
  //       echo json_encode($response);
  //       exit;
  //     } else {
  //       $this->webmodel->commonThrow();
  //     }
  //   }
  // }


  public function getActiveId() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $web_id = $_GET["company_id"];
      $random_key = $_GET["random_key"];
      $sql="SELECT * FROM remco_contest_participants WHERE remco_contest_participants.campaign_participant_id= $web_id AND remco_contest_participants.campaign_id='".$random_key."'";
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

  public function getActiveIdLearn() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $web_id = $_GET["company_id"];
      $random_key = $_GET["random_key"];
      $sql="SELECT * FROM remco_learn_participants WHERE remco_learn_participants.campaign_participant_id= $web_id AND remco_learn_participants.campaign_id='".$random_key."'";
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

  public function getActiveIdSweep() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $web_id = $_GET["company_id"];
      $random_key = $_GET["random_key"];
      $sql="SELECT * FROM remco_sweepstakes_participants WHERE remco_sweepstakes_participants.campaign_participant_id= $web_id AND remco_sweepstakes_participants.campaign_id='".$random_key."'";
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

  // public function getimageUrl() {
  //   if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  //     $url_id = $_GET["url_id"];
  //     $sql="SELECT * FROM remco_contest_gallary WHERE remco_contest_gallary.campaign_participant_id= $url_id ";
  //     $result = $this->webmodel->customSql($sql);
  //     if ($result) {
  //       $response['status'] = '200';
  //       $response['data'] = $result;
  //       echo json_encode($response);
  //       exit;
  //     } else {
  //       $this->webmodel->commonThrow();
  //     }
  //   }
  // }

  public function getimageUrl() {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      $url_id=$request->image_url_id;
      // $sql="SELECT * FROM `remco_companies_subscriptions` WHERE `subscribe_user_id`='".$userId."'";
      $sql="SELECT * FROM `remco_contest_gallary` WHERE `submission`='".$url_id."'";
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

  public function getRandomKey() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $key = $_GET["random_key"];
      $sql="SELECT * FROM remco_contest_participants WHERE remco_contest_participants.campaign_participant_id= $key ";
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

  public function getplan() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $web_id = $_GET["plan_id"];
      $sql="SELECT web_id,plan_name,plan_description,plan_amount,plan_campaign_limit FROM remco_subscription WHERE remco_subscription.web_id= $web_id ";
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

  public function getActive(){
    $current_time = time();
    $before_contest_sql = "SELECT subscribe_user_id,subscribe_date,subscribe_expired_date FROM remco_companies_subscriptions
    WHERE  $current_time > subscribe_expired_date";
    $before_contest_resultdata = $this->webmodel->customSql($before_contest_sql);
    $subStatus = array(
      'subscribe_status' => 'inactive',
      );
      if($before_contest_resultdata){
        $before_contest_count = count($before_contest_resultdata);
        for($i=0; $i<$before_contest_count; $i++){
            $company_userid = $before_contest_resultdata[$i]->web_id;
        $contest_result = $this->webmodel->commonEDITWHERE('remco_companies_subscriptions', $subStatus, "`subscribe_user_id`=" . $company_userid); 
      }
  }
}

  public function getplandetails() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $web_id = $_GET["planDetails_id"];
      $sql="SELECT * FROM remco_companies_subscriptions WHERE subscribe_user_id=$web_id AND subscribe_status!='cancelled' ORDER BY web_id DESC LIMIT 1";
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

  public function getcancelplandetails() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $web_id = $_GET["planDetails_id"];
      $sql="SELECT * FROM remco_companies_subscriptions WHERE subscribe_user_id=$web_id AND subscribe_status='cancelled' ORDER BY web_id DESC LIMIT 1";
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

  public function getplanhistory() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $web_id = $_GET["planDetails_id"];
      $sql="SELECT * FROM remco_companies_subscriptions WHERE remco_companies_subscriptions.subscribe_user_id= $web_id AND remco_companies_subscriptions.subscribe_plan_amount!='free' AND remco_companies_subscriptions.subscribe_status!='cancelled'";
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

  public function getAllCompanies() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $result = $this->webmodel->commonLIST('remco_companies');
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
  public function getAllCompaniesContest() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $result = $this->webmodel->commonLIST('remco_company_contest');
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
  public function getAllCompaniesId() {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $web_id = $_GET["web_id"];
      $campaign_type = $_GET["campaign_type"];
      if($campaign_type === 'contest'){
      $resultExist = $this->webmodel->commonLISTWHERE('remco_company_contest', "`web_id`=" . $web_id , false);
      }else if($campaign_type === 'email'){
      $resultExist = $this->webmodel->commonLISTWHERE('remco_company_email', "`web_id`=" . $web_id , false);
      }else if($campaign_type === 'learn'){
        $resultExist = $this->webmodel->commonLISTWHERE('remco_company_learn', "`web_id`=" . $web_id , false);
      }else if($campaign_type === 'social'){
        $resultExist = $this->webmodel->commonLISTWHERE('remco_company_social_comments', "`web_id`=" . $web_id , false);
      }else{
        $resultExist = $this->webmodel->commonLISTWHERE('remco_company_sweepstakes', "`web_id`=" . $web_id , false);
      }
        if ($resultExist) {
          $response['status'] = '200';
          $response['error'] = 'data gets successfully.';
          $response['data'] = $resultExist;
          echo json_encode($response);
          exit;
      } else {
          $response['status'] = '500';
          $response['error'] = 'Companies not found';
          echo json_encode($response);
          exit;
      }
    }
  }

  public function makePayment1(){
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      $user_id = $request->userId;
      $email = $request->email;
      $payment_method_id = $request->payment_method_id;
      $plan_id = $request->plan_id;
      $user_limit = $request->user_limit;

      $plan = $this->webmodel->commonVIEW('remco_subscription', $plan_id);
      $userDetails = $this->webmodel->commonVIEW('remco_companies', $user_id);
      $userDetails = $userDetails[0];
      $planAmount = $plan[0]->plan_amount;
      $planAmount = abs($planAmount);

      $paymentMethod = $request->pay_method;

          $subResponse = $request->payment_response;
          $subscrJson['status'] = 'active';
          $subscrJson['id'] = $subResponse->id;
          $subscrJson['latest_invoice'] = '';
          $subscription = $request->payment_response;

      $today = date("Y/m/d H:i:s");
      $days30 = date('Y/m/d H:i:s', strtotime('+1 month', time()));
      if ($subscrJson) {
          $subscrStatus = $subscrJson['status'];
          if ($subscrStatus == 'active') {
              $data = array(
                  'subscribe_user_id' => $user_id,
                  'subscribe_dtime' => time(),
                  'subscribe_plan_id' => $plan_id,
                  'subscribe_plan_amount' => $planAmount,
                  'subscribe_date' => time(),
                  'user_limit' => $user_limit,
                  'subscribe_status' => "Active",
                  'subscribe_payment_status' => "1",
                  'subscribe_expired_date' => strtotime('+1 month', time()),
                  'subscribe_plan_name' => $plan[0]->plan_name,
                  'subscribe_payment_type' => 'Paypal',
                  'subscr_id' => $subscrJson["id"],
                  'subscribe_response' => json_encode($subscription)
              );
              // $getId="SELECT subscribe_user_id from remco_companies_subscriptions where remco_companies_subscriptions.subscribe_user_id=$user_id";
              // $idResult = $this->webmodel->customSql($getId);
              // if($idResult){
              //   $result = $this->webmodel->commonEDITWHERE('remco_companies_subscriptions',$data, "`subscribe_user_id`=" . $user_id); 
              // }else{
                $result = $this->webmodel->commonADD('remco_companies_subscriptions', $data);
              // }

              $data = array(
                'plan_name' => $plan[0]->plan_name,
                'plan_id' => $plan_id,
                'user_limit' => $user_limit,
                'company_subscription_status' => '1',
              );
                $result = $this->webmodel->commonEDITWHERE('remco_companies',$data, "`web_id`=" . $user_id); 
              if ($result) {
                  $from = 'sathrak.zerosoft@gmail.com';
                  $subject = "Plan Subscription - Remco";
                  $msg = "<html><head></head><body><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%'><tbody><tr><td style='background-color:#f6f5f1'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:70%; margin-top:60px; margin-bottom:60px;border:1px solid #056c93;'><tbody><tr><td colspan='3' style='background-color:#056c93; text-align:center; padding:10px 0%'><img alt='logo' src='https://remco.zerosoft.in/web/assets/images/logo.png' style='height:90px;'/></td></tr><tr><td style='background-color:#ffffff'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:80%;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif; font-size: 13px;'><tbody><tr><td colspan='3'><p>&nbsp;Congratulations... You are now a member of Remco,</p></td></tr><tr><td><p>Thank you for subscribing in Remco</p></td></tr><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%; border-collapse: collapse; border-color: #000;'>
                          <tr><td height='25' align='left'>Plan Name:  " . $plan[0]->plan_name . "</td></tr>
                          <tr><td height='25' align='left'>Plan Amount:  " . $planAmount . "</td></tr>
                          <a href='https://remco.zerosoft.in/companyadmin/login'>Login to admin</a>
                          <tr><td height='25' align='left'></td></tr>
                          <tr height='25'></tr></table></td></tr><tr><td><p>Thanks &amp; Regards ,</p></td></tr>
                          <tr><td>Remco Team</td></tr></tbody></table></td></tr><tr><td colspan='3' style='background-color:#056c93; text-align:center;padding:20px 0%;color:#fff;'>&copy; 2020. Remco. All Rights Reserved.</td></tr></tbody></table></td></tr></tbody></table></body></html>";
                  $sendEmail = array(
                      'Subject' => $subject,
                      'Message' => $msg,
                      'To' => $email,
                      'Cc' => '',
                      'Clientname' =>  "Remco",
                      'From' => $from,
                  );
                  $this->webmodel->sendEmail($sendEmail);

                  $response['status'] = '200';
                  $response['error'] = 'Congratulations, your subscription is successful..';
                  echo json_encode($response);
                  exit;
              } else {
                  $response['status'] = '500';
                  $response['error'] = 'Subscription failed';
                  echo json_encode($response);
                  exit;
              }
          } else {
              $this->makePaymentError();
          }
      } else {
          $this->makePaymentError();
      }
    }
  }

  public function addPreEntryForm(){ 
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
      $postdata  = file_get_contents("php://input");
      $request = json_decode($postdata);
      $data = array(
          'campaign_id' => $request->campaign_id,
          'campaign_company_id' => $request->company_id,
          'campaign_participant_id' => $request->participant_id,
          'pre_entry_form_name' => $request->pre_entry_form_name,
          'pre_entry_form_email' => $request->pre_entry_form_email,
          'pre_entry_form_city' => $request->pre_entry_form_city,
          'pre_entry_form_state' => $request->pre_entry_form_state,
          'pre_entry_form_country' => $request->pre_entry_form_country,
          'pre_entry_form_phone' => $request->pre_entry_form_phone,
          'pre_entry_form_birthday' => strtotime($request->pre_entry_form_birthday),
          'pre_entry_form_entry_code' => $request->pre_entry_form_entry_code,
          'pre_entry_form_address' => $request->pre_entry_form_address,
          'user_random_key' => $request->randomKey
      );
          $campaign_type =$request->campaign_type;
          $email = $request->pre_entry_form_email;
          $name = $request->pre_entry_form_name;
          $city = $request->pre_entry_form_city;
          $state = $request->pre_entry_form_state;
          $country = $request->pre_entry_form_country;
          $phone = $request->pre_entry_form_phone;
          $birthday = $request->pre_entry_form_birthday;
          $code = $request->pre_entry_form_entry_code;
          $address = $request->pre_entry_form_address;
          $to = $request->email_id;
          $userLimit = $request->user_limit;
          $companyId = $request->company_id;
          // $photo_video1 = $request->photo_video1;
          // if($request->photo_video1){
          //   if($photo_video1[0]){
              if($campaign_type=='contest'){
                $photo_video1 = $request->photo_video1;
                  if($photo_video1[0]){
                    $photo_video1 = $request->photo_video1;
                    $type = $request->type;
                    $arrLegnth = count($photo_video1);
                    $array=['data1','data2','data3'];
                    for($pre=0;$pre<$arrLegnth;$pre++){
                        $entrydata = array(
                            'campaign_id' => $request->campaign_id,
                            'name' => $request->pre_entry_form_name,
                            'campaign_company_id' => $request->company_id,
                            'campaign_participant_id' => $request->participant_id,
                            'contest_image_video' => $photo_video1[$pre],
                            'contest_url_type' => $type[$pre],
                            'submission' => $request->submission,
                        );
                      $entrydata1 = $this->webmodel->commonADD('remco_contest_gallary', $entrydata);
                    }
                }
              }
          //   }
          // }
          $subject = "Participants Details- Remco";
          $msg = "<html><head></head><body><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%'><tbody><tr><td style='background-color:#f6f5f1'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:70%; margin-top:60px; margin-bottom:60px;border:1px solid #00aeef;'><tbody><tr><td colspan='3' style='background-color:#00aeef; text-align:center; padding:10px 0%'><img alt='logo' src='https://remco.zerosoft.in/web/assets/images/logo.png' style='height:90px;'/></td></tr><tr><td style='background-color:#ffffff'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:80%;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif; font-size: 13px;'><tbody><tr><td colspan='3'><p>&nbsp;Hi Admin,</p></td></tr><tr><td><p>".$name." is register the contest for your company</p></td></tr><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%; border-collapse: collapse; border-color: #000;'>
          <tr><td height='25' align='left'>Name:  " . $name . "</td></tr>
          <tr><td height='25' align='left'>Email: " . $email . "</td></tr>
          <tr height='25'></tr></table></td></tr><tr><td><p>Thanks &amp; Regards ,</p></td></tr>
          <tr><td> Remco Team</td></tr></tbody></table></td></tr><tr><td colspan='3' style='background-color:#00aeef; text-align:center;padding:20px 0%;color:#fff;'>&copy; 2021 | Remco | All Rights Reserved.</td></tr></tbody></table></td></tr></tbody></table></body></html>";
          $sendEmail = array(
              'Subject' => $subject,
              'Message' => $msg,
              'To' => $to,
              'Cc' => '',
              'Clientname' =>  "Remco",
              'From' => $email,
          );
      $this->webmodel->sendEmail($sendEmail);
      $contestSql="SELECT COUNT(campaign_company_id) counts from remco_contest_participants WHERE campaign_company_id= $companyId";
      $contestResult = $this->webmodel->customSql($contestSql);
      foreach($contestResult as $results_a)
      {
            $contest = $results_a->counts;
      }

      $emailSql="SELECT COUNT(campaign_company_id) from remco_email_participants WHERE campaign_company_id= $companyId";
      $emailResult = $this->webmodel->customSql($emailSql);
      foreach($contestResult as $results_b)
      {
            $email = $results_b->counts;
      }

      $learnSql="SELECT COUNT(campaign_company_id) from remco_learn_participants WHERE campaign_company_id= $companyId";
      $learnResult = $this->webmodel->customSql($learnSql);
      foreach($contestResult as $results_c)
      {
            $learn = $results_c->counts;
      }

      $socialSql="SELECT COUNT(campaign_company_id) from remco_social_participants WHERE campaign_company_id= $companyId";
      $socialResult = $this->webmodel->customSql($socialSql);
      foreach($contestResult as $results_d)
      {
            $social = $results_d->counts;
      }

      $sweepSql="SELECT COUNT(campaign_company_id) from remco_sweepstakes_participants WHERE campaign_company_id= $companyId";
      $sweepResult = $this->webmodel->customSql($sweepSql);
      foreach($contestResult as $results_e)
      {
            $sweep = $results_e->counts;
      }
      if($campaign_type =='contest'){
        if($contest <= $userLimit){
          $result = $this->webmodel->commonADD('remco_contest_participants', $data);
        }else{
          $response['status'] = '504';
          $response['error'] = 'Unable to register ,please try another event';
          echo json_encode($response);
          exit;
        }
      }else if($campaign_type == 'email'){
        if($email <= $userLimit){
          $result = $this->webmodel->commonADD('remco_email_participants', $data);
        }else{
          $response['status'] = '504';
          $response['error'] = 'Unable to register ,please try another event';
          echo json_encode($response);
          exit;
        }
      }else if($campaign_type =='learn'){
        if($learn <= $userLimit){
          $result = $this->webmodel->commonADD('remco_learn_participants', $data);
        }else{
          $response['status'] = '504';
          $response['error'] = 'Unable to register ,please try another event';
          echo json_encode($response);
          exit;
        }
      }else if($campaign_type =='social' && 1 && 2){
        if($social <= $userLimit){
          $result = $this->webmodel->commonADD('remco_social_participants', $data);
        }else{
          $response['status'] = '504';
          $response['error'] = 'Unable to register ,please try another event';
          echo json_encode($response);
          exit;
        }
      }else{
        if($sweep <= $userLimit){
          $result = $this->webmodel->commonADD('remco_sweepstakes_participants', $data);
        }else{
          $response['status'] = '504';
          $response['error'] = 'Unable to register ,please try another event';
          echo json_encode($response);
          exit;
        }
      }
      if ($result) {
        $response['status'] = '200';
        $response['error'] = 'Participants details added successfully';
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

  public function cancelSubscription(){
    $response=[
        'status'=>'fail',
        'msg'=>'Nothing'
    ];
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userId=$request->user_id;
        $sql="SELECT * FROM `remco_companies_subscriptions` WHERE `subscribe_user_id`='".$userId."'";

        $result = $this->webmodel->customSql($sql);
        if($result){

                $cancelPayPalSubscr=new \PayPalSubscription\PayPalSubscription('ASI16xTJ_KtM1oEzlqy0AtBOxboqVfb9kpNROIAoQVtqPfwjmUiW_z3o0DpSyvKhQb150Xd5csMA2RtF','EFhwi8GpMk0HoPxPn0HvjJ6uFymkdskYiAR23RdXI9JOo6HVR8M2T8gaocxp7FdV0Gb_gAOcRQ4tK7Wp','sandbox');
                $cancelPaypal=$cancelPayPalSubscr->CancelSubscription($result[0]->subscr_id,'User cancelled their subscription');
                $data = array(
                    'subscribe_user_id' => $userId,
                    'subscribe_dtime' => time(),
                    'subscribe_payment_type' => "paypal",
                    'subscribe_payment_status' => "",
                    'subscribe_status' => "cancelled",
                    'subscr_id' => $result[0]->subscr_id,
                    "subscribe_response" => json_encode($cancelPaypal)
                );

                $result = $this->webmodel->commonADD('remco_companies_subscriptions', $data);

                if($result){
                    $response=[
                        'status'=>'success',
                        'msg'=>'Cancelled successfully!'
                    ];
                }
            

        }
        else{
            $response=[
                'status'=>'fail',
                'msg'=>'Error occurred!'
            ];
        }
    }
    else{
        $response=[
            'status'=>'fail',
            'msg'=>'Parameter is empty!'
        ];
    }
    echo json_encode($response);
    exit;
}

}