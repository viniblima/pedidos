import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Produto } from '../../domain/produto/produto';
import { Carrinho } from '../../domain/carrinho/carrinho';

@Component({
  selector: 'page-descricao',
  templateUrl: 'descricao.html',
})
export class DescricaoPage {
  public produto: Produto;
  public produtos: Produto[]=[];
  public carrinho: Carrinho;
  public count;
  public i;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) 
    {
      this.produto = this.navParams.get("descricaoProduto");
      console.log(sessionStorage.getItem("carrinho"));
      this.produtos = JSON.parse(sessionStorage.getItem("carrinho"));
      if(this.produtos == null){
        this.produtos = [];
      }
      //
    }
    adicionaCarrinho(){
      
      if(sessionStorage.getItem("carrinho") == '[]'){
        console.log("carrinho vazio");
        this.produtos[0] = this.produto;

        sessionStorage.setItem("carrinho",JSON.stringify(this.produtos));
      }else{
        let arrayIndex = this.produtos.length;
        this.produtos[arrayIndex] = this.produto;
        sessionStorage.setItem('carrinho', JSON.stringify(this.produtos));
      }
    }
    
    esvaziarCarrinho(){
      sessionStorage.setItem("carrinho",'[]');
      console.log(sessionStorage.getItem("carrinho"));

    }

}
