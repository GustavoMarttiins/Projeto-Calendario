const Sequelize = require('sequelize');

const conexao = new Sequelize('projeto', 'root', 'root', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    conexao: conexao
};
