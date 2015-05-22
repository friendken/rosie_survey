<?php

Class Questions_model extends MY_model{
    
    protected $table_name = 'questions';
    
    public function getQuestionOrder(){
        return $this->db->where('parent_id',0)
                        ->order_by('order')
                        ->get($this->table_name)
                        ->result();
    }
    public function getTheLastOrder(){
        return $this->db->select_max('order','order_number')
                        ->get($this->table_name)
                        ->row();
    }
}
?>
