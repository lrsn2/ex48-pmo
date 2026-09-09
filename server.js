const express = require('express');
const cors = require('cors');

const app = express();

// Configuração do CORS exigida na descrição do exercício
app.use(cors({ origin: 'http://localhost:3001' }));

// Middleware para interpretar o corpo das requisições JSON
app.use(express.json());

// Servir os arquivos da pasta public na raiz /
app.use(express.static('public'));

let tarefas = [];
let nextId = 1;

// GET /api/tarefas -> 200 + JSON com array de tarefas
app.get('/api/tarefas', (req, res) => {
  res.status(200).json(tarefas);
});

// POST /api/tarefas -> 201 + tarefa criada
app.post('/api/tarefas', (req, res) => {
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({ mensagem: 'Título é obrigatório' });
  }

  const novaTarefa = { id: nextId++, titulo };
  tarefas.push(novaTarefa);

  res.status(201).json(novaTarefa);
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));