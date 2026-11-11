const dbConfig = require('../config/database');
const Produto = require('../models/Produto');
const CambioService = require('../services/CambioService');

class ProdutoController {
    static async listar(req, res) {
        try {
            const produtos = await dbConfig.fetchAll(`SELECT * FROM Produtos ORDER BY id DESC`);
            res.json(produtos);
        } catch (error) {
            res.status(500).json({ erro: "Erro ao buscar produtos" });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const row = await dbConfig.fetchOne(`SELECT * FROM Produtos WHERE id = ?`, [id]);
            if (!row) return res.status(404).json({ erro: "Produto não encontrado" });
            res.json(row);
        } catch (error) {
            res.status(500).json({ erro: "Erro ao buscar produto" });
        }
    }

    static async criar(req, res) {
        try {
            const { nome, precoBase } = req.body;
            if (!nome || !precoBase) return res.status(400).json({ erro: "Nome e precoBase obrigatórios" });
            const resultado = await dbConfig.executeQuery(`INSERT INTO Produtos (nome, precoBase) VALUES (?, ?)`, [nome, parseFloat(precoBase)]);
            res.status(201).json({ mensagem: "Criado com sucesso", id: resultado.lastID });
        } catch (error) {
            res.status(500).json({ erro: "Erro ao criar" });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, precoBase } = req.body;
            await dbConfig.executeQuery(`UPDATE Produtos SET nome = ?, precoBase = ? WHERE id = ?`, [nome, parseFloat(precoBase), id]);
            res.json({ mensagem: "Atualizado com sucesso" });
        } catch (error) {
            res.status(500).json({ erro: "Erro ao atualizar" });
        }
    }

    static async deletar(req, res) {
        try {
            const { id } = req.params;
            await dbConfig.executeQuery(`DELETE FROM Produtos WHERE id = ?`, [id]);
            res.json({ mensagem: "Deletado com sucesso" });
        } catch (error) {
            res.status(500).json({ erro: "Erro ao deletar" });
        }
    }

    static async converter(req, res) {
        try {
            const { idProduto, moeda } = req.body;
            if (!idProduto || !moeda) return res.status(400).json({ erro: "ID e moeda obrigatórios" });
            const row = await dbConfig.fetchOne(`SELECT * FROM Produtos WHERE id = ?`, [idProduto]);
            if (!row) return res.status(404).json({ erro: "Produto não encontrado" });

            const produto = new Produto(row.id, row.nome, row.precoBase);
            const precoFinalBRL = produto.calcularLucro();
            const taxaCotacao = await CambioService.obterCotacao(moeda);
            const precoConvertido = precoFinalBRL * taxaCotacao;

            res.json({
                produto: produto.nome,
                precoBaseBRL: produto.precoBase,
                precoComLucroBRL: precoFinalBRL,
                moedaAlvo: moeda.toUpperCase(),
                taxaAplicada: taxaCotacao,
                precoFinalConvertido: precoConvertido.toFixed(2)
            });
        } catch (error) {
            res.status(500).json({ erro: "Erro ao realizar conversão", detalhes: error.message });
        }
    }
}
module.exports = ProdutoController;
