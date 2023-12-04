const express = require('express');
const app = express();
app.use(express.json());
const lembretes = [];
let contador = 0;
const lembrete = require(".Backend\base\LembretesDB");

// Listar todos os lembretes
app.get('/lembretes', (req, res) => {
  res.send(lembretes);
});

app.post('/lembrete/', (req, res) => {
  lembrete.create({
    nome: req.body.nome,
  })
})

// Criar um novo lembrete
app.post('/lembretes', (req, res) => {
  contador++;
  const { nome, concluido } = req.body;
  const data = new Date();
  const novoLembrete = {
    id: contador,
    nome,
    data: data.toISOString(),
    concluido: concluido !== undefined ? concluido : false
  };
  lembretes.push(novoLembrete);
  res.status(201).send(novoLembrete);
});

// Obter um lembrete por ID
app.get('/lembretes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const lembrete = lembretes.find((l) => l.id === id);
  if (lembrete) {
    res.send(lembrete);
  } else {
    res.status(404).send('Lembrete não encontrado');
  }
});

// Atualizar um lembrete por ID
app.put('/lembretes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const lembrete = lembretes.find((l) => l.id === id);
  if (lembrete) {
    const { nome, concluido } = req.body;
    lembrete.nome = nome;
    lembrete.concluido = concluido;
    res.send(lembrete);
  } else {
    res.status(404).send('Lembrete não encontrado');
  }
});

// Excluir um lembrete por ID
app.delete('/lembretes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = lembretes.findIndex((l) => l.id === id);
  if (index !== -1) {
    lembretes.splice(index, 1);
    res.send('Lembrete excluído com sucesso');
  } else {
    res.status(404).send('Lembrete não encontrado');
  }
});

app.post("/eventos", (req, res) => {
  console.log(req.body);
  res.status(200).send({ msg: "ok" });
});


app.listen(4000, () => {
  console.log('Lembretes. Porta 4000');
});
