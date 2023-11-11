const express = require('express');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const app = express();
app.use(express.json());

const observacoesPorLembreteId = {};

app.post('/lembretes/:id/observacoes', async (req, res) => {
    const idObs = uuidv4();
    const { texto, concluido } = req.body;

    // Adicionar observação ao array
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || [];
    const observacao = { id: idObs, texto, concluido };
    observacoesDoLembrete.push(observacao);
    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;

    // Enviar evento após adicionar a observação ao array
    await axios.post('http://localhost:10000/eventos', {
        tipo: "ObservacaoCriada",
        dados: {
            id: idObs, texto, lembreteId: req.params.id
        }
    });

    // Retornar apenas a observação criada
    res.status(201).send(observacao);
});

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
});

app.put('/lembretes/:id/observacoes/:idObs', (req, res) => {
    const lembreteId = req.params.id;
    const observacaoId = req.params.idObs;
    const { texto, concluido } = req.body;

    const observacoesDoLembrete = observacoesPorLembreteId[lembreteId];

    if (observacoesDoLembrete) {
        const observacaoIndex = observacoesDoLembrete.findIndex(obs => obs.id === observacaoId);

        if (observacaoIndex !== -1) {
            observacoesDoLembrete[observacaoIndex] = { id: observacaoId, texto, concluido };
            observacoesPorLembreteId[lembreteId] = observacoesDoLembrete;

            res.status(200).send(observacoesDoLembrete[observacaoIndex]);
        } else {
            res.status(404).send('Observação não encontrada.');
        }
    } else {
        res.status(404).send('Lembrete não encontrado.');
    }
});

app.delete('/lembretes/:id/observacoes/:idObs', (req, res) => {
    const lembreteId = req.params.id;
    const observacaoId = req.params.idObs;

    const observacoesDoLembrete = observacoesPorLembreteId[lembreteId];

    if (observacoesDoLembrete) {
        const observacaoIndex = observacoesDoLembrete.findIndex(obs => obs.id === observacaoId);

        if (observacaoIndex !== -1) {
            observacoesDoLembrete.splice(observacaoIndex, 1);
            observacoesPorLembreteId[lembreteId] = observacoesDoLembrete;

            res.status(200).send("Observação deletada com sucesso");
        } else {
            res.status(404).send('Observação não encontrada.');
        }
    } else {
        res.status(404).send('Lembrete não encontrado.');
    }
});


app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
});

app.listen(5000, () => {
    console.log('Observações. Porta 5000');
});
