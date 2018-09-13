<?php


defined('BASEPATH') OR exit('No direct script access allowed');

    class Servicos extends CI_Controller {
        function __construct()
        {
            parent::__construct();

            // carrega o model RestauranteModel e da um Alias de restaurante
            $this->load->model('ServicosModel', 'servicos', TRUE);
            $this->load->helper('url');
        }
public function get_cardapio($id){
		$cardapios = $this->servicos->get_cardapio($id);
		$response = array();
		foreach($cardapios as $res){
			$cardapio = array();
			$cardapio["id"] = $res->id;
            $cardapio["nome"] = $res->nome;
            $cardapio["descricao"] = $res->descricao;
            $cardapio["imgurl"] = $res->imgurl;
            $cardapio["cardapio_id"] = $res->cardapio_id;
            $cardapio["preco"] = $res->preco;
			array_push($response,$cardapio);
		}
		echo json_encode($response);
    }

    public function cadastrar_pedido_caixa(){
        $msg = "";
        $request = array();
        $json = file_get_contents('php://input');
        $request = json_decode($json, true);
        $num = '';

        if(!empty($request)){
            foreach($request as $key => $val){
                if($key == "id"){
                    $nome = $val;
                }else{
                    $msg = "Valor inválido";
                }
            }

            $dados = array(
                    
                'id' => $num,
                'status' => 'Aberto'
            );

            if($this->db->insert('pedidos_caixa',$dados)){
                $msg = "sucesso";
            }else{
                $msg = "Ocorreu algum erro";
            }
        }else{
            $msg = "Erro ao enviar dados";
        }
        echo $msg;
    }

    public function get_opcoes(){
        $opcoes = $this->servicos->get_opcoes();
           
            $response = array();
           
            foreach($opcoes as $res){
                
                $opcoes = array();
                $opcoes["id"] = $res->id;
                $opcoes["nome"] = $res->nome;
                $opcoes["imgurl"] = $res->img_url;
                array_push($response, $opcoes);
            }
            
            echo json_encode($response);
    }
    public function get_pergunta($id){
		$perguntas = $this->servicos->get_pergunta($id);
		$response = array();
		foreach($perguntas as $res){
			$pergunta = array();
			$pergunta["id"] = $res->id;
            $pergunta["cardapio_id"] = $res->cardapio_id;
            $pergunta["pergunta"] = $res->pergunta;
			array_push($response,$pergunta);
		}
		echo json_encode($response);
    }

    public function get_resposta($id){
		$respostas = $this->servicos->get_resposta($id);
		$response = array();
		foreach($respostas as $res){
			$resposta = array();
			$resposta["id"] = $res->id;
            $resposta["pergunta_id"] = $res->pergunta_id;
            $resposta["resposta"] = $res->resposta;
			array_push($response,$resposta);
		}
		echo json_encode($response);
    }

}
?>