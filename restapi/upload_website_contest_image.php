<?php

header('Access-Control-Allow-Origin: *');
error_reporting(0);
//$filename = $_GET['filename']; print_r($_GET);
try {
	include("./image_manipulate/ImageManipulation.class.php");
//	$filename = $_FILES['image']['name'];
	$filename = $_REQUEST['filename'];
	$uploadFile = $_FILES['image']['tmp_name'];
	$category = $_REQUEST['category'];
	$image = new ImageManipulation();

	$width =  525;
	$height = 470;

	$image->ImageFrom($uploadFile);
	$image->ImageType(ImageManipulation::IMAGE_TYPE_JPG);
	$image->ImageManipulationAction(ImageManipulation::IMAGE_ACTION_FILL);
	$image->ImageQuality(100);
	$image->ImageResize($width, $height);
	$image->WorkSpaceColor(255,255,255);

	switch ($category) {
		case 'logo':
	        $image->Output("../uploads/contest/logo/" . $filename);
	        break;
	    case 'product':
	        $image->Output("../uploads/contest/product/" . $filename );
	        break;
	    case 'background':
	        $image->Output("../uploads/contest/background/" . $filename );
	        break;
	}
	$response['status'] = '200';
	$response['error']= 'Image uploaded successfully.';
	echo json_encode($response);
	exit;
}catch (Exception $e){
	$response['status'] = '500';
	$response['data'] = $e->getMessage();
	$response['error'] = 'Image can not be uploaded';
	echo json_encode($response);
	exit;
}

?> 