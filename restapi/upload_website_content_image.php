<?php

header('Access-Control-Allow-Origin: *');
error_reporting(0);
//$filename = $_GET['filename']; print_r($_GET);
try {
	include("./image_manipulate/ImageManipulation.class.php");
//	$filename = $_FILES['image']['name'];
	$filename = $_REQUEST['filename'];
	$uploadFile = $_FILES['image']['tmp_name'];

	$image = new ImageManipulation();

	$width =  652;
	$height = 538;

	$image->ImageFrom($uploadFile);
	$image->ImageType(ImageManipulation::IMAGE_TYPE_JPG);
	$image->ImageManipulationAction(ImageManipulation::IMAGE_ACTION_FILL);
	$image->ImageQuality(100);
	$image->ImageResize($width, $height);
	$image->WorkSpaceColor(255,255,255);

	$image->Output("../uploads/content_image/" . $filename );

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