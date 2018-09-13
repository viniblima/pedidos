import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Cardapio } from '../../domain/cardapio/cardapio';
import { OpcoesPage } from '../opcoes/opcoes';
import { Http } from '@angular/http';

@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {
  public carrinhos: Cardapio[];
  public carrinho: Cardapio;
  public valor_total = 0;
  public aviso;
  public teste;
  public data;
  public num;
  public aux;
  public arrayIndex;
  public http
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    http: Http,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController ) 
    {
      this.data = {};
      this.data.response = '';
      this.http = http;

      this.aviso = 'Carrinho';
      this.carrinhos = JSON.parse(sessionStorage.getItem("carrinho"));
      
      console.log(this.carrinho);
      
      this.arrayIndex = this.carrinhos.length;
      console.log(this.arrayIndex);
      
      for(let i =0; i<this.arrayIndex;i++){
        this.carrinho = this.carrinhos[i];
        this.valor_total += parseFloat(this.carrinhos[i].preco);
        
      }
    
    
    }
    ngOnInit(){
      let loader = this._loadingCtrl.create({
        content: "Carregando..."
      });
      loader.present();

      this.http
      .get('http://vservices.com.br/servicos/servicos/get_numero_pedidos')
      .map(res => res.json())
      .toPromise()
        .then(numero =>{
          this.num = numero;
          loader.dismiss();
          console.log(this.num+1);
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

    esvaziarCarrinho(){
      sessionStorage.setItem("carrinho",'[]');
      console.log(sessionStorage.getItem("carrinho"));

    }
    goToHome(){
      this.navCtrl.setRoot(OpcoesPage);
    }
    cadastrarPedido(){
      
      for(var i=0;i<this.arrayIndex;i++){
      var link = 'http://vservices.com.br/servicos/servicos/cadastrar_pedido_galera';
      var data = JSON.stringify({
        nome: this.carrinhos[i].nome,
        observacao: this.carrinhos[i].observacao,
        num_pedido: this.num+1
      });

      this.http.post(link, data)
        .subscribe( data =>{
          this.data.response = data._body;
          console.log(this.data.response);
          if(this.data.response == ' sucesso'){
            sessionStorage.setItem("carrinho", '[]');
            this.navCtrl.setRoot(OpcoesPage);
          }
        }, error =>{
          console.log("Ocorreu um erro!");
        });
      }
      
    }

    cadastrarId(){
      var link = 'http://vservices.com.br/servicos/servicos/cadastrar_pedido_caixa';
      var data = JSON.stringify({
        num_pedido: this.num+1
      });

      this.http.post(link, data)
        .subscribe( data =>{
          this.data.response = data._body;
          console.log(this.data.response);
          if(this.data.response == ' sucesso'){
            this.cadastrarPedido();
          }

        }, error =>{
          console.log("Ocorreu um erro!");
        });
    }
    fazerPedido(){
      let alert = this._alertCtrl.create({
        title: "Pedido efetuado!",
        subTitle: "Galera's Burguer agradece a preferência!",
        buttons: [{text: "OK"}]
      }).present();
      this.navCtrl.setRoot(OpcoesPage);
      sessionStorage.setItem("carrinho", "[]");
    }

  

}
