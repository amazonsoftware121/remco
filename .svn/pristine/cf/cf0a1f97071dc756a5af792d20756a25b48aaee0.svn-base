<?php namespace App\Controllers\Admin;

use App\Models\Webmodel;
use CodeIgniter\Controller;
use Symfony\Component\Config\Definition\Exception\Exception;

class Companies extends Controller
{

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
    }

    public function index()
    {
        echo 'Companies.!' . '<br>';
    }

    public function getAllCompanies(){
      if($_SERVER['REQUEST_METHOD'] == 'GET'){
        $result = $this->webmodel->commonLIST('remco_companies');
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

}
