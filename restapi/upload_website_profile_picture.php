<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: application/json");
header("X-XSS-Protection: 0");
header('X-Content-Type-Options: nosniff');
try {
	include("./image_manipulate/ImageManipulation.class.php");
//	$filename = $_FILES['image']['name'];
	$filename = $_REQUEST['filename'];
	$uploadFile = $_FILES['image']['tmp_name'];

	$image = new ImageManipulation();

	$width =  350;
	$height = 300;

	$image->ImageFrom($uploadFile);
	$image->ImageType(ImageManipulation::IMAGE_TYPE_JPG);
	$image->ImageManipulationAction(ImageManipulation::IMAGE_ACTION_FILL);
	$image->ImageQuality(100);
	$image->ImageResize($width, $height);
	$image->WorkSpaceColor(255,255,255);

	$image->Output("../uploads/Profile/" . $filename );

	$response['status'] = '200';
	$response['error']= 'Image uploaded successfully.';
	echo json_encode($response);
	exit;
} catch (Exception $e) {
	$response['status'] = '500';
	$response['data'] = $e->getMessage();
	$response['error'] = 'Image can not be uploaded';
	echo json_encode($response);
	exit;
}

?> 