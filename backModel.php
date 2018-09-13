<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class ServicosModel extends CI_Model
{
    function __construct()
    {
        parent::__construct();
    }

    function get_cardapio($id){
        $this->db->where('cardapio_id',$id);
        $query = $this->db->get('cardapio');
        if($query->num_rows() > 0){
            $data = $query->result();
            return $data;
        }else
             return array();
    }

    function get_opcoes(){
        
        $query = $this->db->get('opcoes');
        if($query->num_rows() > 0){
            $data = $query->result();
            return $data;
        }else
             return array();
    }

    function get_pergunta($id){
        $this->db->where('cardapio_id',$id);
        $query = $this->db->get('pergunta');
        if($query->num_rows() > 0){
            $data = $query->result();
            return $data;
        }else
             return array();
    }
    function get_resposta($id){
        $this->db->select();
        $this->db->where('pergunta_id',$id);
        $query = $this->db->get('resposta');
        if($query->num_rows() > 0){
            $data = $query->result();
            return $data;
        }else
             return array();
    }

    function get_numero_pedidos(){
        
        $query = $this->db->get('pedidos_caixa');
        if($query->num_rows() > 0){
            $data = $query->result();
            return $data;
        }else
             return array();
    }

}
?>