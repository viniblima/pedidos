import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Produto } from '../../domain/produto/produto';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  public produtos: Produto[];
  public valor_total = 0;
  constructor(

  ){
    this.produtos = JSON.parse(sessionStorage.getItem("carrinho"));
    let arrayIndex = this.produtos.length;
    console.log(this.produtos);
    console.log(arrayIndex);
    for(let i=0;i<arrayIndex;i++){
      this.valor_total += parseFloat(this.produtos[i].preco);
    }
    console.log(this.valor_total);
  }
}
