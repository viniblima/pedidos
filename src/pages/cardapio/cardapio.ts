import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Opcoes } from '../../domain/opcoes/opcoes';
import { Http } from '@angular/http';
import { Cardapio } from '../../domain/cardapio/cardapio';
import { ProdutoPage } from '../produto/produto';

@Component({
  selector: 'page-cardapio',
  templateUrl: 'cardapio.html',
})
export class CardapioPage {

  public opcao: Opcoes;
  public cardapio: Cardapio[];
  public url;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _http: Http,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController ) 
    {
      
      this.opcao = this.navParams.get("opcaoSelecionada");
      console.log(this.opcao);
      this.url = 'http://vservices.com.br/servicos/servicos/get_cardapio/' + this.opcao.id;
    }
    ngOnInit(){
      let loader = this._loadingCtrl.create({
        content: "Carregando opções..."
      });
      loader.present();
  
      this._http
        .get(this.url)
        .map(res => res.json())
        .toPromise()
        .then(cardapios =>{
          this.cardapio = cardapios;
          loader.dismiss();
          console.log(this.cardapio);
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
  seleciona(cardapio){
    this.navCtrl.push(ProdutoPage, {cardapioSelecionado: cardapio});
  }
}
