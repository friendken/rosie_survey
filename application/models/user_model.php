<?php

Class User_model extends MY_model{
    
    protected $table_name = 'users';
    
    public function getUser($username,$password){
        return $this->db->where('username', $username)
                        ->where('password', $password)
                        ->get($this->table_name)
                        ->row();
    }
}
?>
