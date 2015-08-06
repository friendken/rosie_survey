<?php
/**
 * Created by PhpStorm.
 * User: friendken
 * Date: 7/11/15
 * Time: 12:53 PM
 */

class Answers extends CI_Controller{

    public function __construct(){
        parent::__construct();
        $this->load->model('Answers_model','answers');
    }

    public function getNumOfAnswer(){
        $stock_holder = $this->answers->get_num_of_answer(1);
        $none_stock_holder = $this->answers->get_num_of_answer(2);
        echo json_encode(array('stockHolder' => $stock_holder,'noneStockHolder' => $none_stock_holder));
    }

    public function exportExcel($mode = null){
        if(!$mode)
            throw new ErrorException('question mode can be null');

        $this->load->library('csv_convert');
        $this->load->helper('download');
        $this->load->model('Answers_detail_model','answers_detail');
        $this->load->model('Question_pagination_model','pagination');
        $customer = $this->answers->get_array(array('question_mode_id' => $mode));
        $pagination = $this->pagination->get_array(array('mode_id' => $mode));
        $title = array();
        $export_data = array();
//        foreach($pagination as $key => $row){
//            $question_title = json_decode($row->value);
//            foreach($question_title as $index => $item){
//                array_push($title,'Question '.$item);
//            }
//        }

        foreach ($customer as $key => &$row){
            $answer = array();
            $answer['stt'] = $key + 1;
            $answer += $this->answers_detail->get_answer_detail(array('answer_id' => $row->id));
            array_push($export_data,$answer);
        }
        foreach ($export_data[0] as $key => $row) {
            array_push($title, $key);
        }
        $report_csv = $this->csv_convert->array_to_csv($export_data,$title);
        $date = date('Y-m-d H:i:s');
        force_download('export_'.$date.'.csv', $report_csv);

    }
}