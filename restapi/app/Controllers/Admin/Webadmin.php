<?php namespace App\Controllers;

use App\Models\Webmodel;
use CodeIgniter\Controller;
use Symfony\Component\Config\Definition\Exception\Exception;

//define('webmodel', 'adf');

class Webadmin extends Controller
{

    protected $token_expire_time = 86400;

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


    private function checkEntryLevel(){
        $uri = current_url(true);
        $listOfChkJWT=[];

        //$listOfChkJWT = [];

        $currReqAction=$uri->getSegment(2);

        if(array_key_exists('HTTP_AUTHORIZATION', $_SERVER)){
            $header = $_SERVER["HTTP_AUTHORIZATION"];
        }else{
            $header = '';
        }

        if(in_array(strtolower($currReqAction),$listOfChkJWT) && in_array(strtolower($_SERVER["REQUEST_METHOD"]),["post","get"])){
            // if exist, should check
            try {
                require __DIR__ . './../Libraries/Authorization_Token.php';

            } catch (Exception $e) {
                print_r($e);
                exit;
            }

            $auth = new \Authorization_Token();

            if(isset($header) && $header!=""){
                $validatedResult = $auth->validateToken(true);
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
                    "iss" => "https://azolvur.co.uk",
                    "aud" => "https://azolvur.co.uk",
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
            $newpassword = md5($request->newpassword);

            $where = "`user_password`=" .$this->webmodel->removeEscape( md5($oldpassword)) . " AND `web_id`=1";
            $result = $this->webmodel->commonLISTWHERE('parking_admin', $where);
            $id = $result[0]->web_id;

            if ($result) {
                $data = array(
                    'user_password' => $newpassword,
                    'user_original' => $request->newpassword
                );
                $result = $this->webmodel->commonEDIT('parking_admin', $data, $id);
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
        echo 'all companies';

      }

      
    }
    public function deleteParticipant(){
        if($_SERVER['REQUEST_METHOD'] == 'GET'){
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $request->web_id;
            $where = 'web_id='. $userid; 
            echo $where;

            $result = $this->webmodel->commonDELETE('remco_participant', $where);

            // $result = $this->webmodel->commonLISTWHERE('remco_parcipants', $where);
            if($result){
                $response = "200";
                $response['error'] = 'Video deleted successfully';
                echo json_encode($response);
                exit;
            }
            else{
                $response = "500";
                $response['error'] = 'Video cannot be deleted';
                echo json_encode($response);
                exit;
            }
          }
    }


}
