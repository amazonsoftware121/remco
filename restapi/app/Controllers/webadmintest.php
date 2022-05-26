<?php namespace App\Controllers;
use App\Models\Webmodel;
use CodeIgniter\Controller;
use Symfony\Component\Config\Definition\Exception\Exception;
//define('webmodel', 'adf');

class webadmintest extends Controller
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
	   private function checkEntryLevel() {
        $uri = current_url(true);
        //echo $uri.'hii its a url';
        $listOfChkJWT=[
            'companychangepassword',
			'companyLogin'
        ];
        //print_r($listOfChkJWT);
       
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
	
	public function companyLogin()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $companyName = $request->company_name;
            $password = $request->company_password;
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
            $where = "(`company_name`=" . $this->webmodel->removeEscape($companyName). " AND `company_password`='" . hash('sha256', $password)."')";
            //echo ($where);
            //echo('for testing');
            $result = $this->webmodel->commonLISTWHERE('remco_companies', $where, false);
            //echo($result);
            //echo('for testing');
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
                        "companyname" => $result[0]->company_name
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
                $response['error'] = "Wrong companyname/password/role, you have $retryAvailable attempts left.";
                echo json_encode($response);
                exit;
            }
        }
    }
    public function companychangepassword(){
        //$hii=$_SERVER['REQUEST_METHOD'] == 'POST';
        //echo($hii);
        //echo('Hiii');
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $oldpassword = $request->oldpassword;
            //echo $oldpassword;
            $newpassword = hash('sha256',$request->newpassword);
            //echo $newpassword;
			
			$where = "`company_password`=" .$this->webmodel->removeEscape( hash('sha256', $oldpassword)) ;  //. hash('sha256'
            //echo $where;
            $result = $this->webmodel->commonLISTWHERE('remco_companies', $where, false);
            
            $id = $result[0]->web_id;
            //echo $id;
            //echo('Hiiii');
            //exit();
            if ($result) {
                $data = array(
                    'company_password' => $newpassword
                );
                $result = $this->webmodel->commonEDIT('remco_companies', $data, $id);
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


    
    public function getAllCompanyContest(){
        if($_SERVER['REQUEST_METHOD'] == 'GET'){
          $result = $this->webmodel->commonLIST('remco_company_contest');
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
    
    public function addcompanycontest(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);
        $start = strtotime($request->company_start_date);
        $end = strtotime($request->company_end_date);
        //print_r($start);
        //print_r($end);
             
            $data = array(
				'company_contest_id' => $request->company_contest_id,
				'company_campaign_title' => $request->company_campaign_title,
                'company_campaign_description' => $request->company_campaign_description,
                'company_start_date'  => $start,
                'company_end_date'  => $end,
                'company_start_time'  => $request->company_start_time,
                'company_end_time'  => $request->company_end_time,
                'company_time_zone' => $request->company_time_zone,
                'company_date_format' => $request->company_date_format,
                'company_winners_number' => $request->company_winners_number,
                'company_page_url' => $request->company_page_url,
                'company_entry_frequency' => $request->company_entry_frequency,
                'company_gallery_logo' => $request->company_gallery_logo,
                'company_gallery_entry_form' => $request->company_gallery_entry_form,
                'company_gallery_label' => $request->company_gallery_label,
                'company_content_approval' => $request->company_content_approval,
                'company_gallery_sorting' => $request->company_gallery_sorting,
                'company_no_of_images_displayed' => $request->company_no_of_images_displayed,
                'company_caption_preview' => $request->company_caption_preview,
                'company_allow_sharing' => $request->company_allow_sharing,
                'company_custom_caption' => $request->company_custom_caption,
                'company_user_voting' => $request->company_user_voting,
                'company_has_images' => $request->company_has_images,
                'company_widget_title' => $request->company_widget_title,
                'company_widget_description' => $request->company_widget_description,
                'company_lightbox_title' => $request->company_lightbox_title,
                'company_lightbox_description' => $request->company_lightbox_description,
                'company_product_images_slide1' => $request->company_product_images_slide1,
				'company_product_images_slide2' => $request->company_product_images_slide2,
				'company_product_images_slide3' => $request->company_product_images_slide3,
                'company_background_image' => $request->company_background_image,
                'company_official_rules' => $request->company_official_rules,
				'campaign_type' => 'contest',
            );
           //print_r($start);
        //   print_r($data);
            //print_r(end_date);
           
            $result = $this->webmodel->commonADD('remco_company_contest', $data);
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

  
  public function editcompanycontest(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);
        $start = strtotime($request->company_start_date);
        $end = strtotime($request->company_end_date);
        //print_r($start);
        //print_r($end);
             
            $data = array(
				'company_contest_id' => $request->company_contest_id,
                'company_campaign_title' => $request->company_campaign_title,
                'company_campaign_description' => $request->company_campaign_description,
                'company_start_time'  => $request->company_start_time ,
                'company_end_time'  => $request->company_end_time,
                'company_start_date'  =>$start,
                'company_end_date'  => $end,
                'company_time_zone' => $request->company_time_zone,
                'company_date_format' => $request->company_date_format,
                'company_winners_number' => $request->company_winners_number,
                'company_page_url' => $request->company_page_url,
                'company_entry_frequency' => $request->company_entry_frequency,
                'company_gallery_logo' => $request->company_gallery_logo,
                'company_gallery_entry_form' => $request->company_gallery_entry_form,
                'company_gallery_label' => $request->company_gallery_label,
                'company_content_approval' => $request->company_content_approval,
                'company_gallery_sorting' => $request->company_gallery_sorting,
                'company_no_of_images_displayed' => $request->company_no_of_images_displayed,
                'company_caption_preview' => $request->company_caption_preview,
                'company_allow_sharing' => $request->company_allow_sharing,
                'company_custom_caption' => $request->company_custom_caption,
                'company_user_voting' => $request->company_user_voting,
                'company_has_images' => $request->company_has_images,
                'company_contest_form_visibility' => $request->company_contest_form_visibility,
                'company_widget_title' => $request->company_widget_title,
                'company_widget_description' => $request->company_widget_description,
                'company_lightbox_title' => $request->company_lightbox_title,
                'company_lightbox_description' => $request->company_lightbox_description,
                'company_product_images_slide1' => $request->company_product_images_slide1,
				'company_product_images_slide2' => $request->company_product_images_slide2,
				'company_product_images_slide3' => $request->company_product_images_slide3,
                'company_background_image' => $request->company_background_image,
                'company_official_rules' => $request->company_official_rules,
				'campaign_type' => 'contest',
            );
            //print_r ($data);
    
            $result = $this->webmodel->commonEDITWHERE('remco_company_contest', $data, "`web_id`=" . $userid);
           //print_r($result);
            
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
  public function deletecompanycontest(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $userid = $this->webmodel->removeEscape($request->web_id);
        
        $result = $this->webmodel->commonDELETE('remco_company_contest',"`web_id` = ".$userid);
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

    public function getAllCompanyEmailForms() {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
          $result = $this->webmodel->commonLIST('remco_company_email');
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
	
    public function addCompanyEmailForms() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
          $postdata = file_get_contents("php://input");
          $request = json_decode($postdata);
          $start = strtotime($request->company_start_date);
          $end = strtotime($request->company_end_date);
            
          $data = array(
			'company_email_id' => $request->company_email_id,
            'company_campaign_title' => $request->company_campaign_title,
            'company_campaign_description' => $request->company_campaign_description,
            'company_start_date' => $start,
            'company_end_date' => $end,
            'company_start_time' => $request->company_start_time,
            'company_end_time' => $request->company_end_time,
            'company_time_zone' => $request->company_time_zone,
            'company_date_format' => $request->company_date_format,
            'company_landing_url' => $request->company_landing_url,
            'company_gallery_logo' => $request->company_gallery_logo,
            'company_product_images_slide1' => $request->company_product_images_slide1,
            'company_product_images_slide2' => $request->company_product_images_slide2,
            'company_product_images_slide3' => $request->company_product_images_slide3,
            'company_email_form_visibility' => $request->company_email_form_visibility,
            'company_widget_title' => $request->company_widget_title,
            'company_widget_description' => $request->company_widget_description,
            'company_lightbox_title' => $request->company_lightbox_title,
            'company_lightbox_description' => $request->company_lightbox_description,
            'company_background_image' => $request->company_background_image,
            'company_official_rules' => $request->company_official_rules,
			'campaign_type' => 'email',
          );
             
          //print_r($data);
          $result = $this->webmodel->commonADD('remco_company_email', $data);
          //print_r($result);
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
      public function editCompanyEmailForms() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
          $postdata = file_get_contents("php://input");
          $request = json_decode($postdata);
          $userid = $this->webmodel->removeEscape($request->web_id);
          $start = strtotime($request->company_start_date);
          $end = strtotime($request->company_end_date);
               
          $data = array(
			'company_email_id' => $request->company_email_id,
            'company_campaign_title' => $request->company_campaign_title,
            'company_campaign_description' => $request->company_campaign_description,
            'company_start_date' => $start,
            'company_end_date' => $end,
            'company_start_time' => $request->company_start_time,
            'company_end_time' => $request->company_end_time,
            'company_time_zone' => $request->company_time_zone,
            'company_date_format' => $request->company_date_format,
            'company_landing_url' => $request->company_landing_url,
            'company_gallery_logo' => $request->company_gallery_logo,
            'company_product_images_slide1' => $request->company_product_images_slide1,
            'company_product_images_slide2' => $request->company_product_images_slide2,
            'company_product_images_slide3' => $request->company_product_images_slide3,
            'company_email_form_visibility' => $request->company_email_form_visibility,
            'company_widget_title' => $request->company_widget_title,
            'company_widget_description' => $request->company_widget_description,
            'company_lightbox_title' => $request->company_lightbox_title,
            'company_lightbox_description' => $request->company_lightbox_description,
            'company_background_image' => $request->company_background_image,
            'company_official_rules' => $request->company_official_rules,
			'campaign_type' => 'email',
          );
          //print_r($data);
          $result = $this->webmodel->commonEDITWHERE('remco_company_email', $data, "`web_id`=" . $userid);
                
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
       
      public function deleteCompanyEmailForms() {
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
          $postdata = file_get_contents("php://input");
          $request = json_decode($postdata);
          $userid = $this->webmodel->removeEscape($request->web_id);
          
          $result = $this->webmodel->commonDELETE('remco_company_email',"`web_id` = ".$userid);
            
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

      public function getAllCompanyLearn(){
        if($_SERVER['REQUEST_METHOD'] == 'GET'){
          $result = $this->webmodel->commonLIST('remco_company_learn');
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
      public function addcompanylearn(){
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
            //print_r($splittedstring,'efeufgieufgiue');
            $start = strtotime($request->company_start_date);
            $end = strtotime($request->company_end_date);
            //print_r($start);
            //print_r($end);
                 
                $data = array(
					'company_learn_id' => $request->company_learn_id,
                    'company_campaign_title' => $request->company_campaign_title,
                    'company_campaign_description' => $request->company_campaign_description,
                    'company_start_date'  => $start,
                    'company_end_date'  => $end,
                    'company_start_time' => $request->company_start_time,
                    'company_end_time' => $request->company_end_time,
                    'company_time_zone' => $request->company_time_zone,
                    'company_date_format' => $request->company_date_format,
                    'company_add_questions' => $request->company_add_questions,
                    'company_landing_url' => $request->company_landing_url,
                    'company_gallery_logo' => $request->company_gallery_logo,
                    'company_product_images_slide1' => $request->company_product_images_slide1,
                    'company_product_images_slide2' => $request->company_product_images_slide2,
                    'company_product_images_slide3' => $request->company_product_images_slide3,
                    'company_learn_form_visibility' => $request->company_learn_form_visibility,
                    'company_widget_title' => $request->company_widget_title,
                    'company_widget_description' => $request->company_widget_description,
                    'company_lightbox_title' => $request->company_lightbox_title,
                    'company_lightbox_description' => $request->company_lightbox_description,
                    'company_background_image' => $request->company_background_image,
                    'company_official_rules' => $request->company_official_rules,
					'campaign_type' => 'learn'
                );
               
                $result = $this->webmodel->commonADD('remco_company_learn', $data);
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
        public function deleteCompanyLearn(){
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
            
            $result = $this->webmodel->commonDELETE('remco_company_learn',"`web_id` = ".$userid);
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
      public function editcompanylearn(){
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
            $start = strtotime($request->company_start_date);
            $end = strtotime($request->company_end_date);
            //print_r($start);
            //print_r($end);
                 
                $data = array(
				'company_learn_id' => $request->company_learn_id,
                    'company_campaign_title' => $request->company_campaign_title,
                    'company_campaign_description' => $request->company_campaign_description,
                    'company_start_date'  => $start,
                    'company_end_date'  => $end,
                    'company_start_time' => $request->company_start_time,
                    'company_end_time' => $request->company_end_time,
                    'company_time_zone' => $request->company_time_zone,
                    'company_date_format' => $request->company_date_format,
                    'company_add_questions' => $request->company_add_questions,
                    'company_landing_url' => $request->company_landing_url,
                    'company_gallery_logo' => $request->company_gallery_logo,
                    'company_product_images_slide1' => $request->company_product_images_slide1,
                    'company_product_images_slide2' => $request->company_product_images_slide2,
                    'company_product_images_slide3' => $request->company_product_images_slide3,
                    'company_learn_form_visibility' => $request->company_learn_form_visibility,
                    'company_widget_title' => $request->company_widget_title,
                    'company_widget_description' => $request->company_widget_description,
                    'company_lightbox_title' => $request->company_lightbox_title,
                    'company_lightbox_description' => $request->company_lightbox_description,
                    'company_background_image' => $request->company_background_image,
                    'company_official_rules' => $request->company_official_rules,
					'campaign_type' => 'learn'
                );
                //print_r($data);
                $result = $this->webmodel->commonEDITWHERE('remco_company_learn', $data, "`web_id`=" . $userid);
               
                
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

      public function getAllCompanySweep(){
        if($_SERVER['REQUEST_METHOD'] == 'GET'){
          $result = $this->webmodel->commonLIST('remco_company_sweepstakes');
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
      public function addcompanysweep(){
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
            $start = strtotime($request->company_start_date);
            $end = strtotime($request->company_end_date);
            //print_r($start);
            //print_r($end);
                 
                $data = array(
					'company_sweepstakes_id' => $request->company_sweepstakes_id,
                    'company_campaign_title' => $request->company_campaign_title,
                    'company_campaign_description' => $request->company_campaign_description,
                    'company_start_date'  => $start,
                    'company_end_date'  => $end,
                    'company_start_time'  => $request->company_start_time,
                    'company_end_time'  => $request->company_end_time,
                    'company_time_zone' => $request->company_time_zone,
                    'company_date_format' => $request->company_date_format,
                    'company_winners' => $request->company_winners,
                    'company_page_url' => $request->company_page_url,
                    'company_entry_frequency' => $request->company_entry_frequency,
                    'company_gallery_logo' => $request->company_gallery_logo,
                    'company_product_images_slide1' => $request->company_product_images_slide1,
                    'company_product_images_slide2' => $request->company_product_images_slide2,
                    'company_product_images_slide3' => $request->company_product_images_slide3,
                    'company_sweep_form_visibility' => $request->company_sweep_form_visibility,
                    'company_widget_title' => $request->company_widget_title,
                    'company_widget_description' => $request->company_widget_description,
                    'company_lightbox_title' => $request->company_lightbox_title,
                    'company_lightbox_description' => $request->company_lightbox_description,
                    'company_background_image' => $request->company_background_image,
                    'company_official_rules' => $request->company_official_rules,
					'campaign_type' => 'sweep',
                );
               //print_r($start);
                //print_r(end_date);
               
                $result = $this->webmodel->commonADD('remco_company_sweepstakes', $data);
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
      
        public function editcompanysweep(){
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
            $start = strtotime($request->company_start_date);
            $end = strtotime($request->company_end_date);
            //print_r($start);
            //print_r($end);
                 
                $data = array(
					'company_sweepstakes_id' => $request->company_sweepstakes_id,
                    'company_campaign_title' => $request->company_campaign_title,
                    'company_campaign_description' => $request->company_campaign_description,
                    'company_start_date'  => $start,
                    'company_end_date'  => $end,
                    'company_start_time'  => $request->company_start_time,
                    'company_end_time'  => $request->company_end_time,
                    'company_time_zone' => $request->company_time_zone,
                    'company_date_format' => $request->company_date_format,
                    'company_winners' => $request->company_winners,
                    'company_page_url' => $request->company_page_url,
                    'company_entry_frequency' => $request->company_entry_frequency,
                    'company_gallery_logo' => $request->company_gallery_logo,
                    'company_product_images_slide1' => $request->company_product_images_slide1,
                    'company_product_images_slide2' => $request->company_product_images_slide2,
                    'company_product_images_slide3' => $request->company_product_images_slide3,
                    'company_sweep_form_visibility' => $request->company_sweep_form_visibility,
                    'company_widget_title' => $request->company_widget_title,
                    'company_widget_description' => $request->company_widget_description,
                    'company_lightbox_title' => $request->company_lightbox_title,
                    'company_lightbox_description' => $request->company_lightbox_description,
                    'company_background_image' => $request->company_background_image,
                    'company_official_rules' => $request->company_official_rules,
					'campaign_type' => 'sweep',
                );
                //print_r ($data);
        
                $result = $this->webmodel->commonEDITWHERE('remco_company_sweepstakes', $data, "`web_id`=" . $userid);
                //print_r($result);

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
      public function deletecompanysweep(){
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $userid = $this->webmodel->removeEscape($request->web_id);
            
            $result = $this->webmodel->commonDELETE('remco_company_sweepstakes',"`web_id` = ".$userid);
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

        public function getAllCompanySocial(){
            if($_SERVER['REQUEST_METHOD'] == 'GET'){
              $result = $this->webmodel->commonLIST('remco_company_social_comments');
              if($result){
                $response['status'] = '200';
                $response['data'] = $result;
                //print_r($result);
                echo json_encode($response);
                exit;
              }else{
                $this->webmodel->commonThrow();
              }
            }
          }

        public function addcompanysocial(){
            if($_SERVER['REQUEST_METHOD'] == 'POST'){
                $postdata = file_get_contents("php://input");
                $request = json_decode($postdata);
                $userid = $this->webmodel->removeEscape($request->web_id);
                $start = strtotime($request->company_start_date);
                $end = strtotime($request->company_end_date);
                //print_r($start);
                //print_r($end);
                     
                    $data = array(
						'company_social_comments_id'  => $request->company_social_comments_id,
                        //'company_connectfrom' => $request->company_connectfrom,
                        'company_start_date'  => $start,
                        'company_end_date'  => $end,
                        'company_start_time'  => $request->company_start_time,
                        'company_end_time'  => $request->company_end_time,
                        'company_time_zone' => $request->company_time_zone,
                        'company_winners' => $request->company_winners,
                        'company_new_entry' => $request->company_new_entry,
						'company_product_images_slide1' => $request->company_product_images_slide1,
						'company_product_images_slide2' => $request->company_product_images_slide2,
						'company_product_images_slide3' => $request->company_product_images_slide3,
						'company_social_form_visibility' => $request->company_social_form_visibility,
						'company_widget_title' => $request->company_widget_title,
						'company_widget_description' => $request->company_widget_description,
						'company_lightbox_title' => $request->company_lightbox_title,
						'company_lightbox_description' => $request->company_lightbox_description,
						'company_background_image' => $request->company_background_image,
						'campaign_type' => 'social',
                    );
                   //print_r($start);
                    //print_r(contest_end_date);
                    //print_r($data);
                   
                    $result = $this->webmodel->commonADD('remco_company_social_comments', $data);
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
		  
          public function editcompanysocial(){
            if($_SERVER['REQUEST_METHOD'] == 'POST'){
                $postdata = file_get_contents("php://input");
                $request = json_decode($postdata);
                $userid = $this->webmodel->removeEscape($request->web_id);
                $start = strtotime($request->company_start_date);
                $end = strtotime($request->company_end_date);
                //print_r($start);
                //print_r($end);
                     
                    $data = array(
						'company_social_comments_id'  => $request->company_social_comments_id,
                        //'company_connectfrom' => $request->company_connectfrom,
                        'company_start_date'  => $start,
                        'company_end_date'  => $end,
                        'company_start_time'  => $request->company_start_time,
                        'company_end_time'  => $request->company_end_time,
                        'company_time_zone' => $request->company_time_zone,
                        'company_winners' => $request->company_winners,
                        'company_new_entry' => $request->company_new_entry,
						'company_product_images_slide1' => $request->company_product_images_slide1,
						'company_product_images_slide2' => $request->company_product_images_slide2,
						'company_product_images_slide3' => $request->company_product_images_slide3,
						'company_social_form_visibility' => $request->company_social_form_visibility,
						'company_widget_title' => $request->company_widget_title,
						'company_widget_description' => $request->company_widget_description,
						'company_lightbox_title' => $request->company_lightbox_title,
						'company_lightbox_description' => $request->company_lightbox_description,
						'company_background_image' => $request->company_background_image,
						'campaign_type' => 'social',
                    );
                    //print_r ($data);
            
                    $result = $this->webmodel->commonEDITWHERE('remco_company_social_comments', $data, "`web_id`=" . $userid);
                   
                    
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
		  
          public function deletecompanysocial(){
            if($_SERVER['REQUEST_METHOD'] == 'POST'){
                $postdata = file_get_contents("php://input");
                $request = json_decode($postdata);
                $userid = $this->webmodel->removeEscape($request->web_id);
                
                $result = $this->webmodel->commonDELETE('remco_company_social_comments',"`web_id` = ".$userid);
                 
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
			
			public function getAllContestParticipants(){
				if($_SERVER['REQUEST_METHOD'] == 'GET'){
					
					 //$result = $this->webmodel->commonLIST('remco_company_sweepstakes');
				$sql = "SELECT * FROM remco_contest_participants
					    LEFT JOIN remco_company_contest
					    ON remco_contest_participants.contest_id = remco_company_contest.web_id
					    LEFT JOIN remco_participants
						ON remco_contest_participants.contest_participant_id = remco_participants.web_id";
						
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
				if($_SERVER['REQUEST_METHOD'] == 'GET'){
					
					 //$result = $this->webmodel->commonLIST('remco_company_sweepstakes');
				$sql = "SELECT * FROM remco_email_participants
					    LEFT JOIN remco_company_email
					    ON remco_email_participants.email_id = remco_company_email.web_id
					    LEFT JOIN remco_participants
						ON remco_email_participants.email_participant_id = remco_participants.web_id";
						
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
				if($_SERVER['REQUEST_METHOD'] == 'GET'){
					
				$sql = "SELECT * FROM remco_learn_participants
					    LEFT JOIN remco_company_learn
					    ON remco_learn_participants.learn_id = remco_company_learn.web_id
					    LEFT JOIN remco_participants
						ON remco_learn_participants.learn_participant_id = remco_participants.web_id";
						
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
			
			public function getAllSweepstakesParticipants(){
				if($_SERVER['REQUEST_METHOD'] == 'GET'){
					
					 //$result = $this->webmodel->commonLIST('remco_company_sweepstakes');
				$sql = "SELECT * FROM remco_sweepstakes_participants
					    LEFT JOIN remco_company_sweepstakes
					    ON remco_sweepstakes_participants.sweepstakes_id = remco_company_sweepstakes.web_id
					    LEFT JOIN remco_participants
						ON remco_sweepstakes_participants.sweepstakes_participant_id = remco_participants.web_id";
						
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
			
			public function getAllSocialcommentsParticipants(){
				if($_SERVER['REQUEST_METHOD'] == 'GET'){
					
				$sql = "SELECT * FROM remco_social_participants
					    LEFT JOIN remco_company_social_comments
					    ON remco_social_participants.social_id = remco_company_social_comments.web_id
					    LEFT JOIN remco_participants
						ON remco_social_participants.social_participant_id = remco_participants.web_id";
						
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
			
			public function getAllpreentryform(){
		    	if($_SERVER['REQUEST_METHOD'] == 'GET'){
		    	$result = $this->webmodel->commonLIST('remco_pre_entry_form');
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
			
			public function addpreentry(){
			if($_SERVER['REQUEST_METHOD'] == 'POST'){
				$postdata = file_get_contents("php://input");
				$request = json_decode($postdata);
				$userid = $this->webmodel->removeEscape($request->web_id);
				//print_r($start);
				//print_r($end);
					
					$data = array(
						'pre_entry_form_email' => $request->pre_entry_form_email,
						'pre_entry_form_name' => $request->pre_entry_form_name,
						'pre_entry_form_address' => $request->pre_entry_form_address,
						'pre_entry_form_city' => $request->pre_entry_form_city,
						'pre_entry_form_state' => $request->pre_entry_form_state,
						'pre_entry_form_country' => $request->pre_entry_form_country,
						'pre_entry_form_birthday' => $request->pre_entry_form_birthday,
						'pre_entry_form_phone' => $request->pre_entry_form_phone,
						'pre_entry_form_entry_code' => $request->pre_entry_form_entry_code,
					);
				//print_r($start);
				//   print_r($data);
					//print_r(contest_end_date);
				
					$result = $this->webmodel->commonADD('remco_pre_entry_form', $data);
					if ($result) {
						//$mail = sendemail($sendEmail);
						$response['status'] = '200';
						$response['error'] = 'Form details added successfully';
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
			
			public function editpreentry(){
			if($_SERVER['REQUEST_METHOD'] == 'POST'){
				$postdata = file_get_contents("php://input");
				$request = json_decode($postdata);
				$userid = $this->webmodel->removeEscape($request->web_id);
				//print_r($start);
				//print_r($end);
					
					$data = array(
						'company_id' => $request->company_id,
						'pre_entry_form_email' => $request->pre_entry_form_email,
						'pre_entry_form_name' => $request->pre_entry_form_name,
						'pre_entry_form_address' => $request->pre_entry_form_address,
						'pre_entry_form_city' => $request->pre_entry_form_city,
						'pre_entry_form_state' => $request->pre_entry_form_state,
						'pre_entry_form_country' => $request->pre_entry_form_country,
						'pre_entry_form_birthday' => $request->pre_entry_form_birthday,
						'pre_entry_form_phone' => $request->pre_entry_form_phone,
						'pre_entry_form_entry_code' => $request->pre_entry_form_entry_code,
					);
					//print_r ($data);
			
					$result = $this->webmodel->commonEDITWHERE('remco_pre_entry_form', $data, "`web_id`=" . $userid);
				
					
					if ($result) {
						//$mail = sendemail($sendEmail);
						$response['status'] = '200';
						$response['error'] = 'Form details Updated successfully';
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
}