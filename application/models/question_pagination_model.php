<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of question_pagination_model
 *
 * @author friendken
 */
class Question_pagination_model extends MY_model {
    protected $table_name = 'question_pagination';
    
    public function truncateTable(){
        $this->db->empty_table($this->table_name);
    }
}
