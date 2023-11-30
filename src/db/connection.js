const express = require('express');
const mysql = require('mysql2');
const path = require('path')

const app = express();
const port = 8080;

//Aceita css (dentro da pasta public na raiz do projeto
app.use(express.static(path.join(__dirname, '/public'), {
    mimeTypes: {
      'css': 'text/css',
    }
  }));
  
  app.set('views', path.join(__dirname, 'views'));

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'QUPL5381',
    database: 'stock'
});

app.use(express.urlencoded({ extended: true }));

// Rota para exibir o formulário
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/forms.html'));
});

// Rota para lidar com o envio do formulário
app.post('/registrar', (req, res) => {
    const nome_empresa = req.body.nome_empresa;
    const email = req.body.email;
    const senha = req.body.senha;
    const telefone = req.body.telefone;
    const cnpj = req.body.cnpj;

    // Realiza a inserção no banco de dados
    const query = `INSERT INTO login (nome_empresa, email, senha, telefone, cnpj) VALUES (?, ?, ?, ?, ?)`;
    connection.query(query, [nome_empresa, email, senha, telefone, cnpj], (error, results, fields) => {
        if (error) {
            console.error('Erro ao registrar no banco de dados:', error.message);
            res.send('Erro ao registrar no banco de dados.');
        } else {
            console.log('Registro bem-sucedido!');
            res.send('Registro bem-sucedido!');
        }
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});