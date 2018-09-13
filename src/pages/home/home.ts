import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Produto } from '../../domain/produto/produto';
import { Http } from '@angular/http';
import { DescricaoPage } from '../descricao/descricao';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public produtos: Produto[];
  public carrinho;
  public teste;
  constructor(
    public navCtrl: NavController,
    private _http: Http) {
      this.carrinho = {};
  }
  ngOnInit(){
    this._http.get('http://vservices.com.br/servicos/servicos/get_teste')
    .map(res => res.json())
    .toPromise()
    .then(produtos =>{
      this.produtos = produtos;
    })
    .catch(err =>{
      console.log(err)
    });
  }
  
  descricao(produtos){
    this.navCtrl.push(DescricaoPage, {descricaoProduto: produtos});
  }
}
