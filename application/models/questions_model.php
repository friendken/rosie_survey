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
    public function get_by_mode($mode){
        $tmp = array(1 => 'paginated1',2 => 'paginated2');
        return $this->db->query("SELECT * FROM $this->table_name WHERE $tmp[$mode] = 0 AND (MODE = $mode OR MODE = 3)")
                        ->result();
    }
    public function update_where_in($where_id,$mode){
        return $this->db->where_in('id',$where_id)
                        ->update($this->table_name,array($mode => 1));
    }
    public function get_question_whereIn($questionIds){
        return $this->db->where_in('id',$questionIds)
                        ->get($this->table_name)
                        ->result();
    }
}
?>
