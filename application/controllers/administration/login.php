<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

    public function index() {
        $this->load->view('login');
    }
    public function logout(){
        $this->session->unset_userdata('user_id');
        $this->load->helper('url');
        redirect('administration/login');
    }
}

?>