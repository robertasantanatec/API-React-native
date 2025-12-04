# Backend - API CRUD de Tarefas

Backend desenvolvido com Node.js, Express e SQLite para gerenciamento de tarefas.

## 🚀 Tecnologias

- Node.js
- Express
- SQLite3
- CORS
- Body-parser

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Instale as dependências:
```bash
npm install
```

## ▶️ Como executar

### Modo desenvolvimento (com auto-reload):
```bash
npm run dev
```

### Modo produção:
```bash
npm start
```

O servidor estará rodando em: `http://localhost:3000`

## 📡 Endpoints da API

### Base URL
```
http://localhost:3000
```

### Rotas disponíveis

#### 1. Teste da API
```http
GET /
```

#### 2. Criar Tarefa
```http
POST /tarefas
Content-Type: application/json

{
  "titulo": "Minha tarefa",
  "descricao": "Descrição da tarefa",
  "status": "pendente",
  "prioridade": "alta"
}
```

**Campos:**
- `titulo` (obrigatório): Título da tarefa
- `descricao` (opcional): Descrição detalhada
- `status` (opcional): pendente, em_andamento, concluida (padrão: pendente)
- `prioridade` (opcional): baixa, media, alta (padrão: media)

#### 3. Listar Todas as Tarefas
```http
GET /tarefas
```

**Query params (opcionais):**
- `status`: Filtrar por status
- `prioridade`: Filtrar por prioridade

Exemplos:
- `GET /tarefas?status=pendente`
- `GET /tarefas?prioridade=alta`

#### 4. Buscar Tarefa por ID
```http
GET /tarefas/:id
```

#### 5. Atualizar Tarefa
```http
PUT /tarefas/:id
Content-Type: application/json

{
  "titulo": "Título atualizado",
  "descricao": "Nova descrição",
  "status": "concluida",
  "prioridade": "baixa"
}
```

#### 6. Deletar Tarefa
```http
DELETE /tarefas/:id
```

## 💾 Banco de Dados

O banco de dados SQLite é criado automaticamente no arquivo `database.db` na primeira execução.

### Estrutura da tabela `tarefas`:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INTEGER | Chave primária (auto-increment) |
| titulo | TEXT | Título da tarefa (obrigatório) |
| descricao | TEXT | Descrição da tarefa |
| status | TEXT | Status: pendente, em_andamento, concluida |
| prioridade | TEXT | Prioridade: baixa, media, alta |
| data_criacao | DATETIME | Data de criação (automático) |
| data_atualizacao | DATETIME | Data da última atualização (automático) |

## 🧪 Testando a API

### Usando cURL:

```bash
# Criar tarefa
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Estudar React Native","prioridade":"alta"}'

# Listar tarefas
curl http://localhost:3000/tarefas

# Buscar tarefa específica
curl http://localhost:3000/tarefas/1

# Atualizar tarefa
curl -X PUT http://localhost:3000/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"concluida"}'

# Deletar tarefa
curl -X DELETE http://localhost:3000/tarefas/1
```

## 📦 Estrutura de Arquivos

```
backend/
├── server.js         # Servidor Express e rotas
├── database.js       # Configuração do banco de dados
├── package.json      # Dependências do projeto
├── database.db       # Banco de dados SQLite (gerado automaticamente)
└── README.md         # Documentação
```

## 🔒 CORS

O CORS está configurado para aceitar requisições de qualquer origem. Em produção, configure para aceitar apenas domínios específicos.

## 📝 Notas

- O banco de dados é persistente e mantém os dados entre reinicializações
- Todas as respostas seguem o formato JSON
- Timestamps são gerados automaticamente pelo SQLite
- A API retorna códigos HTTP apropriados (200, 201, 400, 404, 500)
