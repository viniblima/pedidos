import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Cardapio } from '../../domain/cardapio/cardapio';
import { Http } from '@angular/http';
import { Pedido } from '../../domain/pedido/pedido';
import { Carrinho } from '../../domain/carrinho/carrinho';
import { CarrinhoPage } from '../carrinho/carrinho';

@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {
  public cardapio: Cardapio;
  public url;
  public url2;
  public pergunta_base;
  public pergunta;
  public resposta;
  public pedido: Pedido;
  public pedidos: Cardapio[]=[];
  public observacao;
  constructor(
    public navCtrl: NavController,
    public _http: Http,
    public _http2: Http,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
    public navParams: NavParams) 
    {
      this.cardapio = this.navParams.get("cardapioSelecionado");
      
      console.log(this.cardapio);
      this.url = 'http://vservices.com.br/servicos/servicos/get_pergunta/' + this.cardapio.cardapio_id;
      

      this.pedidos = JSON.parse(sessionStorage.getItem("carrinho"));
      if(this.pedidos == null){
        this.pedidos = [];
        sessionStorage.setItem("carrinho",'[]');
      }

      console.log(sessionStorage.getItem("carrinho"));

    }
    ngOnInit(){
      let loader = this._loadingCtrl.create({
        content: "Carregando descrição..."
      });
      loader.present();
  
      this._http
        .get(this.url)
        .map(res => res.json())
        .toPromise()
        .then(pergunta =>{
          this.pergunta_base = pergunta;
          loader.dismiss();
          console.log(this.pergunta_base);
          this.pergunta = this.pergunta_base[0].pergunta;
          console.log(this.pergunta);
          //let url2 = 'http://vservices.com.br/servicos/servicos/get_resposta/'+this.pergunta_base[0].id;
          this.consultaResposta(this.pergunta_base[0].id);
          
        })
        .catch(err =>{
          console.log(err);
          this._alertCtrl
          .create({
            title: "Falha na conexão",
            buttons: [{ text: "OK"}],
            subTitle: "Não foi possivel obter a descrição. Tente novamente."
          }).present();
        });

        
    
    }
    consultaResposta(id){
      let loader2 = this._loadingCtrl.create({
        content: "Carregando descrição..."
      });
      loader2.present();
      this._http2
        .get('http://vservices.com.br/servicos/servicos/get_resposta/'+id)
        .map(res => res.json())
        .toPromise()
        .then(resposta =>{
          this.resposta = resposta;
          loader2.dismiss();
          console.log(this.resposta);
          
        })
        .catch(err =>{
          console.log(err);
          this._alertCtrl
          .create({
            title: "Falha na conexão",
            buttons: [{ text: "OK"}],
            subTitle: "Não foi possivel obter a descrição. Tente novamente."
          }).present();
        });
    }
    adicionaCarrinho(){
      this.cardapio.pergunta = this.pergunta;
      console.log(this.cardapio);
      if(sessionStorage.getItem("carrinho") == '[]'){
        console.log("carrinho vazio");
        this.pedidos[0] = this.cardapio;
        sessionStorage.setItem("carrinho",JSON.stringify(this.pedidos));
      }else{
        let arrayIndex = this.pedidos.length;
        this.pedidos[arrayIndex] = this.cardapio;
        sessionStorage.setItem('carrinho', JSON.stringify(this.pedidos));
      }
      let alert = this._alertCtrl.create({
        title: "Adicionado ao carrinho!",
        subTitle: "Falta pouco pra fazer seu pedido!",
        buttons: [{text: "OK"}]
      }).present();
      
    }
    goToCarrinho(){
      this.navCtrl.setRoot(CarrinhoPage);
    }

}
