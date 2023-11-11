const mysql = require('mysql2');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    database: 'db_calendario',
    password: 'root'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL');
    }
});

connection.query('SELECT * FROM db_calendario.lembretes', (err, results) => {
    if (err) {
        console.error('Erro ao executar a consulta:', err);
    } else {
        console.log('Resultados da consulta:', results);
    }

});