<?php

Class Questions extends CI_Controller{
    
    public function __construct() {
        parent::__construct();
        $this->load->model('questions_model');
    }
    
    public function index(){
        
    }
    
    public function createQuestionView(){
        $this->load->model('question_type_model','question_type');
        $question_type = $this->question_type->get_all();
        echo json_encode(array('question_type' => $question_type));
    }
    public function addNewQuestion(){
        $data = $this->input->json();
        echo json_encode($data);
    }
}
