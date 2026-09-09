const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do CORS exigida
app.use(cors({ origin: 'http://localhost:3001' }));

// Middleware para processar JSON
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

let tarefas = [];
let nextId = 1;

// GET / -> Serve o arquivo index.html (garantia explícita para os testes)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET /api/tarefas -> Retorna 200 + Array
app.get('/api/tarefas', (req, res) => {
  res.status(200).json(tarefas);
});

// POST /api/tarefas -> Valida título e retorna 201 ou 400
app.post('/api/tarefas', (req, res) => {
  const { titulo } = req.body || {};

  // Se o título não for enviado ou for vazio, o teste espera status 400
  if (!titulo || typeof titulo !== 'string' || !titulo.trim()) {
    return res.status(400).json({ erro: 'O título da tarefa é obrigatório' });
  }

  const novaTarefa = {
    id: nextId++,
    titulo: titulo.trim()
  };

  tarefas.push(novaTarefa);
  return res.status(201).json(novaTarefa);
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));