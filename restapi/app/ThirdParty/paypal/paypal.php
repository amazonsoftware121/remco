<?php
include "./vendor/autoload.php";

use PayPal\Api\ChargeModel;
use PayPal\Api\Currency;
use PayPal\Api\MerchantPreferences;
use PayPal\Api\PaymentDefinition;
use PayPal\Api\Plan;

$apiContext = new \PayPal\Rest\ApiContext(
    new \PayPal\Auth\OAuthTokenCredential(
        'AbvkniAki8xip2cbZbtBPzt23J5vRqj3S32KV3nf-iOKS-sMFaz7PRzTVLSZY93MnBu-CEQ3OEwViDwb',
        'EGtkDTByqLjwypzw4kk51NcrPmJNeFfShnfQ2SemZWUYOJtQ1waV6m1FD2DRxj9SE3ZEygAQ725GnTOe'
    )
);

$plan = new Plan();
$plan->setName('T-Shirt of the Month Club Plan')
    ->setDescription('Template creation.')
    ->setType('infinite');

$paymentDefinition = new PaymentDefinition();
$paymentDefinition->setName('Regular Payments')
    ->setType('REGULAR')
    ->setFrequency('Month')
    ->setFrequencyInterval("1")
    ->setCycles("0")
    ->setAmount(new Currency(array('value' => 1.99, 'currency' => 'USD')));

$chargeModel = new ChargeModel();

$chargeModel->setType('SHIPPING')
    ->setAmount(new Currency(array('value' => 0, 'currency' => 'USD')));

$paymentDefinition->setChargeModels(array($chargeModel));

$merchantPreferences = new MerchantPreferences();
$baseUrl = 'http://nskfix.com/dev/GDG/paypal/';

$merchantPreferences->setReturnUrl("$baseUrl/ApprovePayment.php")
    ->setCancelUrl("$baseUrl/FailedPayment.php")
    ->setAutoBillAmount("yes")
    ->setInitialFailAmountAction("CONTINUE")
    ->setMaxFailAttempts("0")
    ->setSetupFee(new Currency(array('value' => 1, 'currency' => 'USD')));

$plan->setPaymentDefinitions(array($paymentDefinition));
$plan->setMerchantPreferences($merchantPreferences);

$request = clone $plan;

// ### Create Plan
try {
    $output = $plan->create($apiContext);
} catch (Exception $ex) {
    // NOTE: PLEASE DO NOT USE RESULTPRINTER CLASS IN YOUR ORIGINAL CODE. FOR SAMPLE ONLY
    echo '<pre>';
    echo  print_r('----------------------');
    echo $ex->getCode(); // Prints the Error Code
    echo $ex->getData(); // Prints the detailed error message
    echo  print_r('----------------------');
    echo  print_r($ex->getMessage());
    echo '</pre>';
    exit(1);
}

// NOTE: PLEASE DO NOT USE RESULTPRINTER CLASS IN YOUR ORIGINAL CODE. FOR SAMPLE ONLY
echo '<pre>';
echo  print_r($output->getId());
echo  print_r('----------------------');
echo  print_r($output);
echo '</pre>';
