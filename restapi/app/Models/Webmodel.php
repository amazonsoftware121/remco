<?php namespace App\Models;

use CodeIgniter\Model;

class Webmodel extends Model
{
    function __construct()
    {
        parent ::__construct();
        $this->db =  \Config\Database::connect();
    }

    public function getAdminEmail(){
        return 'noreply-azolvur@constructionmarket.info';
    }

    public function removeEscape($str){
        return $this->db->escape($str);
    }

    public function removeEscapeLike($str){
        return $this->db->escapeLikeString($str);
    }

    public function commonLIST($table){
        //echo $builder->getCompiledSelect();
        $builder = $this->db->table($table);
        $builder->select('*');
        $query =  $builder->get();
        $queryResult  = $query->getResult();
        if(count($queryResult)>0){
            return $queryResult;
        }else{
            return false;
        }

    }

    public function commonVIEW($table, $id){
        $builder = $this->db->table($table);
        $builder->select('*');
        $builder->where('web_id', $id);

        //echo $builder->getCompiledSelect();
        $query =  $builder->get();
        $queryResult  = $query->getResult();
        if(count($queryResult)>0){
            return $queryResult;
        }else{
            return false;
        }
    }

    public function commonLISTWHERE($table,$where, $needEscape=true){
        $builder = $this->db->table($table);
        $builder->select('*');
        if(!$needEscape){
            $builder->where($where);
        }else{
            $builder->where($this->db->escape($where));
        }

      //echo $builder->getCompiledSelect();

      $query =  $builder->get();

        $queryResult  = $query->getResult();
        if(count($queryResult)>0){
            return $queryResult;
        }else{
            return false;
        }
    }

    function generateRandomPassword($length = 9, $add_dashes = false, $available_sets = 'luds')
    {
        $sets = array();
        if(strpos($available_sets, 'l') !== false)
            $sets[] = 'abcdefghjkmnpqrstuvwxyz';
        if(strpos($available_sets, 'u') !== false)
            $sets[] = 'ABCDEFGHJKMNPQRSTUVWXYZ';
        if(strpos($available_sets, 'd') !== false)
            $sets[] = '23456789';
        if(strpos($available_sets, 's') !== false)
            $sets[] = '!@#$%&*?';

        $all = '';
        $password = '';
        foreach($sets as $set)
        {
            $password .= $set[array_rand(str_split($set))];
            $all .= $set;
        }

        $all = str_split($all);
        for($i = 0; $i < $length - count($sets); $i++)
            $password .= $all[array_rand($all)];

        $password = str_shuffle($password);

        if(!$add_dashes)
            return $password;

        $dash_len = floor(sqrt($length));
        $dash_str = '';
        while(strlen($password) > $dash_len)
        {
            $dash_str .= substr($password, 0, $dash_len) . '-';
            $password = substr($password, $dash_len);
        }
        $dash_str .= $password;
        return $dash_str;
    }


    public function commonADD($table, $data){
        $builder = $this->db->table($table);
        $builder->insert($data);
        try{
            return $this->db->insertID();
        }catch (\Exception $e){
            return false;
        }
    }

    public function commonEDIT($table, $data, $id){
        $builder = $this->db->table($table);
        try{
            $builder->update($data, ["web_id" => $id]);
            $builder->set($data)->getCompiledInsert($table);
            return  true;
        }catch (\Exception $e){
            return false;
        }
    }

    public function commonEDITWHERE($table, $data, $where){
        $builder = $this->db->table($table);
        // $where = $this->db->escape($where);
        try{
        $builder->update($data, $where);
            return true;
        }catch (\Exception $e){
            return false;
        }
    }

    // public function commonEDITWHERETest($table, $data, $where){
    //     $builder = $this->db->table($table);
    //     $where = $this->db->escape($where);
    //     try{
    //     $query=$builder->update($data, $where);
    //         print_r($query);
    //     }catch (\Exception $e){
    //         return false;
    //     }
    // }

    // public function commonDELETE($table, $where){
    //     $builder = $this->db->table($table);
    //     try{
    //         $builder->delete($this->db->escape($where));
    //     return true;
    //     }catch (\Exception $e){
    //         return false;
    //     }
    // }

    public function commonDELETE($table, $where){
        $builder = $this->db->table($table);
        try{
            $builder->delete($where);
        return true;
        }catch (\Exception $e){
            return false;
        }
    }


    public function customSql($sql){
        $builder = $this->db->query($sql);
        $query =  $builder;
        $queryResult  = $query->getResult();
        if(count($queryResult)>0){
            return $queryResult;
        }else{
            return false;
        }
    }

    public function customSqlOther($sql){
        $builder = $this->db2->query($sql);
        $query =  $builder;
        $queryResult  = $query->getResult();
        if(count($queryResult)>0){
            return $queryResult;
        }else{
            return false;
        }
    }

    public function customSql1($sql){
        $builder = $this->db->query($sql);
        $query =  $builder;
        $queryResult  = $query;
        if($queryResult){
            return $queryResult;
        }else{
            return false;
        }
    }

    public function universalSelect($data, $where=''){

        $builder = $this->db->table($data['from']);
        $builder->select($data['select']);
        foreach ($data['join'] as $join){
            $builder->join($join['table'], $join['condition'], 'left');
        }
        if($where!=''){
            $builder->where($this->db->escape($where));
        }

        $query =  $builder->get();
        $queryResult  = $query->getResult();
        if(count($queryResult)>0){
            return $queryResult;
        }else{
            return false;
        }

    }

    public function sendEmail($data){
        try{
            $email = \Config\Services::email();
            $email->setFrom($data['From'], $data['Clientname']);
            $email->setTo($data['To']);
            $email->setSubject($data['Subject']);
            $email->setMessage($data['Message']);//your message here
            $email->setMailType('html');
//            $email->charset('iso-8859-1');
            if($data['Cc']!=''){
                $email->setCC($data['']);//CC
            }
            $email->send();
            return true;
        }catch (Exception $e){
            return false;
        }
    }
    public function sendEmailAttahement($data){
        try{
            $email = \Config\Services::email();
            $email->setFrom($data['From'], $data['Clientname']);
            $email->setTo($data['To']);
            $email->setSubject($data['Subject']);
            $email->setMessage($data['Message']);//your message here
            $email->setMailType('html');
            $email->attach($data['attachement']);
            // $email->attach($data['attachement1']);
//            $email->charset('iso-8859-1');
            if($data['Cc']!=''){
                $email->setCC($data['']);//CC
            }
            $email->send();
            return true;
        }catch (Exception $e){
            return false;
        }
    }


    public function commonThrow($code = 400, $error="Data not found.", $data=null){
        $response['status'] = $code;
        $response['data'] = $data;
        $response['error'] = $error;
        echo json_encode($response);
        exit;
    }

}
