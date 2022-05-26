<?php namespace App\Controllers;
use App\Models\Webmodel;
use CodeIgniter\Controller;
use Symfony\Component\Config\Definition\Exception\Exception;
//define('webmodel', 'adf');

class Webcompanyadmintest extends Controller
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
			'companyLogin',
            'getAllCompanyContest',
        ];
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
            // print_r($request);
            $companyEmail = $request->company_name;
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
            $where = "(`company_email`=" . $this->webmodel->removeEscape($companyEmail). " AND `company_password`='" . hash('sha256', $password)."')";
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
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
          //$result = $this->webmodel->commonLIST('remco_company_contest');

          $postdata = file_get_contents("php://input");
          $request = json_decode($postdata);
          $companyId = json_decode(json_encode($request), true);
          //print_r($companyId);
          //echo($companyId['Id']);
          //print_r($result);

          //$_SERVER['REQUEST_METHOD'] == 'GET'; 
          /*current time*/
          $current_time = time();
          //echo($current_time);
          //echo('hii');
          
          /*Get present after and before table data*/
          $present_contest_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_contest
          WHERE  $current_time between company_start_date and company_end_date";
          $present_contest_resultdata = $this->webmodel->customSql($present_contest_sql);
          //print_r($resultdata[0]->web_id);
          //$contestarray = json_decode(json_encode($resultdata), true);
          $before_contest_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_contest
          WHERE  $current_time > company_end_date";
          $before_contest_resultdata = $this->webmodel->customSql($before_contest_sql);
          //$contestarray = json_decode(json_encode($resultdata), true);
          //print_r($contestarray);
          
          /*Save state of the events to array data */
          $before_contest_data = array(
              'company_campaign_mode' => 'Finished',
          );
          
          $present_contest_data = array(
              'company_campaign_mode' => 'On going',
          );
          
          if($present_contest_resultdata){
          /*Get count of array*/
              $present_contest_count = count($present_contest_resultdata);
              //print_r($count);
              /*Start insert state of events using for loop.. max value=array count */
              for($i=0; $i<$present_contest_count; $i++){
                  //$contest_userid = $contestarray[$i]['web_id'];
                  $contest_userid = $present_contest_resultdata[$i]->web_id;
                  // print_r('Hii');
                  // print_r($contest_userid);
               $contest_result = $this->webmodel->commonEDITWHERE('remco_company_contest', $present_contest_data, "`web_id`=" . $contest_userid)  ; 
              } 
          }
          
          if($before_contest_resultdata){
              $before_contest_count = count($before_contest_resultdata);
              for($i=0; $i<$before_contest_count; $i++){
                  $contest_userid = $before_contest_resultdata[$i]->web_id;
              $contest_result = $this->webmodel->commonEDITWHERE('remco_company_contest', $before_contest_data, "`web_id`=" . $contest_userid); 
              }
          }
          //$compsql = 'SELECT * from remco_company_contest where company_contest_id = '.$companyId["Id"].'';
          $getall = 'SELECT * FROM `remco_company_contest` where company_contest_id='.$companyId["Id"].' ORDER BY web_id DESC';
          $result = $this->webmodel->customSql($getall);
           
          if($result){
            $response['status'] = '200';
            $response['data'] = $result;
            echo json_encode($response);
            exit;
          }
          else{
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
            $companyId = $request->company_contest_id;
            $entryform = $request->company_gallery_entry_form;
            // print_r($start);
            //print_r($end); 
            $current_time = time();
            if($current_time<$start){
                $camp_mode = 'Queued';
            }
            else{
                $camp_mode = 'On going';
            }
    
            $datesql = "SELECT company_start_date, company_end_date, company_contest_id
            FROM remco_company_contest
            WHERE ($start between company_start_date and company_end_date)
              AND (company_contest_id=$companyId)";
            $resultdate = $this->webmodel->customSql($datesql);
            
            $enddatesql = "SELECT company_start_date, company_end_date, company_contest_id
            FROM remco_company_contest
            WHERE ($end between company_start_date and company_end_date)
              AND (company_contest_id=$companyId)";
            $endresultdate = $this->webmodel->customSql($enddatesql);
    
            $datesqlrange = "SELECT company_start_date, company_end_date
            FROM remco_company_contest
            WHERE (company_start_date >= $start AND company_end_date <= $end)
            AND company_contest_id=$companyId";
            $resultdaterange = $this->webmodel->customSql($datesqlrange);
    
            if(empty($resultdate) && empty($resultdaterange) &&empty($endresultdate)){
                $data = array(
                    'company_contest_id' => $request->company_contest_id,
                    'company_campaign_title' => $request->company_campaign_title,
                    'company_campaign_description' => $request->company_campaign_description,
                    'company_start_date'  => $start,
                    'company_end_date'  => $end,
                    'company_time_zone' => $request->company_time_zone,
                    'company_date_format' => $request->company_date_format,
                    'company_winners_number' => $request->company_winners_number,
                    'winning_credits' => $request->company_winning_credits,
                    'company_facebook_url' => $request->company_facebook_url,
                    'company_instagram_url' => $request->company_instagram_url,
                    'company_page_url' => $request->company_page_url,
                    'company_entry_frequency' => $request->company_entry_frequency,
                    'company_gallery_logo' => $request->company_gallery_logo,
                    'company_gallery_entry_form' => $request->company_gallery_entry_form,
                    'company_gallery_label' => $request->company_gallery_label,
                    'company_content_approval' => $request->company_content_approval,
                    'company_gallery_sorting' => $request->company_gallery_sorting,
                    'company_no_of_images_displayed' => $request->company_no_of_images_displayed,
                    'company_images_per_row' => $request->company_images_per_row,
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
                    'company_campaign_mode' => $camp_mode,
                );
                //print_r($data);
                //exit;
    
                $result = $this->webmodel->commonADD('remco_company_contest', $data);
                if ($result) {
                    //$mail = sendemail($sendEmail);
                    $response['status'] = '200';
                    $response['error'] = 'Contest details added successfully';
                    //$builder = $this->db->table($table);
                    //$builder->insert($data);
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
        
        else{
            $response['status'] = '500';
            $response['error'] = 'Invalid date because you have already registered another campaign within this date range';
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

        $companyId = $request->company_contest_id;
        $datesql = "SELECT company_start_date, company_end_date, company_contest_id
        FROM remco_company_contest
        WHERE ($start between company_start_date and company_end_date)
          AND (company_contest_id=$companyId)";
        $resultdate = $this->webmodel->customSql($datesql);
        //print_r($resultdate);
        //exit;
        if($resultdate){
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
                'winning_credits' => $request->company_winning_credits,
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
        else{
            $response['status'] = '500';
            $response['error'] = 'Invalid date because you have already registered another contest within this date range';
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
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
          //$result = $this->webmodel->commonLIST('remco_company_email');
          $postdata = file_get_contents("php://input");
          $request = json_decode($postdata);
          //$request1 = json_encode($request);
          //print_r($request1);
          //echo('HII');
          $companyId = json_decode(json_encode($request),true);
          //print_r($companyId);
          //echo('Hello');
          $id = $companyId['Id'];
          $where = "(`company_email_id`=" .$id. ")";
          //print_r($where);
          //print_r($result);
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
              'company_campaign_mode' => 'On going',
          );

          if($present_email_resultdata){
              $present_email_count = count(array($present_email_resultdata));
              //$present_email_count = 1;
              for($i=0; $i<$present_email_count; $i++){
                  $email_userid = $present_email_resultdata[$i]->web_id;
               $email_result = $this->webmodel->commonEDITWHERE('remco_company_email', $present_email_data, "`web_id`=" . $email_userid)              ; 
              } 
          }

          if($before_email_resultdata){
              $before_email_count = count($before_email_resultdata);
              for($i=0; $i<$before_email_count; $i++){
                  $email_userid = $before_email_resultdata[$i]->web_id;
              $email_result = $this->webmodel->commonEDITWHERE('remco_company_email', $before_email_data, "`web_id`=" . $email_userid); 
              }
          }

          //$result = $this->webmodel->commonLISTWHERE('remco_company_email',$where,false);
          $getallemail = "SELECT * FROM `remco_company_email` where company_email_id=$id ORDER BY web_id DESC";
          $result = $this->webmodel->customSql($getallemail);
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
          //print_r($request);
          $start = strtotime($request->company_start_date);
          $end = strtotime($request->company_end_date);
          $companyId = $request->company_email_id;
          $current_time = time();
          if($current_time<$start){
            $camp_mode = 'Queued';
            }
            else{
                $camp_mode = 'On going';
            }

          $datesql = "SELECT company_start_date, company_end_date, company_email_id
          FROM remco_company_email
          WHERE ($start between company_start_date and company_end_date)
          AND (company_email_id=$companyId)";
          $resultdate = $this->webmodel->customSql($datesql);

          $enddatesql = "SELECT company_start_date, company_end_date, company_email_id
          FROM remco_company_email
          WHERE ($end between company_start_date and company_end_date)
          AND (company_email_id=$companyId)";
          $endresultdate = $this->webmodel->customSql($enddatesql);
  
          $datesqlrange = "SELECT company_start_date, company_end_date
          FROM remco_company_email
          WHERE (company_start_date >= $start AND company_end_date <= $end)
          AND company_email_id=$companyId";
          $resultdaterange = $this->webmodel->customSql($datesqlrange);
  
          if(empty($resultdate) && empty($resultdaterange) && empty($endresultdate)){
            $data = array(
		        'company_email_id' => $request->company_email_id,
                'company_campaign_title' => $request->company_campaign_title,
                'company_campaign_description' => $request->company_campaign_description,
                'company_start_date' => $start,
                'company_end_date' => $end,
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
                'company_campaign_mode' => $camp_mode,
            );
               
            //print_r($data);
            $result = $this->webmodel->commonADD('remco_company_email', $data);
            //$result = $this->webmodel->commonEDITWHERE('remco_company_email', $data, "`web_id`=" . $userid);
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
        else{
            $response['status'] = '500';
            $response['error'] = 'Invalid date because you have already registered another campaign within this date range';
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
               
          $companyId = $request->company_email_id;
          $datesql = "SELECT company_start_date, company_end_date, company_email_id
          FROM remco_company_email
          WHERE ($start between company_start_date and company_end_date)
          AND (company_email_id=$companyId)";
          $resultdate = $this->webmodel->customSql($datesql);
          //print_r($resultdate);
          //exit;
          if($resultdate){
            $data = array(
		        'company_email_id' => $request->company_email_id,
                'company_campaign_title' => $request->company_campaign_title,
                'company_campaign_description' => $request->company_campaign_description,
                'company_start_date' => $start,
                'company_end_date' => $end,
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
            else{
                $response['status'] = '500';
                $response['error'] = 'Invalid date because you have already registered another contest within   this date range';
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
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
          //$result = $this->webmodel->commonLIST('remco_company_learn');
          //print_r($result);
          $postdata = file_get_contents("php://input");
          $request = json_decode($postdata);
          $companyId = json_decode(json_encode($request),true);
          $Id = $companyId['Id'];
          $where = "(`company_learn_id`= $Id )";
          //print_r($result);

          $current_time = time();
           /*Learn&Earn state of events*/
           $present_learn_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_learn
           WHERE  $current_time between company_start_date and company_end_date";
           $present_learn_resultdata = $this->webmodel->customSql($present_learn_sql);

           $before_learn_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_learn
           WHERE  $current_time > company_end_date";
           $before_learn_resultdata = $this->webmodel->customSql($before_learn_sql);
           //print_r($before_learn_sql);

           $before_learn_data = array(
               'company_campaign_mode' => 'Finished',
           );
           $present_learn_data = array(
               'company_campaign_mode' => 'On going',
           );
           if($present_learn_resultdata){
               $present_learn_count = count($present_learn_resultdata);
               //$present_learn_count = 1;
           
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
           /* $result = $this->webmodel->commonLISTWHERE('remco_company_learn',$where,false); */
           $getall = "SELECT * FROM `remco_company_learn` where company_learn_id=$Id ORDER BY web_id DESC";
           $result = $this->webmodel->customSql($getall);

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
            $companyId = $request->company_learn_id;
            $current_time = time();
            if($current_time<$start){
                $camp_mode = 'Queued';
            }
            else{
                $camp_mode = 'On going';
            }

            $datesql = "SELECT company_start_date, company_end_date, company_learn_id
            FROM remco_company_learn
            WHERE ($start between company_start_date and company_end_date)
              AND (company_learn_id=$companyId)";
            $resultdate = $this->webmodel->customSql($datesql);

            $enddatesql = "SELECT company_start_date, company_end_date, company_learn_id
            FROM remco_company_learn
            WHERE ($end between company_start_date and company_end_date)
              AND (company_learn_id=$companyId)";
            $endresultdate = $this->webmodel->customSql($enddatesql);
    
            $datesqlrange = "SELECT company_start_date, company_end_date
            FROM remco_company_learn
            WHERE (company_start_date >= $start AND company_end_date <= $end)
            AND company_learn_id=$companyId";
            $resultdaterange = $this->webmodel->customSql($datesqlrange);
            // print_r($resultdaterange);
            // exit;
    
            if(empty($resultdate) && empty($resultdaterange) && empty($endresultdate)){
                $data = array(
					'company_learn_id' => $request->company_learn_id,
                    'company_campaign_title' => $request->company_campaign_title,
                    'company_campaign_description' => $request->company_campaign_description,
                    'company_start_date'  => $start,
                    'company_end_date'  => $end,
                    // 'company_start_time' => $request->company_start_time,
                    // 'company_end_time' => $request->company_end_time,
                    'company_time_zone' => $request->company_time_zone,
                    'company_date_format' => $request->company_date_format,
                    //'company_add_questions' => $request->company_add_questions,
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
					'campaign_type' => 'learn',
                    'company_campaign_mode' => $camp_mode,
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
            else{
                $response['status'] = '500';
                $response['error'] = 'Invalid date because you have already registered another campaign within this date range';
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
            $companyId = $request->company_learn_id;
            $datesql = "SELECT company_start_date, company_end_date, company_learn_id
            FROM remco_company_learn
            WHERE ($start between company_start_date and company_end_date)
              AND (company_learn_id=$companyId)";
            $resultdate = $this->webmodel->customSql($datesql);
            //print_r($resultdate);
            //exit;

            if($resultdate){
                $data = array(
					'company_learn_id' => $request->company_learn_id,
                    'company_campaign_title' => $request->company_campaign_title,
                    'company_campaign_description' => $request->company_campaign_description,
                    'company_start_date'  => $start,
                    'company_end_date'  => $end,
                    // 'company_start_time' => $request->company_start_time,
                    // 'company_end_time' => $request->company_end_time,
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
               
                $result = $this->webmodel->commonEDITWHERE('remco_company_learn', $data, "`web_id`=" . $userid);
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
            else{
                $response['status'] = '500';
                $response['error'] = 'Invalid date because you have already registered another contest within this date range';
                echo json_encode($response);
                exit;
            }
        }
      }

      public function addquizlearn(){
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            $postdata = file_get_contents("php://input");
            $request1 = json_decode($postdata);
            $request = json_decode(json_encode($request1),true);
            $count = count($request);
            $form ="select web_id from remco_company_learn ORDER BY web_id DESC LIMIT 1";
            $form_id = $this->webmodel->customSql($form);
            // print_r($form_id);
            // print_r($form_id[0]->web_id);

            for($i=0; $i<$count; $i++){
                $array1 = $request[$i];
                $values = array_values($array1);
                $options = array($values[2],$values[3],$values[4],$values[5]);
                $string_version = implode(',', $options);
                $data = array(
					'company_id' => $values[7],
                    'learn_question' => $values[1],
                    'learn_question_option1' => $values[2],
                    'learn_question_option2' => $values[3],
                    'learn_question_option3' => $values[4],
                    'learn_question_option4' => $values[5],
                    'learn_question_ans' => $values[6],
                    'learn_form_id' => $form_id[0]->web_id,
                );
                $result = $this->webmodel->commonADD('remco_company_learn_questions', $data);
            }
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

    public function editquizlearn(){
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $quizId = $request->web_id;
        $data = array(
            /* 'company_id' => $values[7], */
            'learn_question' => $request->learn_question,
            'learn_question_option1' => $request->learn_question_option1,
            'learn_question_option2' => $request->learn_question_option2,
            'learn_question_option3' => $request->learn_question_option3,
            'learn_question_option4' => $request->learn_question_option4,
            'learn_question_ans' => $request->learn_question_ans,
        );
        $result = $this->webmodel->commonEDITWHERE('remco_company_learn_questions', $data, "`web_id`=" . $quizId); 
        if ($result) {
            //$mail = sendemail($sendEmail);
            $response['status'] = '200';
            $response['error'] = 'Quiz details updateed successfully';
            $response['data'] = $result;
            echo json_encode($response);
            exit;
        } else {
            $response['status'] = '500';
            $response['error'] = 'Can not be update';
            echo json_encode($response);
            exit;
        }
    }
    }

      public function getAllCompanySweep(){
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
          //$result = $this->webmodel->commonLIST('remco_company_sweepstakes');
          $postdata = file_get_contents("php://input");
          $request = json_decode($postdata);
          $companyId = json_decode(json_encode($request),true);
          $Id = $companyId['Id'];
          $where = "(`company_sweepstakes_id`= $Id )";

          $current_time = time();
           /*Sweepstakes state of events*/
           $present_sweep_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_sweepstakes
           WHERE  $current_time between company_start_date and company_end_date";
           $present_sweep_resultdata = $this->webmodel->customSql($present_sweep_sql);
           //print_r($present_sweep_resultdata);
          
           $before_sweep_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_sweepstakes
           WHERE  $current_time > company_end_date";
           $before_sweep_resultdata = $this->webmodel->customSql($before_sweep_sql);
           /* print_r($before_sweep_resultdata); */
          
           $before_sweep_data = array(
               'company_campaign_mode' => 'Finished',
           );
           $present_sweep_data = array(
               'company_campaign_mode' => 'On going',
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
                   /* print_r($sweep_userid); */
               $sweep_result1 = $this->webmodel->commonEDITWHERE('remco_company_sweepstakes', $before_sweep_data, "`web_id`=" . $sweep_userid); 
               }
           }
           //$result = $this->webmodel->commonLISTWHERE('remco_company_sweepstakes',$where,false);
           $getall = "SELECT * FROM `remco_company_sweepstakes` where company_sweepstakes_id=$Id ORDER BY web_id DESC";
           $result = $this->webmodel->customSql($getall);
       
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
            $companyId = $request->company_sweepstakes_id;
            $current_time = time();
            if($current_time<$start){
                $camp_mode = 'Queued';
            }
            else{
                $camp_mode = 'On going';
            }

            $datesql = "SELECT company_start_date, company_end_date, company_sweepstakes_id
            FROM remco_company_sweepstakes
            WHERE ($start between company_start_date and company_end_date)
              AND (company_sweepstakes_id=$companyId)";
            $resultdate = $this->webmodel->customSql($datesql);
            
            $enddatesql = "SELECT company_start_date, company_end_date, company_sweepstakes_id
            FROM remco_company_sweepstakes
            WHERE ($end between company_start_date and company_end_date)
              AND (company_sweepstakes_id=$companyId)";
            $endresultdate = $this->webmodel->customSql($enddatesql);
    
            $datesqlrange = "SELECT company_start_date, company_end_date
            FROM remco_company_sweepstakes
            WHERE (company_start_date >= $start AND company_end_date <= $end)
            AND company_sweepstakes_id=$companyId";
            $resultdaterange = $this->webmodel->customSql($datesqlrange);
    
            if(empty($resultdate) && empty($resultdaterange) && empty($endresultdate)){
                 
                $data = array(
					'company_sweepstakes_id' => $request->company_sweepstakes_id,
                    'company_campaign_title' => $request->company_campaign_title,
                    'company_campaign_description' => $request->company_campaign_description,
                    'company_start_date'  => $start,
                    'company_end_date'  => $end,
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
                    'company_campaign_mode' => $camp_mode,
                );
               //print_r($data);
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
            else{
                $response['status'] = '500';
                $response['error'] = 'Invalid date because you have already registered another campaign within this date range';
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

            $companyId = $request->company_sweepstakes_id;
            $datesql = "SELECT company_start_date, company_end_date, company_sweepstakes_id
            FROM remco_company_sweepstakes
            WHERE ($start between company_start_date and company_end_date)
              AND (company_sweepstakes_id=$companyId)";
            $resultdate = $this->webmodel->customSql($datesql);
            //print_r($resultdate);
            //exit;
            if($resultdate){
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
            else{
                $response['status'] = '500';
                $response['error'] = 'Invalid date because you have already registered another contest within this date range';
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
            if($_SERVER['REQUEST_METHOD'] == 'POST'){
              //$result = $this->webmodel->commonLIST('remco_company_social_comments');
              $postdata = file_get_contents("php://input");
              $request = json_decode($postdata);
              $companyId = json_decode(json_encode($request),true);
              $Id = $companyId['Id'];
              $where = "(`company_social_comments_id`= $Id )";

              $current_time = time();
               /*Social comments state of events */
               $present_social_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_social_comments
               WHERE  $current_time between company_start_date and company_end_date";
               $present_social_resultdata = $this->webmodel->customSql($present_social_sql);
              // print_r($present_social_resultdata);
              
               $before_social_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_social_comments
               WHERE  $current_time > company_end_date";
               $before_social_resultdata = $this->webmodel->customSql($before_social_sql);
               //print_r($before_social_resultdata);
              
               $before_social_data = array(
                   'company_campaign_mode' => 'Finished',
               );
               $present_social_data = array(
                   'company_campaign_mode' => 'On going',
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

              //$result = $this->webmodel->commonLISTWHERE('remco_company_social_comments',$where,false);
              $getall = "SELECT * FROM `remco_company_social_comments` where company_social_comments_id=$Id ORDER BY web_id DESC";
              $result = $this->webmodel->customSql($getall);
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
                $companyId = $request->company_social_comments_id;
                $current_time = time();
                //print_r($start);
                //print_r($end);
                    
                $datesql = "SELECT company_start_date, company_end_date, company_social_comments_id
                FROM remco_company_social_comments
                WHERE ($start between company_start_date and company_end_date)
                  AND (company_social_comments_id=$companyId)";
                $resultdate = $this->webmodel->customSql($datesql);

                $enddatesql = "SELECT company_start_date, company_end_date, company_social_comments_id
                FROM remco_company_social_comments
                WHERE ($end between company_start_date and company_end_date)
                  AND (company_social_comments_id=$companyId)";
                $resultenddate = $this->webmodel->customSql($enddatesql);
        
                $datesqlrange = "SELECT company_start_date, company_end_date
                FROM remco_company_social_comments
                WHERE (company_start_date >= $start AND company_end_date <= $end)
                AND company_social_comments_id=$companyId";
                $resultdaterange = $this->webmodel->customSql($datesqlrange);
                // print_r($resultdaterange);
                // exit;
                if($current_time<$start){
                    $camp_mode = 'Queued';
                }
                else{
                    $camp_mode = 'On going';
                }
        
                if(empty($resultdate) && empty($resultdaterange) && empty($resultenddate)){
                    $data = array(
						'company_social_comments_id'  => $request->company_social_comments_id,
                        //'company_connectfrom' => $request->company_connectfrom,
                        'company_start_date'  => $start,
                        'company_end_date'  => $end,
                        // 'company_start_time'  => $request->company_start_time,
                        // 'company_end_time'  => $request->company_end_time,
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
                        'company_campaign_mode' => $camp_mode,
                    );
                   //print_r($start);
                    //print_r(contest_end_date);

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
                else{
                    $response['status'] = '500';
                    $response['error'] = 'Invalid date because you have already registered another campaign within this date range';
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

                $companyId = $request->company_social_comments_id;
                $datesql = "SELECT company_start_date, company_end_date, company_social_comments_id
                FROM remco_company_social_comments
                WHERE ($start between company_start_date and company_end_date)
                  AND (company_social_comments_id=$companyId)";
                $resultdate = $this->webmodel->customSql($datesql);

                if($resultdate){    
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
                else{
                    $response['status'] = '500';
                    $response['error'] = 'Invalid date because you have already registered another contest within this date range';
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
				if($_SERVER['REQUEST_METHOD'] == 'POST'){

                $postdata = file_get_contents("php://input");
                $request = json_decode($postdata);
                $companyId = json_decode(json_encode($request),true);
                $Id = $companyId['Id'];
                //print_r($Id);

                $sql = "SELECT * FROM remco_contest_participants
					    LEFT JOIN remco_company_contest
					    ON remco_contest_participants.campaign_id = remco_company_contest.web_id
					    LEFT JOIN remco_participants
						ON remco_contest_participants.campaign_participant_id = remco_participants.web_id WHERE campaign_company_id =$Id";
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

   

            public function getAllParticipants(){
				if($_SERVER['REQUEST_METHOD'] == 'POST'){

                $postdata = file_get_contents("php://input");
                $request = json_decode($postdata);
                $Id = json_decode(json_encode($request),true);
                // 'Id':companyId, 'ContestID':participants
                $companyId = $Id['Id'];
                $contestId = $Id['ContestID'];
                // print_r($companyId);
                // print_r($contestId);

                $sql = "SELECT * FROM remco_contest_participants WHERE campaign_company_id=$companyId AND   campaign_id=$contestId ORDER BY web_id DESC";
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

            public function editContestParticipants(){
                if($_SERVER['REQUEST_METHOD'] == 'POST'){
                    $postdata = file_get_contents("php://input");
                    $request = json_decode($postdata);
                    $birthday = strtotime($request->pre_entry_form_birthday);
                    $userid = $this->webmodel->removeEscape($request->web_id);
                         
                        $data = array(
                            'pre_entry_form_name' => $request->pre_entry_form_name,
                            'pre_entry_form_email' => $request->pre_entry_form_email,
                            'pre_entry_form_city' => $request->pre_entry_form_city,
                            'pre_entry_form_state' => $request->pre_entry_form_state,
                            'pre_entry_form_country' => $request->pre_entry_form_country,
                            'pre_entry_form_phone' => $request->pre_entry_form_phone,
                            'pre_entry_form_birthday' => $birthday,
                            'pre_entry_form_entry_code' => $request->pre_entry_form_entry_code,
                            'pre_entry_form_address' => $request->pre_entry_form_address
                        );
                
                        $result = $this->webmodel->commonEDITWHERE('remco_contest_participants', $data, "`web_id`=" . $userid);
                       
                        
                        if ($result) {
                            //$mail = sendemail($sendEmail);
                            $response['status'] = '200';
                            $response['error'] = 'Campaign details Updated successfully';
                            $response['data'] = $result;
                            echo json_encode($response);
                            exit;
                        } else {
                            $response['status'] = '500';
                            $response['error'] = 'Failed to update campaign details';
                            echo json_encode($response);
                            exit;
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

            public function getid() {
                if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                  $web_id = $_GET["company_id"];
                  $sql="SELECT * FROM remco_companies WHERE remco_companies.web_id= $web_id ";
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

            public function getUserCount() {
                if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                  $user_count = $_GET["user_count"];
                  // $result = $this->webmodel->commonLISTWHERE('remco_contest_participants', "`user_random_key`=" . $credit_id , false);
                  $sql="SELECT user_limit FROM remco_companies WHERE remco_companies.web_id= $user_count ";
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

            public function editEmailParticipants(){
                if($_SERVER['REQUEST_METHOD'] == 'POST'){
                    $postdata = file_get_contents("php://input");
                    $request = json_decode($postdata);
                    $birthday = strtotime($request->pre_entry_form_birthday);
                    $userid = $this->webmodel->removeEscape($request->web_id);
                         
                        $data = array(
                            'pre_entry_form_name' => $request->pre_entry_form_name,
                            'pre_entry_form_email' => $request->pre_entry_form_email,
                            'pre_entry_form_city' => $request->pre_entry_form_city,
                            'pre_entry_form_state' => $request->pre_entry_form_state,
                            'pre_entry_form_country' => $request->pre_entry_form_country,
                            'pre_entry_form_phone' => $request->pre_entry_form_phone,
                            'pre_entry_form_birthday' => $birthday,
                            'pre_entry_form_entry_code' => $request->pre_entry_form_entry_code,
                            'pre_entry_form_address' => $request->pre_entry_form_address
                        );
                
                        $result = $this->webmodel->commonEDITWHERE('remco_email_participants', $data, "`web_id`=" . $userid);
                       
                        
                        if ($result) {
                            //$mail = sendemail($sendEmail);
                            $response['status'] = '200';
                            $response['error'] = 'Campaign details Updated successfully';
                            $response['data'] = $result;
                            echo json_encode($response);
                            exit;
                        } else {
                            $response['status'] = '500';
                            $response['error'] = 'Failed to update campaign details';
                            echo json_encode($response);
                            exit;
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
				$sql = "SELECT * FROM remco_learn_participants WHERE campaign_company_id=$company_Id AND     campaign_id=$learnId ORDER BY web_id DESC";
						
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

            public function editLearnParticipants(){
                if($_SERVER['REQUEST_METHOD'] == 'POST'){
                    $postdata = file_get_contents("php://input");
                    $request = json_decode($postdata);
                    $birthday = strtotime($request->pre_entry_form_birthday);
                    $userid = $this->webmodel->removeEscape($request->web_id);
                         
                        $data = array(
                            'pre_entry_form_name' => $request->pre_entry_form_name,
                            'pre_entry_form_email' => $request->pre_entry_form_email,
                            'pre_entry_form_city' => $request->pre_entry_form_city,
                            'pre_entry_form_state' => $request->pre_entry_form_state,
                            'pre_entry_form_country' => $request->pre_entry_form_country,
                            'pre_entry_form_phone' => $request->pre_entry_form_phone,
                            'pre_entry_form_birthday' => $birthday,
                            'pre_entry_form_entry_code' => $request->pre_entry_form_entry_code,
                            'pre_entry_form_address' => $request->pre_entry_form_address
                        );
                
                        $result = $this->webmodel->commonEDITWHERE('remco_learn_participants', $data, "`web_id`=" . $userid);
                       
                        
                        if ($result) {
                            //$mail = sendemail($sendEmail);
                            $response['status'] = '200';
                            $response['error'] = 'Campaign details Updated successfully';
                            $response['data'] = $result;
                            echo json_encode($response);
                            exit;
                        } else {
                            $response['status'] = '500';
                            $response['error'] = 'Failed to update campaign details';
                            echo json_encode($response);
                            exit;
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
				$sql = "SELECT * FROM remco_sweepstakes_participants WHERE campaign_company_id=$company_Id AND     campaign_id=$sweepId ORDER BY web_id DESC";
						
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

            public function editSweepParticipants(){
                if($_SERVER['REQUEST_METHOD'] == 'POST'){
                    $postdata = file_get_contents("php://input");
                    $request = json_decode($postdata);
                    $birthday = strtotime($request->pre_entry_form_birthday);
                    $userid = $this->webmodel->removeEscape($request->web_id);
                         
                        $data = array(
                            'pre_entry_form_name' => $request->pre_entry_form_name,
                            'pre_entry_form_email' => $request->pre_entry_form_email,
                            'pre_entry_form_city' => $request->pre_entry_form_city,
                            'pre_entry_form_state' => $request->pre_entry_form_state,
                            'pre_entry_form_country' => $request->pre_entry_form_country,
                            'pre_entry_form_phone' => $request->pre_entry_form_phone,
                            'pre_entry_form_birthday' => $birthday,
                            'pre_entry_form_entry_code' => $request->pre_entry_form_entry_code,
                            'pre_entry_form_address' => $request->pre_entry_form_address
                        );
                
                        $result = $this->webmodel->commonEDITWHERE('remco_sweepstakes_participants', $data, "`web_id`=" . $userid);
                       
                        
                        if ($result) {
                            //$mail = sendemail($sendEmail);
                            $response['status'] = '200';
                            $response['error'] = 'Campaign details Updated successfully';
                            $response['data'] = $result;
                            echo json_encode($response);
                            exit;
                        } else {
                            $response['status'] = '500';
                            $response['error'] = 'Failed to update campaign details';
                            echo json_encode($response);
                            exit;
                        }
                    }
            }

			public function getAllSweepstakesParticipants(){
				if($_SERVER['REQUEST_METHOD'] == 'POST'){
                    $postdata = file_get_contents("php://input");
                    $request = json_decode($postdata);
                    $companyId = json_decode(json_encode($request),true);
                    $Id = $companyId['Id'];
					
					 //$result = $this->webmodel->commonLIST('remco_company_sweepstakes');
				$sql = "SELECT * FROM remco_sweepstakes_participants
					    LEFT JOIN remco_company_sweepstakes
					    ON remco_sweepstakes_participants.campaign_id = remco_company_sweepstakes.web_id
					    LEFT JOIN remco_participants
						ON remco_sweepstakes_participants.campaign_participant_id = remco_participants.web_id WHERE campaign_company_id=$Id";
						
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
				if($_SERVER['REQUEST_METHOD'] == 'POST'){
                    $postdata = file_get_contents("php://input");
                    $request = json_decode($postdata);
                    $companyId = json_decode(json_encode($request),true);
                    $Id = $companyId['Id'];
					
				$sql = "SELECT * FROM remco_social_participants
					    LEFT JOIN remco_company_social_comments
					    ON remco_social_participants.social_id = remco_company_social_comments.web_id
					    LEFT JOIN remco_participants
						ON remco_social_participants.social_participant_id = remco_participants.web_id
                        WHERE company_social_comments_id=$Id";
						
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
		    	if($_SERVER['REQUEST_METHOD'] == 'POST'){
		    	//$result = $this->webmodel->commonLIST('remco_pre_entry_form');
                //print_r($result[0]);
                //print_r($result);
                $postdata = file_get_contents("php://input");
                $request = json_decode($postdata);
                $array = json_decode(json_encode($request), true);
                //print_r($array);
                //echo($array['userId']);
                $result1='SELECT * FROM remco_pre_entry_form where company_id= '.$array["userId"].'';
                $result = $this->webmodel->customSql($result1);
                //print_r($result);
                //$id = array_column($result, 'company_id');
                //print_r($id);

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
						'pre_entry_form_country' => $request->pre_entry_form_phone,
						'pre_entry_form_birthday' => $request->pre_entry_form_birthday,
						'pre_entry_form_phone' => $request->pre_entry_form_phone,
						'pre_entry_form_entry_code' => $request->pre_entry_form_entry_code,
					);
				//print_r($start);
				  // print_r($data);
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
                // print_r($request);
				$userid = $this->webmodel->removeEscape($request->web_id);
				// print_r($start);
				//print_r($end);
					
					$data = array(
						// 'company_id' => $request->company_id,
						'pre_entry_form_email' => $request->pre_entry_form_email,
						'pre_entry_form_name' => $request->pre_entry_form_name,
						'pre_entry_form_address' => $request->pre_entry_form_address,
						'pre_entry_form_city' => $request->pre_entry_form_city,
						'pre_entry_form_state' => $request->pre_entry_form_state,
						'pre_entry_form_country' => $request->pre_entry_form_phone,
						'pre_entry_form_birthday' => $request->pre_entry_form_birthday,
						'pre_entry_form_phone' => $request->pre_entry_form_phone,
						'pre_entry_form_entry_code' => $request->pre_entry_form_entry_code,
					);
					// print_r ($data);
			
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
            /* CRON */
            public function stateOfEvents(){
                $_SERVER['REQUEST_METHOD'] == 'GET';
                /*current time*/
                $current_time = time();
                //echo($current_time);
                //echo('hii');
                
                /*Get present after and before table data*/
                $present_contest_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_contest
                WHERE  $current_time between company_start_date and company_end_date";
                $present_contest_resultdata = $this->webmodel->customSql($present_contest_sql);
                //print_r($resultdata[0]->web_id);
                //$contestarray = json_decode(json_encode($resultdata), true);
                $before_contest_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_contest
                WHERE  $current_time < company_start_date";
                $before_contest_resultdata = $this->webmodel->customSql($before_contest_sql);
                //$contestarray = json_decode(json_encode($resultdata), true);
                //print_r($contestarray);
                
                /*Save state of the events to array data */
                $before_contest_data = array(
                    'company_campaign_mode' => 'Finished',
                );
                
                $present_contest_data = array(
                    'company_campaign_mode' => 'On going',
                );
                
                if($present_contest_resultdata){
                /*Get count of array*/
                    $present_contest_count = count($present_contest_resultdata);
                    //print_r($count);
                    /*Start insert state of events using for loop.. max value=array count */
                    for($i=0; $i<$present_contest_count; $i++){
                        //$contest_userid = $contestarray[$i]['web_id'];
                        $contest_userid = $present_contest_resultdata[$i]->web_id;
                        // print_r('Hii');
                        // print_r($contest_userid);
                     $result = $this->webmodel->commonEDITWHERE('remco_company_contest', $present_contest_data, "`web_id`=" . $contest_userid)  ; 
                    } 
                }
                
                if($before_contest_resultdata){
                    $before_contest_count = count($before_contest_resultdata);
                    for($i=0; $i<$before_contest_count; $i++){
                        $contest_userid = $before_contest_resultdata[$i]->web_id;
                    $result = $this->webmodel->commonEDITWHERE('remco_company_contest', $before_contest_data, "`web_id`=" . $contest_userid); 
                    }
                }

                /*Email state of events */
                $present_email_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_email
                WHERE  $current_time between company_start_date and company_end_date";
                $present_email_resultdata = $this->webmodel->customSql($present_email_sql);

                $before_email_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_email
                WHERE  $current_time < company_start_date";
                $before_email_resultdata = $this->webmodel->customSql($before_email_sql);

                $before_email_data = array(
                    'company_campaign_mode' => 'Finished',
                );
                $present_email_data = array(
                    'company_campaign_mode' => 'On going',
                );

                if($present_email_resultdata){
                    $present_email_count = count(array($present_email_resultdata));
                    //$present_email_count = 1;
                    for($i=0; $i<$present_email_count; $i++){
                        $email_userid = $present_email_resultdata[$i]->web_id;
                     $email_result = $this->webmodel->commonEDITWHERE('remco_company_email', $present_email_data, "`web_id`=" . $email_userid)              ; 
                    } 
                }

                if($before_email_resultdata){
                    $before_email_count = count($before_email_resultdata);
                    for($i=0; $i<$before_email_count; $i++){
                        $email_userid = $before_email_resultdata[$i]->web_id;
                    $email_result = $this->webmodel->commonEDITWHERE('remco_company_email', $before_email_data, "`web_id`=" . $email_userid); 
                    }
                }

                /*Learn&Earn state of events*/
                $present_learn_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_learn
                WHERE  $current_time between company_start_date and company_end_date";
                $present_learn_resultdata = $this->webmodel->customSql($present_learn_sql);

                $before_learn_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_learn
                WHERE  $current_time < company_start_date";
                $before_learn_resultdata = $this->webmodel->customSql($before_learn_sql);

                $before_learn_data = array(
                    'company_campaign_mode' => 'Finished',
                );
                $present_learn_data = array(
                    'company_campaign_mode' => 'On going',
                );
                if($present_learn_resultdata){
                    $present_learn_count = count($present_learn_resultdata);
                    //$present_learn_count = 1;
                
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

                /*Sweepstakes state of events*/
                $present_sweep_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_sweepstakes
                WHERE  $current_time between company_start_date and company_end_date";
                $present_sweep_resultdata = $this->webmodel->customSql($present_sweep_sql);
                //print_r($present_sweep_resultdata);
               
                $before_sweep_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_sweepstakes
                WHERE  $current_time < company_start_date";
                $before_sweep_resultdata = $this->webmodel->customSql($before_sweep_sql);
               
                $before_sweep_data = array(
                    'company_campaign_mode' => 'Finished',
                );
                $present_sweep_data = array(
                    'company_campaign_mode' => 'On going',
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

                /*Social comments state of events */
                $present_social_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_social_comments
                WHERE  $current_time between company_start_date and company_end_date";
                $present_social_resultdata = $this->webmodel->customSql($present_social_sql);
               // print_r($present_social_resultdata);
               
                $before_social_sql = "SELECT web_id,company_start_date,company_end_date FROM remco_company_social_comments
                WHERE  $current_time < company_start_date";
                $before_social_resultdata = $this->webmodel->customSql($before_social_sql);
                //print_r($before_social_resultdata);
               
                $before_social_data = array(
                    'company_campaign_mode' => 'Finished',
                );
                $present_social_data = array(
                    'company_campaign_mode' => 'On going',
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

}