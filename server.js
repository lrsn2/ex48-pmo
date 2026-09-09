const express = require('express');
const cors = require('cors');
<<<<<<< HEAD
const path = require('path');

const app = express();
const PORT = 3000;

// Configuração do CORS (permitindo requisições de http://localhost:3001)
app.use(cors({
  origin: 'http://localhost:3001'
}));

// Middleware para processar JSON no corpo do POST
app.use(express.json());

// Servir arquivos estáticos (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Banco de dados em memória
let tarefas = [
  { id: 1, titulo: 'Aprender Express' }
];

// GET / -> Serve o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET /api/tarefas -> Retorna 200 + Array em JSON
app.get('/api/tarefas', (req, res) => {
  res.status(200).json(tarefas);
});

// POST /api/tarefas -> Retorna 201 + Tarefa criada
app.post('/api/tarefas', (req, res) => {
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({ mensagem: 'O título da tarefa é obrigatório.' });
  }

  const novaTarefa = {
    id: tarefas.length + 1,
    titulo
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
=======
const app = express();

// CORS: aceita requisições de http://localhost:3001
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());
app.use(express.static('public'));

let tarefas = [], nextId = 1;

// TODO:
// GET  /api/tarefas  → 200 + array de tarefas
// POST /api/tarefas  → 201 + tarefa criada { id, titulo }

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
>>>>>>> bee0ad75895fa9e62952f33d0ef109bbc4a483cc
