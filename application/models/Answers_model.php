<?php

class Answers_model extends MY_model{
    protected $table_name = 'answers';

    public function get_num_of_answer($question_mode){
        return $this->db->where('question_mode_id', $question_mode)
                        ->count_all_results($this->table_name);
    }
}
