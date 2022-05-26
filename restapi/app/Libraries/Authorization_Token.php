<?php

use App\Models\Webmodel;
use CodeIgniter\HTTP\RequestInterface;

/**
 *   Authorization_Token
 * -------------------------------------------------------------------
 * API Token Check and Generate
 *
 * @author: Jeevan Lal
 * @version: 0.0.5
 */

require_once APPPATH . 'ThirdParty/php-jwt/JWT.php';
require_once APPPATH . 'ThirdParty/php-jwt/BeforeValidException.php';
require_once APPPATH . 'ThirdParty/php-jwt/ExpiredException.php';
require_once APPPATH . 'ThirdParty/php-jwt/SignatureInvalidException.php';

use \Firebase\JWT\JWT;

class Authorization_Token
{
    /**
     * Token Key
     */
    protected $token_key;

    /**
     * Token algorithm
     */
    protected $token_algorithm;

    /**
     * Request Header Name
     */
    protected $token_header = ['authorization', 'Authorization'];

    /**
     * Token Expire Time
     * ----------------------
     * ( 1 Day ) : 60 * 60 * 24 = 86400
     * ( 1 Hour ) : 60 * 60     = 3600
     */
    protected $token_expire_time = 864000;

    private $webmodel;


    public function __construct()
    {
        $request = \Config\Services::request();
        $this->request = $request;
        $this->token_key = 'NLf{8\{]Utc2(j#2';
        $this->token_algorithm = 'HS256';

        $this->webmodel = new Webmodel();

    }

    /**
     * Generate Token
     * @param: user data
     * @return bool
     */
    public function generateToken($data)
    {
        try {
            return JWT::encode($data, $this->token_key, $this->token_algorithm);
        }
        catch(Exception $e) {
            return 'Message: ' .$e->getMessage();
        }
    }

    public function decodeToken($token)
    {
        try {
            $decode = JWT::decode($token, $this->token_key, array($this->token_algorithm));
            return ['status' => '200', 'data' => $decode ];
        }
        catch(Exception $e) {
            return ['status' => '500', 'data' => $e->getMessage() ];
        }
    }

    /**
     * Validate Token with Header
     *
     */
    public function validateToken($flag=false)
    {
        /**
         * Request All Headers
         */
        $headers =  $this->request->getHeaders();

        /**
         * Authorization Header Exists
         */
        $token_data = $this->tokenIsExist($headers);
        if($token_data['status'] === TRUE)
        {
            try
            {
                $request = \Config\Services::request();

                // getServer('HTTP_AUTHORIZATION').replace("Bearer","");

                $removeBearer = $request->getServer('HTTP_AUTHORIZATION');

                $splite = explode(" ", $removeBearer);

                $authenticationHeader = $splite[1];

                try {
                    $token_decode = JWT::decode($authenticationHeader, $this->token_key, array($this->token_algorithm));
                }
                catch(Exception $e) {
                    //return ['status' => 100, 'message' => $e->getMessage()];
                    $this->webmodel->commonThrow('authentication_error', 'Not authorized, login again!');

                }

                if(!empty($token_decode) AND is_object($token_decode))
                {
                    // Check User ID (exists and numeric)
                    if(empty($token_decode->data->id) OR !is_numeric($token_decode->data->id))
                    {
//                        return ['status' => 300, 'message' => 'User ID Not Define!'];
                        $this->webmodel->commonThrow('authentication_error', 'User ID Not Define!');
                        // Check Token Time
                    }else if(empty($token_decode->iat OR !is_numeric($token_decode->iat))) {

                        $this->webmodel->commonThrow('authentication_error', 'Token Time Not Define!');
                        //return ['status' => 400, 'message' => 'Token Time Not Define!'];
                    }
                    else
                    {
                        /**
                         * Check Token Time Valid
                         */
                        $time_difference = time() - $token_decode->exp;
                        if( $time_difference >= $this->token_expire_time )
                        {
                            $this->webmodel->commonThrow('authentication_error', 'Token Time Expire.');
                            //return ['status' => 500, 'message' => 'Token Time Expire.'];

                        }else
                        {

                            if(!$flag) {

                                $result = $this->webmodel->commonVIEW('parking_user', $token_decode->data->id);
                                if (!$result) {
                                    return ['status' => 'authentication_error', 'message' => 'Not authorized!'];
                                }
                            } else {

                                $where = "`user_name`='" . $token_decode->data->user_name ."'";
                                $result = $this->webmodel->commonLISTWHERE('parking_admin', $where);
                                if (!$result) {
                                    return ['status' => 'authentication_error', 'message' => 'Not authorized!'];
                                }
                            }
                            /**
                             * All Validation False Return Data
                             */
                            return ['status' => TRUE, 'data' => $token_decode];
                        }
                    }

                }else{
//                    return ['status' => FALSE, 'message' => 'Forbidden'];
                    return ['status' => 'authentication_error', 'message' => 'Not authorized!'];

                }
            }
            catch(Exception $e) {
//                return ['status' => FALSE, 'message' => $e->getMessage()];
                return ['status' => 'authentication_error', 'message' => 'Not authorized!'];

            }
        }else
        {
            // Authorization Header Not Found!
            return ['status' => 'authentication_error', 'message' => 'Not authorized!'];

//            return ['status' => FALSE, 'message' => $token_data['message'] ];
        }
    }

