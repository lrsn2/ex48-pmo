const express = require('express');
const cors = require('cors');
const app = express();

// CORS: aceita requisições de http://localhost:3001
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());
app.use(express.static('public'));

let tarefas = [], nextId = 1;

// GET /api/tarefas → 200 + array de tarefas
app.get('/api/tarefas', (req, res) => {
  res.status(200).json(tarefas);
});

// POST /api/tarefas → 201 + tarefa criada { id, titulo }
app.post('/api/tarefas', (req, res) => {
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({ erro: 'O título da tarefa é obrigatório.' });
  }

  const novaTarefa = {
    id: nextId++,
    titulo
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));