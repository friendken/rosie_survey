<?php

Class Questions extends CI_Controller{
    
    public function __construct() {
        parent::__construct();
        $this->load->model('questions_model','questions');
        $this->load->model('question_detail_model','question_detail');
    }
    
    public function index(){
        
    }
    public function getQuestionGroup(){
        $this->load->model('question_group_model','question_group');
        $data = $this->question_group->get_all();
        echo json_encode(array('question_group' => $data));
    }
    public function createQuestionView(){
        $this->load->model('question_type_model','question_type');
        $question_type = $this->question_type->get_all();
        echo json_encode(array('question_type' => $question_type));
    }
    public function addQuestionMultiple(){
        $data = $this->input->json();
        $question_id = $this->questions->insert($data->question);
        $answers = array();
        
        for($i = 0; $i < count($data->answer->en); $i++){
            foreach($data->answer as $key => $row){
                $answers[$i][$key] = $row[$i];
            }
            $answers[$i]['question_type'] = $data->question->question_type;
            $answers[$i]['question_id'] = $question_id;
            $this->question_detail->insert($answers[$i]);
        }
        
        echo json_encode('ok');
    }
    
    public function addQuestionSingle(){
        $data = $this->input->json();
        $question_id = $this->questions->insert($data->question);
        echo json_encode($question_id);
    }
    public function addQuestionGroup(){
        $data = $this->input->json();
        $question_id = $this->questions->insert($data->question);
        $subQuestion = array();
        
        for($i = 0; $i < count($data->sub_question->en); $i++){
            foreach($data->sub_question as $key => $row){
                $subQuestion[$i][$key] = $row[$i];
            }
            $subQuestion[$i]['question_type'] = $data->question->question_type;
            $subQuestion[$i]['question_group_id'] = $data->question->question_group_id;
            $subQuestion[$i]['parent_id'] = $question_id;
            $this->questions->insert($subQuestion[$i]);
        }
        
        echo json_encode($subQuestion);
    }
    public function getQuestion(){
        $questions = $this->questions->get_array(array('parent_id' => '0'));
        echo json_encode(array('questions' =>$questions));
    }
}
