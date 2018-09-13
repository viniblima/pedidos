import { Produto } from '../produto/produto';

export class Carrinho{
    constructor(
        public produtos: Produto[],
        public preco_total: string,
        public id: string,
        public nome: string
        
    ){}
}