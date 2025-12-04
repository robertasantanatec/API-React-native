# Sistema CRUD Completo - React Native + Node.js

Sistema completo de CRUD (Create, Read, Update, Delete) com backend em Node.js/Express e aplicativo mobile em React Native/Expo.

## 📦 Estrutura do Projeto

```
crud-project/
├── backend/          # API REST com Node.js + Express + SQLite
└── mobile/           # App mobile com React Native + Expo
```

## 🎯 Sobre o Projeto

Este é um sistema de gerenciamento de tarefas (To-Do List) que permite:
- ✅ Criar novas tarefas
- 📖 Listar e filtrar tarefas
- ✏️ Editar tarefas existentes
- 🗑️ Excluir tarefas
- 🏷️ Organizar por status (Pendente, Em Andamento, Concluída)
- ⚡ Definir prioridade (Baixa, Média, Alta)

## 🚀 Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- SQLite3
- CORS
- Body-parser

### Mobile
- React Native
- Expo (SDK 51)
- React Navigation
- Axios
- JavaScript

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go instalado no smartphone

## 🔧 Instalação e Execução

### 1️⃣ Backend

```bash
# Entre na pasta do backend
cd backend

# Instale as dependências
npm install

# Inicie o servidor
npm start
```

O servidor estará rodando em `http://localhost:3000`

**Documentação completa**: Veja `backend/README.md`

### 2️⃣ Mobile

```bash
# Entre na pasta do mobile
cd mobile

# Instale as dependências
npm install

# IMPORTANTE: Configure o IP do backend
# Abra src/services/api.js e altere a constante API_URL
# Exemplo: const API_URL = 'http://SEU_IP_AQUI:3000';

# Inicie o Expo
npm start
```

Escaneie o QR Code com o app Expo Go no celular.

**Documentação completa**: Veja `mobile/README.md`

## 🌐 Como Descobrir Seu IP

Para que o app mobile se conecte ao backend, você precisa configurar o IP da sua máquina:

### Windows
```bash
ipconfig
# Procure por "Endereço IPv4"
```

### Mac/Linux
```bash
ifconfig
# ou
ip addr
# Procure por "inet"
```

Exemplo de IP: `192.168.1.100`

Depois, edite o arquivo `mobile/src/services/api.js`:
```javascript
const API_URL = 'http://192.168.1.100:3000'; // Seu IP aqui
```

## 📡 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Teste da API |
| GET | `/tarefas` | Listar todas as tarefas |
| GET | `/tarefas/:id` | Buscar tarefa por ID |
| POST | `/tarefas` | Criar nova tarefa |
| PUT | `/tarefas/:id` | Atualizar tarefa |
| DELETE | `/tarefas/:id` | Deletar tarefa |

### Exemplo de Requisição

```bash
# Criar tarefa
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Estudar React Native",
    "descricao": "Completar tutorial de CRUD",
    "status": "pendente",
    "prioridade": "alta"
  }'
```

## 📱 Funcionalidades do App

### Tela Principal (Lista)
- Visualização de todas as tarefas
- Filtros por status
- Pull-to-refresh
- Cards coloridos por prioridade
- Ações rápidas (Editar/Excluir)

### Criar Tarefa
- Formulário completo
- Validação de campos
- Seleção de status e prioridade

### Editar Tarefa
- Edição de todos os campos
- Visualização de timestamps
- Atualização em tempo real

### Detalhes
- Visualização completa da tarefa
- Informações de criação/atualização
- Ações de editar e excluir

## 🎨 Interface

O app possui uma interface moderna e intuitiva com:
- Design clean e profissional
- Cores semânticas para status
- Feedback visual para ações
- Navegação fluida
- Indicadores de carregamento

## 💾 Banco de Dados

O backend utiliza SQLite com a seguinte estrutura:

```sql
CREATE TABLE tarefas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  descricao TEXT,
  status TEXT DEFAULT 'pendente',
  prioridade TEXT DEFAULT 'media',
  data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🐛 Solução de Problemas

### Backend não inicia
```bash
# Verifique se a porta 3000 está livre
# No Windows:
netstat -ano | findstr :3000
# No Mac/Linux:
lsof -i :3000
```

### App não conecta ao backend
1. Verifique se o backend está rodando
2. Confirme que o IP em `api.js` está correto
3. Certifique-se que ambos estão na mesma rede Wi-Fi
4. Desative firewalls temporariamente

### Expo não carrega
```bash
# Limpe o cache
expo start -c

# Ou reinstale
rm -rf node_modules
npm install
```

## 📚 Estrutura de Código

### Backend
```
backend/
├── server.js       # Express e rotas CRUD
├── database.js     # Configuração SQLite
├── package.json    # Dependências
└── README.md       # Documentação
```

### Mobile
```
mobile/
├── App.js                      # Navegação
├── src/
│   ├── services/
│   │   └── api.js             # Cliente HTTP
│   └── screens/
│       ├── ListaTarefasScreen.js
│       ├── NovaTarefaScreen.js
│       ├── EditarTarefaScreen.js
│       └── DetalhesTarefaScreen.js
└── README.md
```

## 🎓 Conceitos Demonstrados

- ✅ API RESTful completa
- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Banco de dados relacional (SQLite)
- ✅ Navegação entre telas (React Navigation)
- ✅ Consumo de API com Axios
- ✅ Gerenciamento de estado (useState, useEffect)
- ✅ Validação de formulários
- ✅ Tratamento de erros
- ✅ Feedback ao usuário (Alerts, Loading)
- ✅ UI/UX responsiva

## 📝 Possíveis Melhorias

- [ ] Autenticação JWT
- [ ] Paginação na lista
- [ ] Busca por texto
- [ ] Upload de imagens
- [ ] Notificações push
- [ ] Modo offline
- [ ] Testes automatizados
- [ ] Dark mode
- [ ] Compartilhamento de tarefas

## 📄 Licença

Projeto desenvolvido para fins educacionais.

## 👨‍💻 Como Usar Este Projeto

1. Clone ou baixe os arquivos
2. Siga as instruções de instalação
3. Configure o IP do backend no mobile
4. Teste todas as funcionalidades
5. Personalize conforme necessário

## 🆘 Suporte

Caso encontre problemas:
1. Verifique a documentação em cada pasta
2. Confira os logs do terminal
3. Teste os endpoints com cURL ou Postman
4. Verifique as conexões de rede

---

**Desenvolvido com ❤️ usando React Native e Node.js**
