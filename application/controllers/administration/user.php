<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

    public function index() {
        $data = $this->input->post();
        $password = md5(sha1($data['password']));
        $this->load->model('user_model','user');
        $user = $this->user->getUser($data['username'],$password);
        if(count($user) > 0){
            $this->session->set_userdata('user_id',$user->id);
            redirect('administration');
        }
        else
            $this->load->view('login');
    }
}

?>