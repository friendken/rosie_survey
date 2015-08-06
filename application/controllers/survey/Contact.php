<?php
/**
 * Created by PhpStorm.
 * User: friendken
 * Date: 6/18/15
 * Time: 11:00 PM
 */

class Contact extends CI_Controller{

    public function __construct(){
        parent::__construct();
        $this->load->model('Contact_model','contacts');
    }

    public function sendMessage(){
        $message = $this->input->json();
        $message_id = $this->contacts->insert($message);
        echo json_encode($message_id);
    }

    public function getMessages(){
        $messages = $this->contacts->get_all();
        echo json_encode(array('messages' => $messages));
    }

    public function getMessage($message_id){
        $message = $this->contacts->get_by_id($message_id);
        $this->contacts->update(array('read' => 1),array('id' => $message_id));
        echo json_encode(array('message' => $message));
    }

    public function getMessageUnread(){
        $messages = $this->contacts->get_array(array('read' => 0));
        echo json_encode(array('messages' => $messages));
    }
}