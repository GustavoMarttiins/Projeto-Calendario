const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());
const observacoesPorId = {};
const axios = require('axios');

//Criar uma nova observação
app.post("/lembretes/:id/observacoes", async (req, res) => {
    const lembreteId = req.params.id;
    const { texto, concluido } = req.body;
    const idObs = uuidv4();
    const data = new Date();
    console.log(req.body);

    try {
        const lembreteResponse = await axios.get(`http://localhost:4000/lembretes/${lembreteId}`);
        const lembrete = lembreteResponse.data;

        if (lembrete) {
            const observacao = {
                id: idObs,
                texto,
                data: data.toISOString(),
                concluido: concluido || false,
            };

            lembrete.observacoes.push(observacao); 
            await axios.put(`http://localhost:4000/lembretes/${lembreteId}`, lembrete);

            res.status(201).send(observacao);
        } else {
            res.status(404).send('Lembrete não encontrado.');
        }
    } catch (error) {
        res.status(500).send('Erro ao obter informações do lembrete.');
    }
});

// Buscar as observações de todos os lembretes
app.get("/observacoes", (req, res) => {
    const allObservacoes = Object.values(observacoesPorId).reduce((acc, observacoes) => {
        return acc.concat(observacoes);
    }, []);

    if (allObservacoes.length > 0) {
        res.send(allObservacoes);
    } else {
        res.status(404).send('Nenhuma observação encontrada.');
    }
});

//Buscar uma observação por ID
app.get("/lembretes/:id/observacoes", (req, res) => {
    const lembreteId = req.params.id;
    const observacoesDoLembrete = observacoesPorId[lembreteId];
    if (observacoesDoLembrete) {
        res.send(observacoesDoLembrete);
    } else {
        res.status(404).send('Lembrete não encontrado ou não possui observações.');
    }
});

//Atualizar uma observação por ID
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

// Excluir uma observação
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
