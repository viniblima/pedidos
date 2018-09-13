export class Cardapio{
    constructor(
        public id: string,
        public nome: string,
        public imgurl: string,
        public cardapio_id: string,
        public observacao: string,
        public preco: string,
        public pergunta: string
    ){}
}