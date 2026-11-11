const express = require('express');
const cors = require('cors');
const path = require('path');
const produtoRoutes = require('./routes/produtoRoutes');
const database = require('./config/database');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir os arquivos estáticos do Front-end
app.use(express.static(path.join(__dirname, '../frontend')));

// Rotas da API
app.use('/api', produtoRoutes);

// Inicializar banco de dados e iniciar servidor
database.inicializar().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("Erro ao iniciar banco de dados:", err);
});
