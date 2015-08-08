<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Survey extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Question_pagination_model', 'pagination');
        $this->load->model('Questions_model', 'questions');
        $this->load->model('Question_detail_model', 'question_detail');
    }

    public function getSurvey($mode, $pagination)
    {
        $pagination = $this->pagination->get_array(array('pagination' => $pagination, 'mode_id' => $mode));
        if (!$pagination) {
            echo json_encode(array('status' => 'error', 'message' => 'can not found any question'));
            die;
        }
        $pagination = json_decode($pagination[0]->value);
        $questions = array();
        foreach ($pagination as $key => $row) {
            $question = $this->getQuestionDetail($row);
            array_push($questions, $question);
        }
//        ($this->session->userdata('answer_id') != 'undefined')? $answer_id = $this->session->userdata('answer_id'): $answer_id = '';
//        ($this->session->userdata('pagination_current') != 'undefined')? $pagination_current = $this->session->userdata('pagination_current'): $pagination_current = 1;
        echo json_encode(array('question' => $questions));
    }

    public function getNumOfPage($mode_id){
        $number = $this->pagination->get_num_of_page($mode_id);
        ($this->session->userdata('answer_id'))? $answer_id = $this->session->userdata('answer_id'): $answer_id = '';
        ($this->session->userdata('pagination_current'))? $pagination_current = $this->session->userdata('pagination_current'): $pagination_current = 1;
        echo json_encode(array('lastPage' => $number,
                               'paginationCurrent' => $pagination_current,
                               'answer_id' => $answer_id));
    }

    public function saveAnswer($answer_id = null){
        $data = $this->input->json();
        $this->load->model('answers_model', 'answers');
        $this->load->model('answers_detail_model', 'answers_detail');
        try {
            if(!isset($answer_id))
                $answer_id = $this->answers->insert(array('question_mode_id' => $data->question_mode));

            foreach ($data->results as $key => $row) {
                $this->answers_detail->delete(array('answer_id' => $answer_id,'question_id' => $row->question_id));
                $row->answer_id = $answer_id;
                $this->answers_detail->insert($row);
            }
        } catch (Exception $exc) {
            echo json_encode(array('status' => 'success', 'message' => $exc->getMessage()));
        }
        $this->session->set_userdata(array('answer_id' => $answer_id,
                                           'pagination_current' => $data->paginationCurrent));
        if($data->paginationCurrent == 8){
            echo 'reset session';
            $this->session->unset_userdata('answer_id');
            $this->session->unset_userdata('pagination_current');
        }
        echo json_encode(array('status' => 'success','answer_id' => $answer_id));
    }

    public function getQuestionDetail($question_id)
    {
        $question = $this->questions->get_by_id($question_id);
        if(isset($question)){
            switch ($question->question_type) {
                case '1':
                    return $question;
                    break;
                case '2':
                    $question = $this->getQuestionGroup($question);
                    return $question;
                    break;
                case '3':
                case '5':
                case '6':
                case '7':
                case '8':
                    $question = $this->getQuestionMultiple($question);
                    return $question;
                    break;
                default:
                    $question = $this->getQuestionGroup($question);
                    return $question;
                    break;
            }
        }
    }

    public function getQuestionGroup($question)
    {
        $data = $this->questions->get_array(array('parent_id' => $question->id));
        $detail = array();
        $language = array('en', 'vn', 'ch');
        foreach ($data as $key => $row) {
            foreach ($language as $item => $value) {
                $detail[$value][] = array('question_detail_id' => $row->id, 'value' => $row->{$value});
            }
        }
        $question->question_detail = $detail;
        return $question;
    }

    public function getQuestionSpecial($question)
    {

    }

    public function getQuestionMultiple($question)
    {
        $question_detail = $this->question_detail->get_array(array('question_id' => $question->id));
        $detail = array();
        $language = array('en', 'vn', 'ch');
        foreach ($question_detail as $key => $row) {
            foreach ($language as $item => $value) {
                $detail[$value][] = array('question_detail_id' => $row->id, 'value' => $row->{$value});
            }
        }
        $question->question_detail = $detail;
        return $question;
    }
    public function resetSession(){
        $this->session->unset_userdata('answer_id');
        $this->session->unset_userdata('pagination_current');
        echo $this->session->userdata('answer_id');
        echo $this->session->userdata('pagination_current');
    }
}