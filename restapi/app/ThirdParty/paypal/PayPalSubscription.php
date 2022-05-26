<?php
namespace PayPalSubscription;

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

    private $suspendSuffixURL='/v1/billing/subscriptions/{id}/suspend';

    private $activateSuffixURL='/v1/billing/subscriptions/{id}/activate';

    private $cancelSuffixURL='/v1/billing/subscriptions/{id}/cancel';

    private $getSuffixURL='/v1/billing/subscriptions/{id}';

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
            return json_decode($body,true);
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
            return json_decode($body,true);
        }
        else{
            $this->executionFailed=true;
            return "CURL Error 2; HTTP Return Code: ".$returnCode."; HTTP Response: ".print_r($return,true);
        }
    }

    public function SuspendSubscription($sId, $reason){
        $accessToken=$this->DoAuthorizeAndGetAccessToken();
        if($this->executionFailed){
            return $accessToken;
        }

        $array=array();

        $array=[];

        $dataFields=[
            'reason'=>$reason
        ];

        $dataFieldsJSON=json_encode($dataFields);
        //return $dataFieldsJSON;
        $this->suspendSuffixURL=str_replace('{id}',$sId,$this->suspendSuffixURL);
        $ch = curl_init($this->host.$this->suspendSuffixURL);
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
        if($returnCode==204){
            return json_decode($body,true);
        }
        else{
            $this->executionFailed=true;
            return "CURL Error 2; HTTP Return Code: ".$returnCode."; HTTP Response: ".print_r($return,true);
        }
    }

    public function ActivateSubscription($sId, $reason){
        $accessToken=$this->DoAuthorizeAndGetAccessToken();
        if($this->executionFailed){
            return $accessToken;
        }

        $array=array();

        $array=[];

        $dataFields=[
            'reason'=>$reason
        ];

        $dataFieldsJSON=json_encode($dataFields);
        //return $dataFieldsJSON;
        $this->activateSuffixURL=str_replace('{id}',$sId,$this->activateSuffixURL);
        $ch = curl_init($this->host.$this->activateSuffixURL);
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
        if($returnCode==204){
            return json_decode($body,true);
        }
        else{
            $this->executionFailed=true;
            return "CURL Error 2; HTTP Return Code: ".$returnCode."; HTTP Response: ".print_r($return,true);
        }
    }

    public function CancelSubscription($sId, $reason){
        $accessToken=$this->DoAuthorizeAndGetAccessToken();
        if($this->executionFailed){
            return $accessToken;
        }

        $array=array();

        $array=[];

        $dataFields=[
            'reason'=>$reason
        ];

        $dataFieldsJSON=json_encode($dataFields);
        //return $dataFieldsJSON;
        $this->cancelSuffixURL=str_replace('{id}',$sId,$this->cancelSuffixURL);
        $ch = curl_init($this->host.$this->cancelSuffixURL);
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
        if($returnCode==204){
            return json_decode($body,true);
        }
        else{
            $this->executionFailed=true;
            return "CURL Error 2; HTTP Return Code: ".$returnCode."; HTTP Response: ".print_r($return,true);
        }
    }

    public function GetSubscription($sId, $reason){
        $accessToken=$this->DoAuthorizeAndGetAccessToken();
        if($this->executionFailed){
            return $accessToken;
        }

        $array=array();

        $array=[];

        $dataFields=[
            'reason'=>$reason
        ];

        $dataFieldsJSON=json_encode($dataFields);
        //return $dataFieldsJSON;
        $this->cancelSuffixURL=str_replace('{id}',$sId,$this->cancelSuffixURL);
        $ch = curl_init($this->host.$this->cancelSuffixURL);
        curl_setopt($ch, CURLOPT_HTTPHEADER,
            [
                'Content-Type: application/json',
                'Authorization: Bearer '.$accessToken
            ]
        );
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
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
        if($returnCode==200){
            return json_decode($body,true);
        }
        else{
            $this->executionFailed=true;
            return "CURL Error 2; HTTP Return Code: ".$returnCode."; HTTP Response: ".print_r($return,true);
        }
    }
}
