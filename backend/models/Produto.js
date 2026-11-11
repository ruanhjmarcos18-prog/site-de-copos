class Produto {
    constructor(id, nome, precoBase) {
        this.id = id;
        this.nome = nome;
        this.precoBase = parseFloat(precoBase);
    }
    calcularLucro() {
        return this.precoBase * 2;
    }
}
module.exports = Produto;
