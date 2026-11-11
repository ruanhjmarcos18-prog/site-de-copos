const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Configurando o banco de dados em arquivo para persistência
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const executeQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
};

const fetchAll = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const fetchOne = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const inicializar = async () => {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS Produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            precoBase REAL NOT NULL
        )
    `);

    const rows = await fetchAll(`SELECT COUNT(*) as count FROM Produtos`);
    if (rows[0].count === 0) {
        await executeQuery(`INSERT INTO Produtos (nome, precoBase) VALUES ('Copo Americano 190ml', 10.00)`);
        await executeQuery(`INSERT INTO Produtos (nome, precoBase) VALUES ('Copo Taça Vinho 300ml', 25.50)`);
        await executeQuery(`INSERT INTO Produtos (nome, precoBase) VALUES ('Copo Chopp 500ml', 15.00)`);
        console.log("Registros iniciais inseridos com sucesso.");
    }
};

module.exports = {
    db, executeQuery, fetchAll, fetchOne, inicializar
};
