<?php namespace App\Controllers;

use App\Models\Webmodel;

use CodeIgniter\Controller;

use CodeIgniter\HTTP\Request;

use Symfony\Component\Config\Definition\Exception\Exception;

class Webservicestest extends Controller

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
        $listOfChkJWT=["getAllCompanies","getAllCompanyContests","getCount","getAllCompanyContests","getAllCompanyEmailForms","getAllCompanyLearnAndEarn","getAllCompanySocialComments","getAllCompanySweepStakes","getAllCompanyEntryFields","getEmail","getAllCompanies","getAllCompaniesContest","getAllCompaniesId","addPreEntryForm"];
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

              $data = array(

                'company_name' => $request->company_name,

                'company_description' => $request->company_description,

                'company_email' => $request->company_email,

                'company_password' => hash('sha256', $request->company_password),

                'company_code' => $this->webmodel->generateRandomPassword(7, false, 'ud'),

                'company_website' => $request->company_website,

                'company_country_code' => $request->company_country_code,

                'company_phone' => $request->company_phone,

                'company_register_type' => 'website',

                'company_subscription_status' => '0',

                'company_status' => '0',

                'company_created' => time(),

            );

            $email = $request->company_email;

            $name = $request->company_name;

            $resultExist = $this->webmodel->commonLISTWHERE('remco_companies', "`company_email`=" . $this->webmodel->removeEscape($email) , false);

            if ($resultExist) {

                $response['status'] = '300';

                $response['error'] = 'Email id already exist.';

                echo  json_encode($response);

                exit;

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



            <tr><td height='25' align='center'><b><a href=\"http://zerosoft.in/dev/remco/restapi/public/index.php/Webservicestest/companyConfirmation?v_token=" . $randTokenHash . "\">Sign up Confirmation</a></b></td></tr>

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



    public function companyConfirmation() {

      if ($_SERVER['REQUEST_METHOD'] == 'GET') {

        $v_token = $_GET["v_token"];

        $resultExist = $this->webmodel->commonLISTWHERE('remco_companies', "`company_confirmation`=" . $this->webmodel->removeEscape($v_token) , false);

        if ($resultExist) {

          // var_dump($resultExist[0]->web_id);

          $subss = array(

            'company_status' => '1', 'company_confirmation' => ''

          );

          $this->webmodel->commonEDIT('remco_companies', $subss, $resultExist[0]->web_id);

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

              $data = array(

                'participant_fname' => $request->participant_fname,

                'participant_lname' => $request->participant_lname,

                'participant_email' => $request->participant_email,

                'participant_password' => hash('sha256', $request->participant_password),

                'participant_country_code' => $request->participant_country_code,

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



            <tr><td height='25' align='center'><b><a href=\"http://zerosoft.in/dev/remco/restapi/public/index.php/Webservicestest/participantConfirmation?v_token=" . $randTokenHash . "\">Sign up Confirmation</a></b></td></tr>

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



            <tr><td height='25' align='center'><b><a href=\"https://zerosoft.in/dev/remco/restapi/public/index.php/Webservicestest/participantConfirmation?v_token=" . $randTokenHash . "\">Sign up Confirmation</a></b></td></tr>

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

            $from = 'testing@zerosofttech.com';



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



  public function editCompanyInfo() {

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

      $postdata = file_get_contents("php://input");

      $request = json_decode($postdata);

      $data = array(

        'company_name' => $request->company_name,

        'company_description' => $request->company_description,

        'company_email' => $request->company_email,

        'company_website' => $request->company_website,

        'company_country_code' => $request->company_country_code,

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

      $data = array(

        'participant_fname' => $request->participant_fname,

        'participant_lname' => $request->participant_lname,

        'participant_email' => $request->participant_email,

        'participant_country_code' => $request->participant_country_code,

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

  public function getAllCompanyContests() {

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {

      $sql="SELECT * from remco_companies INNER JOIN remco_company_contest on remco_companies.web_id = remco_company_contest.company_contest_id";

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

      $sql="SELECT * from remco_companies INNER JOIN remco_company_email on remco_companies.web_id = remco_company_email.company_email_id";

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

  public function getAllCompanyLearnAndEarn() {

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {

      $sql="SELECT * from remco_companies INNER JOIN remco_company_learn on remco_companies.web_id = remco_company_learn.company_learn_id";

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

  public function getAllCompanySocialComments() {

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {

      $sql="SELECT * from remco_companies INNER JOIN remco_company_social_comments on remco_companies.web_id = remco_company_social_comments.company_social_comments_id";

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

  public function getAllCompanySweepStakes() {

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {

      $sql="SELECT * from remco_companies INNER JOIN remco_company_sweepstakes on remco_companies.web_id = remco_company_sweepstakes.company_sweepstakes_id";

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

      $sql="select count(*) Count_1 from remco_company_contest union all select count(*) Count_2 from remco_company_email union all select count(*) Count_3 from remco_company_learn union all select count(*) Count_4 from remco_company_sweepstakes union all select count(*) Count_5 from remco_company_social_comments";

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

      if($type = 'contest'){

      $sql="SELECT * FROM remco_pre_entry_form WHERE company_id= $web_id AND campaign_type= 'contest' ";

      }else if($type='email'){

        $sql="SELECT * FROM remco_pre_entry_form WHERE company_id= $web_id AND campaign_type= 'email' ";

      }else if($type='learn'){

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
      
      $sql="SELECT company_email FROM remco_companies WHERE remco_companies.web_id= $web_id ";

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

          $response['error'] = 'data not found';

          echo json_encode($response);

          exit;

      }

    }

  }

  public function addPreEntryForm(){ 

    if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $postdata  = file_get_contents("php://input");

        $request = json_decode($postdata);

        // print_r($request);

        // $birth_date = strtotime($request->pre_entry_form_birthday);

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

            $subject = "Participants Details- Remco";

            $msg = "<html><head></head><body><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%'><tbody><tr><td style='background-color:#f6f5f1'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:70%; margin-top:60px; margin-bottom:60px;border:1px solid #1d3571;'><tbody><tr><td colspan='3' style='background-color:#1d3571; text-align:center; padding:10px 0%'><img alt='logo' src='https://remco.zerosoft.in/web/assets/images/logo.png' style='height:90px;'/></td></tr><tr><td style='background-color:#ffffff'><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:80%;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif; font-size: 13px;'><tbody><tr><td colspan='3'><p>&nbsp;Hi Admin,</p></td></tr><tr><td><p>".$name."is register the contest for your company</p></td></tr><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' style='width:100%; border-collapse: collapse; border-color: #000;'>
                   

            <tr><td height='25' align='left'>Name:  " . $name . "</td></tr>



            <tr><td height='25' align='left'>Email: " . $email . "</td></tr>



            <tr><td height='25' align='left'>City: " . $city . "</td></tr>



            <tr><td height='25' align='left'>State:  " . $state . "</td></tr>



            <tr><td height='25' align='left'>Country: " . $country . "</td></tr>



            <tr><td height='25' align='left'>Phone: " . $phone . "</td></tr>


            <tr><td height='25' align='left'>Birthday:  " . $birthday . "</td></tr>


            <tr><td height='25' align='left'>Entry Code: " . $code . "</td></tr>


            <tr><td height='25' align='left'>Address: " . $address . "</td></tr>


            <tr height='25'></tr></table></td></tr><tr><td><p>Thanks &amp; Regards ,</p></td></tr>


            <tr><td> Remco Team</td></tr></tbody></table></td></tr><tr><td colspan='3' style='background-color:#1d3571; text-align:center;padding:20px 0%;color:#fff;'>&copy; 2021 | Remco | All Rights Reserved.</td></tr></tbody></table></td></tr></tbody></table></body></html>";

            $sendEmail = array(

                'Subject' => $subject,

                'Message' => $msg,

                'To' => $to,

                'Cc' => '',

                'Clientname' =>  "Remco",

                'From' => $email,

            );

        $this->webmodel->sendEmail($sendEmail);

        if($campaign_type =='contest'){

        $result = $this->webmodel->commonADD('remco_contest_participants', $data);

        }else if($campaign_type == 'email'){

          $result = $this->webmodel->commonADD('remco_email_participants', $data);

        }else if($campaign_type =='learn'){

          $result = $this->webmodel->commonADD('remco_learn_participants', $data);

        }else if($campaign_type =='social'){

          $result = $this->webmodel->commonADD('remco_social_participants', $data);

        }else{

          $result = $this->webmodel->commonADD('remco_sweepstakes_participants', $data);

        }

        if ($result) {

            //$mail = sendemail($sendEmail);

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

  // public function getAllCompanyEntryFields() {

  //   if ($_SERVER['REQUEST_METHOD'] == 'GET') {

  //     // $campaign_type = $_GET["campaign_type"];

  //     $sql = "SELECT * from remco_pre_entry_form INNER JOIN remco_company_contest on remco_pre_entry_form.campaign_type = remco_company_contest.campaign_type"

  //     $result =$this->webmodel->customSql($sql);

  //     // print_r($result);

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

}