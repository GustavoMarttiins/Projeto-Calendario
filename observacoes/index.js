const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());
const observacoesPorId = {};

app.post("/lembretes/:id/observacoes", (req, res) => {
    const idObs = uuidv4();
    const {texto} = req.body
    const observacoesDoLembrete = observacoesPorId[req.params.id] || [];
    observacoesDoLembrete.push({ id: idObs, texto });

    observacoesPorId[req.params.id] = observacoesDoLembrete;
    res.status(201).send(observacoesDoLembrete);
});

app.get("/lembretes/:id/observacoes", (req, res) => {
    res.send(observacoesPorId)
});

app.listen(5000, () => {
    console.log('Observações. Porta 5000');
});