    /**
     * Validate Token with POST Request
     */
    public function validateTokenPost()
    {
        if(isset($_POST['token']))
        {
            $token = $this->CI->input->post('token', TRUE);
            if(!empty($token) AND is_string($token) AND !is_array($token))
            {
                try
                {
                    /**
                     * Token Decode
                     */
                    try {
                        $token_decode = JWT::decode($token, $this->token_key, array($this->token_algorithm));
                    }
                    catch(Exception $e) {
                        return ['status' => FALSE, 'message' => $e->getMessage()];
                    }

                    if(!empty($token_decode) AND is_object($token_decode))
                    {
                        // Check User ID (exists and numeric)
                        if(empty($token_decode->id) OR !is_numeric($token_decode->id))
                        {
                            return ['status' => FALSE, 'message' => 'User ID Not Define!'];

                            // Check Token Time
                        }else if(empty($token_decode->time OR !is_numeric($token_decode->time))) {

                            return ['status' => FALSE, 'message' => 'Token Time Not Define!'];
                        }
                        else
                        {
                            /**
                             * Check Token Time Valid
                             */
                            $time_difference = strtotime('now') - $token_decode->time;
                            if( $time_difference >= $this->token_expire_time )
                            {
                                return ['status' => FALSE, 'message' => 'Token Time Expire.'];

                            }else
                            {
                                /**
                                 * All Validation False Return Data
                                 */
                                return ['status' => TRUE, 'data' => $token_decode];
                            }
                        }

                    }else{
                        return ['status' => FALSE, 'message' => 'Forbidden'];
                    }
                }
                catch(Exception $e) {
                    return ['status' => FALSE, 'message' => $e->getMessage()];
                }
            }else
            {
                return ['status' => FALSE, 'message' => 'Token is not defined.' ];
            }
        } else {
            return ['status' => FALSE, 'message' => 'Token is not defined.'];
        }
    }

    /**
     * Token Header Check
     * @param: request headers
     * @return  bool
     */
    public function tokenIsExist($headers)
    {
        if(!empty($headers) AND is_array($headers)) {
            foreach ($this->token_header as $key) {
                if (array_key_exists($key, $headers) AND !empty($key))
                    return ['status' => TRUE, 'key' => $key];
            }
        }
        return ['status' => FALSE, 'message' => 'Token is not defined.'];
    }

    /**
     * Fetch User Data
     * -----------------
     * @param: token
     * @return: user_data
     */
    public function userData()
    {
        /**
         * Request All Headers
         */
        $headers =  $this->request->getHeaders();

        /**
         * Authorization Header Exists
         */
        $token_data = $this->tokenIsExist($headers);
        if($token_data['status'] === TRUE)
        {
            try
            {
                /**
                 * Token Decode
                 */


                try {
                    $token_decode = JWT::decode($headers[$token_data['key']], $this->token_key, array($this->token_algorithm));
                }
                catch(Exception $e) {
                    return ['status' => '100', 'message' => $e->getMessage()];
                }

                if(!empty($token_decode) AND is_object($token_decode))
                {
                    return $token_decode;
                }else{
                    return ['status' => '300', 'message' => 'Forbidden'];
                }
            }
            catch(Exception $e) {
                return ['status' => '400', 'message' => $e->getMessage()];
            }
        }else
        {
            // Authorization Header Not Found!
            return ['status' => '500', 'message' => $token_data['message'] ];
        }
    }

    // public function decodeToken($jwt, $secret, $algorithm){
    //     try{
    //         $decoded = JWT::decode($jwt, $secret, array($algorithm));
    //         // Authentication success
    //         // we moved proceed further
    //     }
    //     catch(\Exception $ex){
    //         http_response_code(401);
    //         header('Content-Type: application/json');
    //         $data_insert=array(
    //             "status" => "authentication_error",
    //             "message" => $ex->getMessage()
    //         );
    //         echo json_encode($data_insert);
    //         die();
    //     }
    // }
}