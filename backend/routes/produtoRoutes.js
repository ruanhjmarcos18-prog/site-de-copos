const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');

router.get('/produtos', ProdutoController.listar);
router.get('/produtos/:id', ProdutoController.buscarPorId);
router.post('/produtos', ProdutoController.criar);
router.put('/produtos/:id', ProdutoController.atualizar);
router.delete('/produtos/:id', ProdutoController.deletar);
router.post('/converter', ProdutoController.converter);

module.exports = router;
