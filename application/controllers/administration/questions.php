<?php

Class Questions extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('questions_model', 'questions');
        $this->load->model('question_detail_model', 'question_detail');
    }

    public function index() {
        
    }
    public function updatePagination(){
        $data = $this->input->json();
        $this->load->model('question_pagination_model','question_pagination');
        $this->question_pagination->truncateTable();
        foreach ($data as $key => $row){
            $this->question_pagination->insert($row);
        }
        echo json_encode($data);
    }
    public function getQuestionDetail($question_id) {
        $question = $this->questions->get_by_id($question_id);

        switch ($question->question_type) {
            case '1':
                echo json_encode(array('question' => $question));
                break;
            case '2':
                $this->getQuestionGroup($question);
                break;
            case '3':
            case '5':
                $this->getQuestionMultiple($question);
                break;
            default:
                echo json_encode(array('question' => $question));
                break;
        }
    }
    
    public function getQuestionGroup($question){
        $data = $this->questions->get_array(array('parent_id' => $question->id));
        $detail = array();
        $language = array('en','vn','ch');
        foreach ($data as $key => $row) {
            foreach($language as $item => $value){
                $detail[$value][] = array('question_detail_id' => $row->id,'value' => $row->{$value});
            }
        }
        $question->question_detail = $detail;
        echo json_encode(array('question' => $question));
    }
    
    public function getQuestionMultiple($question) {
        $question_detail = $this->question_detail->get_array(array('question_id' => $question->id));
        $detail = array();
        $language = array('en','vn','ch');
        foreach ($question_detail as $key => $row) {
            foreach($language as $item => $value){
                $detail[$value][] = array('question_detail_id' => $row->id,'value' => $row->{$value});
            }
        }
        $question->question_detail = $detail;
        echo json_encode(array('question' => $question));
    }

    public function getGroup() {
        $this->load->model('question_group_model', 'question_group');
        $data = $this->question_group->get_all();
        echo json_encode(array('question_group' => $data));
    }

    public function createQuestionView() {
        $this->load->model('question_type_model', 'question_type');
        $question_type = $this->question_type->get_all();
        echo json_encode(array('question_type' => $question_type));
    }

    public function addQuestionMultiple() {
        $data = $this->input->json();
        $order = $this->questions->getTheLastOrder();
        $data->question->order = (int)$order->order_number + 1;
        $question_id = $this->questions->insert($data->question);
        $answers = array();

        for ($i = 0; $i < count($data->answer->en); $i++) {
            foreach ($data->answer as $key => $row) {
                $answers[$i][$key] = $row[$i];
            }
            $answers[$i]['question_type'] = $data->question->question_type;
            $answers[$i]['question_id'] = $question_id;
            $this->question_detail->insert($answers[$i]);
        }

        echo json_encode('ok');
    }
    
    public function editQuestionMultiple(){
        $data = $this->input->json();
        $this->questions->update($data->question,array('id' => $data->question->id));
        $this->question_detail->delete(array('question_id' => $data->question->id));
        
        $answers = array();

        for ($i = 0; $i < count($data->answer->en); $i++) {
            foreach ($data->answer as $key => $row) {
                $answers[$i][$key] = $row[$i];
            }
            $answers[$i]['question_type'] = $data->question->question_type;
            $answers[$i]['question_id'] = $data->question->id;
            $this->question_detail->insert($answers[$i]);
        }

        echo json_encode('ok');
    }

    public function addQuestionSingle() {
        $data = $this->input->json();
        $order = $this->questions->getTheLastOrder();
        $data->question->order = (int)$order->order_number + 1;
        if(isset($data->question->id)){
            $this->questions->update($data->question,array('id' => $data->question->id));
        }else
            $question_id = $this->questions->insert($data->question);
        echo json_encode('success');
    }
    public function addQuestionSpecial(){
        $data = $this->input->json();
        $order = $this->questions->getTheLastOrder();
        $data->question->order = (int)$order->order_number + 1;
        preg_match_all('/answer_checkbox_\d/i',$data->question->en, $matches);
        
        $quantity = count($matches[0]) / 2;
        
        $question_id = $this->questions->insert($data->question);
        for ($i = 0; $i < $quantity;$i++){
            $this->questions->insert(array('en' => 'checkbox','vn' => 'checkbox','ch' => 'checkbox',
                                          'parent_id' => $question_id,
                                          'question_group_id' => $data->question->question_group_id,
                                          'order' => $order->order_number,
                                          'question_type' => $data->question->question_type));
        }
        echo json_encode($data);
    }
    public function addQuestionGroup() {
        $data = $this->input->json();
        $order = $this->questions->getTheLastOrder();
        $data->question->order = (int)$order->order_number + 1;
        $question_id = $this->questions->insert($data->question);
        $subQuestion = array();

        for ($i = 0; $i < count($data->sub_question->en); $i++) {
            foreach ($data->sub_question as $key => $row) {
                $subQuestion[$i][$key] = $row[$i];
            }
            $subQuestion[$i]['question_type'] = $data->question->question_type;
            $subQuestion[$i]['question_group_id'] = $data->question->question_group_id;
            $subQuestion[$i]['parent_id'] = $question_id;
            $this->questions->insert($subQuestion[$i]);
        }

        echo json_encode($subQuestion);
    }
    public function editQuestionGroup(){
        $data = $this->input->json();
        $this->questions->update($data->question,array('id' => $data->question->id));
        $this->questions->delete(array('parent_id' => $data->question->id));
        $subQuestion = array();

        for ($i = 0; $i < count($data->sub_question->en); $i++) {
            foreach ($data->sub_question as $key => $row) {
                $subQuestion[$i][$key] = $row[$i];
            }
            $subQuestion[$i]['question_type'] = $data->question->question_type;
            $subQuestion[$i]['question_group_id'] = $data->question->question_group_id;
            $subQuestion[$i]['parent_id'] = $data->question->id;
            $this->questions->insert($subQuestion[$i]);
        }

        echo json_encode($subQuestion);
    }
    public function updateOrder(){
        $data = $this->input->json();
        foreach ($data as $key => $row){
            $this->questions->update(array('order' => $row->order),array('id' => $row->questionId));
        }
        echo json_encode('success');
    }
    public function getQuestion() {
        $questions = $this->questions->getQuestionOrder();
        $this->load->model('question_pagination_model','question_pagination');
        $data = $this->question_pagination->get_all();
        $pagination = array();
        foreach ($data as $key => $row){
            $pagination[$row->order_id] = $row->pagination;
        }
        echo json_encode(array('questions' => $questions,'pagination' => $pagination));
    }

}
