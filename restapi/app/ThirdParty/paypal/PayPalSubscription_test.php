<?php


class PayPalSubscription{
    private $host='';
    private $access_token='';

    private $executionFailed=false;

    private $clientID='';
    private $secretKey='';
    private $paymentMode='';

    private $accessTokenSuffixURL='/v1/oauth2/token';

    private $createProductSuffixURL='/v1/catalogs/products';
    private $listProductSuffixURL='/v1/catalogs/products';

    private $createPlanSuffixURL='/v1/billing/plans';

    public function __construct($clientID, $secretKey, $paymentMode){
        $this->clientID=$clientID;
        $this->secretKey=$secretKey;
        $this->paymentMode=$paymentMode;
        $this->host=($this->paymentMode=='sandbox')?'https://api.sandbox.paypal.com':'https://api.sandbox.paypal.com';
        $this->executionFailed=false;
    }

    public function __destruct(){

    }

    private function arrayToParamConstructor($input){
        $temp=[];
        foreach ($input as $k=>$v){
            $temp[]=$k.'='.$v;
        }
        return join('&',$temp);
    }

    private function DoAuthorizeAndGetAccessToken(){
        $dataFields=[
            'grant_type'=>'client_credentials'
        ];
        $dataFieldsJSON=$this->arrayToParamConstructor($dataFields);
        $ch = curl_init($this->host.$this->accessTokenSuffixURL);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_USERPWD, $this->clientID . ":" . $this->secretKey);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $dataFieldsJSON);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        $return = curl_exec($ch);
        if ($return === false) {
            $this->executionFailed=true;
            return "CURL Error 1: " . curl_error($ch);
        }
        $returnCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $header = substr($return, 0, $header_size);
        $body = substr($return, $header_size);
        curl_close($ch);
//        echo $returnCode;
//        echo '<br/>|<br/>'.print_r($body,true);
        if($returnCode==200){
            $dataReturn=json_decode($body,true);
            return $dataReturn["access_token"];
        }
        else{
            $this->executionFailed=true;
            return "CURL Error 1; HTTP Return Code: ".$returnCode."; HTTP Response: ".print_r($return,true);
        }
    }

    public function CreateProduct($productName,$productDescription,$productType,$productCategory){
        $accessToken=$this->DoAuthorizeAndGetAccessToken();
        if($this->executionFailed){
            return $accessToken;
        }

        $dataFields=[
            'name'=>$productName,
            'description'=>$productDescription,
            'type'=>$productType,
            'category'=>$productCategory,
        ];
        $dataFieldsJSON=json_encode($dataFields);
        $ch = curl_init($this->host.$this->createProductSuffixURL);
        curl_setopt($ch, CURLOPT_HTTPHEADER,
            [
                'Content-Type: application/json',
                'Authorization: Bearer '.$accessToken
            ]
        );
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $dataFieldsJSON);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        $return = curl_exec($ch);
        if ($return === false) {
            $this->executionFailed=true;
            return "CURL Error 2: " . curl_error($ch);
        }
        $returnCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $header = substr($return, 0, $header_size);
        $body = substr($return, $header_size);
        curl_close($ch);
        if($returnCode==201){
            return $body;
        }
        else{
            $this->executionFailed=true;
            return "CURL Error 2; HTTP Return Code: ".$returnCode."; HTTP Response: ".print_r($return,true);
        }
    }

    public function CreatePlan($planName,
                               $planDescription,
                               $productID,
                               $amount,
                               $currencyCode,
                               $intervalCount){
        $accessToken=$this->DoAuthorizeAndGetAccessToken();
        if($this->executionFailed){
            return $accessToken;
        }

        $array=array();

        $array=[];

        $dataFields=[
            'name'=>$planName,
            'description'=>$planDescription,
            'status'=> "ACTIVE",
            'usage_type'=>"LICENSED",
            'product_id'=>$productID,
            'billing_cycles'=>[
                [
                    "tenure_type"=>"REGULAR",
                    "total_cycles"=>12,
                    "sequence"=>1,
                    "frequency"=>[
                        "interval_unit"=>"DAY",
                        "interval_count"=>$intervalCount
                    ],
                    "pricing_scheme"=>[
                        "fixed_price"=>[
                            "value"=>$amount,
                            "currency_code"=>$currencyCode
                        ]
                    ]
                ]
            ],
            "payment_preferences"=>[
                "auto_bill_outstanding"=>true,
                "setup_fee"=>[
                    "value"=>"0",
                    "currency_code"=>$currencyCode
                ],
                "setup_fee_failure_action"=>"CANCEL",
                "payment_failure_threshold"=>300
            ],
            "taxes"=>[
                "percentage"=>0,
                "inclusive"=>false
            ]
        ];

        $dataFieldsJSON=json_encode($dataFields);
        //return $dataFieldsJSON;
        $ch = curl_init($this->host.$this->createPlanSuffixURL);
        curl_setopt($ch, CURLOPT_HTTPHEADER,
            [
                'Content-Type: application/json',
                'Authorization: Bearer '.$accessToken
            ]
        );
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $dataFieldsJSON);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        $return = curl_exec($ch);
        if ($return === false) {
            $this->executionFailed=true;
            return "CURL Error 2: " . curl_error($ch);
        }
        $returnCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $header = substr($return, 0, $header_size);
        $body = substr($return, $header_size);
        curl_close($ch);
        if($returnCode==201){
            return $body;
        }
        else{
            $this->executionFailed=true;
            return "CURL Error 2; HTTP Return Code: ".$returnCode."; HTTP Response: ".print_r($return,true);
        }
    }
}

$paypalSubscription=new PayPalSubscription('AbvkniAki8xip2cbZbtBPzt23J5vRqj3S32KV3nf-iOKS-sMFaz7PRzTVLSZY93MnBu-CEQ3OEwViDwb','EGtkDTByqLjwypzw4kk51NcrPmJNeFfShnfQ2SemZWUYOJtQ1waV6m1FD2DRxj9SE3ZEygAQ725GnTOe','sandbox');

//echo print_r($paypalSubscription->CreateProduct('Gold Special','Gold Plan','SERVICE','SOFTWARE'),true);

echo print_r($paypalSubscription->CreatePlan('Gold Subscription','This is Gold Plan','PROD-7349267267335030N','12.99','USD'),true);
