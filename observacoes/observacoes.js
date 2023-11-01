const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());
const observacoesPorId = {};
let contador = 0;

app.post("/lembretes/:id/observacoes", (req, res) => {
    contador++;
    const { texto, concluido } = req.body;
    const idObs = ++contador;
    const observacoesDoLembrete = observacoesPorId[req.params.id] || [];
    const data = new Date();
    observacoesDoLembrete.push({ id: idObs, texto, data: data.toISOString(), concluido: concluido || false });

    observacoesPorId[req.params.id] = observacoesDoLembrete;
    res.status(201).send(observacoesDoLembrete);
});

app.get("/lembretes/:id/observacoes", (req, res) => {
    const lembreteId = req.params.id;
    const observacoesDoLembrete = observacoesPorId[lembreteId];
    if (observacoesDoLembrete) {
        res.send(observacoesDoLembrete);
    } else {
        res.status(404).send('Lembrete não encontrado ou não possui observações.');
    }
});

app.put("/lembretes/:id/observacoes/:obsId", (req, res) => {
    const lembreteId = req.params.id;
    const observacaoId = req.params.obsId;
    const observacoesDoLembrete = observacoesPorId[lembreteId];

    if (observacoesDoLembrete) {
        const observacao = observacoesDoLembrete.find((o) => o.id === observacaoId);

        if (observacao) {
            const { texto, concluido } = req.body;
            observacao.texto = texto || observacao.texto;
            observacao.concluido = concluido !== undefined ? concluido : observacao.concluido;
            res.send(observacao);
        } else {
            res.status(404).send('Observação não encontrada.');
        }
    } else {
        res.status(404).send('Lembrete não encontrado ou não possui observações.');
    }
});

// Rota para excluir uma observação associada a um lembrete
app.delete("/lembretes/:id/observacoes/:obsId", (req, res) => {
    const lembreteId = req.params.id;
    const observacaoId = req.params.obsId;
    const observacoesDoLembrete = observacoesPorId[lembreteId];

    if (observacoesDoLembrete) {
        const observacaoIndex = observacoesDoLembrete.findIndex((o) => o.id === observacaoId);

        if (observacaoIndex !== -1) {
            observacoesDoLembrete.splice(observacaoIndex, 1);
            res.send('Observação excluída com sucesso.');
        } else {
            res.status(404).send('Observação não encontrada.');
        }
    } else {
        res.status(404).send('Lembrete não encontrado ou não possui observações.');
    }
});

app.listen(5000, () => {
    console.log('Observações. Porta 5000');
});