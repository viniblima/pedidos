import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Opcoes } from '../../domain/opcoes/opcoes';
import { CardapioPage } from '../cardapio/cardapio';

@Component({
  selector: 'page-opcoes',
  templateUrl: 'opcoes.html',
})
export class OpcoesPage {
  public opcao: Opcoes[];
  constructor(
    public navCtrl: NavController,
    private _http: Http,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController) 
    {}

  ngOnInit(){
    if(sessionStorage.getItem("carrinho")==undefined){
      sessionStorage.setItem("carrinho", '[]');
    }
    let loader = this._loadingCtrl.create({
      content: "Carregando. Aguarde..."
    });
    loader.present();

    this._http
    .get('http://vservices.com.br/servicos/servicos/get_opcoes')
    .map(res => res.json())
    .toPromise()
    .then(opcoes => {
      this.opcao = opcoes;
      console.log(this.opcao);
      loader.dismiss();
    })
    .catch(err => {
      console.log(err);
      this._alertCtrl.create({
        title: "Falha na conexão",
        buttons: [{text: "OK"}],
        subTitle: "Não possível obter as opções. Tente novamente."
      }).present();
    });
    
  }
  seleciona(opcao){
    this.navCtrl.push(CardapioPage, {opcaoSelecionada: opcao});
  }
}
