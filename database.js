import sqlite3 from "sqlite3";
import path from "path";
import { open } from "sqlite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cria ou conecta ao banco de dados
export const openDb = async () => {
  const db = await open({
    filename: path.join(__dirname, "database.db"),
    driver: sqlite3.Database,
  });
  console.log("Conectado ao banco de dados SQLite");

  // Cria a tabela de tarefas se não existir
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      status TEXT DEFAULT 'pendente',
      prioridade TEXT DEFAULT 'media',
      data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
      data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("Tabela tarefas criada/verificada com sucesso");

  return db;
};
