<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {

    public function index() {
        $this->required_login();
        $this->load->view('main');
    }
    
    public function required_login(){
        $user_id = $this->session->userdata('user_id');
        if($user_id == '')
            redirect('administration/login');
    }
}
