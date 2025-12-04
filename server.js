import express from "express";
import cors from "cors";
import { openDb } from "./database.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

let db;

(async () => {
  try {
    db = await openDb();
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  } catch (err) {
    console.error("Falha ao iniciar servidor:", err);
  }
})();

// Rota de teste
app.get("/", (req, res) => {
  res.json({
    message: "API CRUD de Tarefas funcionando!",
    version: "1.0.0",
  });
});

// CREATE - Criar nova tarefa
app.post("/tarefas", async (req, res) => {
  const { titulo, descricao, status, prioridade } = req.body;

  if (!titulo) return res.status(400).json({ error: "Título é obrigatório" });

  try {
    const result = await db.run(
      `INSERT INTO tarefas (titulo, descricao, status, prioridade) VALUES (?, ?, ?, ?)`,
      [titulo, descricao || "", status || "pendente", prioridade || "media"]
    );

    // Busca a tarefa recém-criada
    const novaTarefa = await db.get("SELECT * FROM tarefas WHERE id = ?", result.lastID);

    res.status(201).json({
      message: "Tarefa criada com sucesso",
      data: novaTarefa,
    });
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
});

// READ - Listar todas as tarefas
app.get("/tarefas", async (req, res) => {
  const { status, prioridade } = req.query;

  try {
    let query = "SELECT * FROM tarefas WHERE 1=1";
    const params = [];

    if (status) {
      query += " AND status = ?";
      params.push(status);
    }

    if (prioridade) {
      query += " AND prioridade = ?";
      params.push(prioridade);
    }

    query += " ORDER BY data_criacao DESC";

    const tarefas = await db.all(query, params);

    res.json({
      message: "Tarefas listadas com sucesso",
      count: tarefas.length,
      data: tarefas,
    });
  } catch (error) {
    console.error("Erro ao listar tarefas:", error);
    res.status(500).json({ error: "Erro ao listar tarefas" });
  }
});

// READ - Buscar tarefa por ID
app.get("/tarefas/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const tarefa = await db.get("SELECT * FROM tarefas WHERE id = ?", [id]);

    if (!tarefa) return res.status(404).json({ error: "Tarefa não encontrada" });

    res.json({
      message: "Tarefa encontrada",
      data: tarefa,
    });
  } catch (error) {
    console.error("Erro ao buscar tarefa:", error);
    res.status(500).json({ error: "Erro ao buscar tarefa" });
  }
});

// UPDATE - Atualizar tarefa
app.put("/tarefas/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, status, prioridade } = req.body;

  try {
    // Verifica se a tarefa existe
    const tarefaAtual = await db.get("SELECT * FROM tarefas WHERE id = ?", id);

    if (!tarefaAtual) return res.status(404).json({ error: "Tarefa não encontrada" });

    // Atualiza a tarefa
    await db.run(
      `
      UPDATE tarefas 
      SET titulo = COALESCE(?, titulo),
          descricao = COALESCE(?, descricao),
          status = COALESCE(?, status),
          prioridade = COALESCE(?, prioridade),
          data_atualizacao = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
      [titulo, descricao, status, prioridade, id]
    );

    // Busca a tarefa atualizada
    const tarefaAtualizada = await db.get("SELECT * FROM tarefas WHERE id = ?", id);

    res.json({ message: "Tarefa atualizada com sucesso", data: tarefaAtualizada });
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
});

// DELETE - Deletar tarefa
app.delete("/tarefas/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Verifica se a tarefa existe
    const tarefaParaDeletar = await db.get("SELECT * FROM tarefas WHERE id = ?", [id]);

    if (!tarefaParaDeletar) return res.status(404).json({ error: "Tarefa não encontrada" });

    // Deleta a tarefa
    await db.run("DELETE FROM tarefas WHERE id = ?", [id]);

    res.json({
      message: "Tarefa deletada com sucesso",
      data: tarefaParaDeletar,
    });
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    res.status(500).json({ error: "Erro ao deletar tarefa" });
  }
});
