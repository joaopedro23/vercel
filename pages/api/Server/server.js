const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const { sql } = require('./db/conectdb');
require('dotenv').config();


const databaseUrl = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: databaseUrl,
    ssl: {
        require: true,
    },
   });

  async function getPostgresVersion() {
    const client = await pool.connect();
    try {
      const response = await client.query('SELECT version()');
      console.log(response.rows[0]);
    } catch (error) {
      console.error('Erro ao executar a consulta:', error);
    } finally {
      client.release();
    }
  }
  
  
  getPostgresVersion();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/salvar-dados', async (req, res) => {
  const {
    nome,
    sobrenome,
    regiao,
    cidade,
    pokemons,
    dataAtendimento,
    horaAtendimento,
  } = req.body;

  try {
    // Conexão com o banco de dados
    const client = await pool.connect(); // Corrigido aqui

    // Inserção dos dados na tabela do banco de dados
    const queryText = `
      INSERT INTO formulario (nome, sobrenome, regiao, cidade, pokemons, data_atendimento, hora_atendimento)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [nome, sobrenome, regiao, cidade, pokemons, dataAtendimento, horaAtendimento];

    await client.query(queryText, values);
    client.release();

    res.status(200).send('Dados salvos com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
    res.status(500).send('Erro ao salvar os dados');
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
