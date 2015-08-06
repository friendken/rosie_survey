<?php

class Answers_detail_model extends MY_model{
  
    protected $table_name = 'answers_detail';

    public function get_answer_detail($where){
        $detail = parent::get_array($where);
        $result = array();
        foreach($detail as $key => $row){
            $result['Question '.$row->question_id] = $row->value;
        }
        return $result;
    }
}
