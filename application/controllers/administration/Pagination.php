<?php
/**
 * Created by PhpStorm.
 * User: friendken
 * Date: 6/6/15
 * Time: 2:53 PM
 */

class Pagination extends CI_Controller{

    public function __construct(){
        parent::__construct();
        $this->load->model('Question_pagination_model','pagination');
    }

    public function getPagination($mode_id){
        $pagination = $this->pagination->get_array(array('mode_id' => $mode_id));
        $this->load->model('Questions_model','questions');
        $questions = $this->questions->get_all();
        foreach($pagination as $key => &$row){
            if(!$row->value)
                $row->value = array();
            $row->value = json_decode($row->value);
        }
        echo json_encode(array('pagination' => $pagination,'questions' => $questions));
    }
    public function updatePagination(){
        $request = $this->input->json();
        $this->load->model('Questions_model','questions');
        #clear mode in pagination table
        $this->pagination->delete(array('mode_id' => $request->mode));
        $tmp = array(1 => 'paginated1',2 => 'paginated2');
        #update new data for pagination table
        $i = 1;
        foreach($request->data as $key => $row){
            #update pagination
            $this->pagination->insert(array('mode_id' => $request->mode,
                                            'pagination' => $row->pagination,
                                            'value' => json_encode($row->value)));

            #update state of question
            if(count($row->value) > 0)
                $this->questions->update_where_in($row->value,$tmp[$request->mode]);

            #update order of question
            echo $i;
            foreach($row->value as $index => $item){
                $question = $this->questions->get_by_id($item);
                if($question->question_type != 9){
                    $this->questions->update(array($tmp[$request->mode].'_order' => $i),array('id' => $item));
                    $i++;
                }else
                    $this->questions->update(array($tmp[$request->mode].'_order' => ''),array('id' => $item));
            }
        }
        echo json_encode($request);
    }
    public function removeQuestionInPagination($question_id,$mode){
        $this->load->model('Questions_model','questions');
        $tmp = array(1 => 'paginated1',2 => 'paginated2');
        $this->questions->update(array($tmp[$mode] => 0),array('id' => $question_id));
    }
}