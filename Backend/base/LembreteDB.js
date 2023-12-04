const banco = require('./banco')

const Lembrete = banco.sequelize.define('lembretes', {
    texto: {
        type: banco.Sequelize.STRING
    },

})

Lembrete.sync({force: true})