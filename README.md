# 📚 API de Gerenciamento de Biblioteca

API RESTful para controle e administração de biblioteca desenvolvida em **Node.js** com **Express**, utilizando **MySQL** para persistência de dados. A aplicação oferece suporte ao gerenciamento completo (CRUD) de autores, gêneros, livros, usuários e registros de empréstimos.

---

## 🗂️ Estrutura do Projeto

```text
backend/
├── src/
│   ├── config/
│   │   ├── db.js                   # Conexão com o banco (Pool MySQL2)
│   │   └── script.sql              # Script DDL e dados iniciais (seeds)
│   ├── controllers/               # Lógica de controle e respostas HTTP
│   │   ├── autoresControllers.js
│   │   ├── emprestimosControllers.js
│   │   ├── generosControllers.js
│   │   ├── livrosControllers.js
│   │   └── usuariosControllers.js
│   ├── models/                    # Camada de acesso a dados (SQL Queries)
│   │   ├── autoresModels.js
│   │   ├── emprestimosModels.js
│   │   ├── generosModels.js
│   │   ├── livrosModels.js
│   │   └── usuariosModels.js
│   ├── routes/                    # Definição e roteamento dos endpoints
│   │   ├── autoresRoutes.js
│   │   ├── emprestimosRoutes.js
│   │   ├── generosRoutes.js
│   │   ├── livrosRoutes.js
│   │   └── usuariosRoutes.js
│   ├── app.js                     # Configuração do Express e middlewares
│   └── server.js                  # Inicialização do servidor
├── .env.example                   # Modelo das variáveis de ambiente
└── package.json
```

---

## 🛠️ Tecnologias Utilizadas

<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white" alt="Nodemon" />
</p>

* **Node.js & Express** — Plataforma e framework para construção da API RESTful.
* **MySQL & mysql2** — Banco de dados relacional e driver com suporte a Promises.
* **dotenv** — Gerenciamento de variáveis de ambiente.
* **Nodemon** — Reinicialização automática em ambiente de desenvolvimento.

---

## ⚙️ Instalação e Configuração

### 1. Pré-requisitos
- [Node.js](https://nodejs.org/) instalado.
- Servidor [MySQL](https://www.mysql.com/) em execução.

### 2. Passos para execução

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd Atividade_Pratica-API_de_Gerenciamento_de_Biblioteca/backend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz da pasta `backend/` com base no `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Preencha os valores de acordo com seu ambiente:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_PORT=3306
   DB_NAME=Biblioteca
   API_PORT=3000
   ```

4. **Inicialize o Banco de Dados:**
   Execute o script `src/config/script.sql` no seu banco de dados MySQL via CLI ou cliente gráfico (DBeaver, MySQL Workbench):
   ```bash
   mysql -u root -p < src/config/script.sql
   ```
   > **Nota:** O script cria automaticamente a base `Biblioteca`, as tabelas com seus relacionamentos e insere dados iniciais para testes.

5. **Inicie a aplicação:**
   ```bash
   npm start
   ```
   O servidor estará disponível em: `http://localhost:3000`.

---

## 🛣️ Endpoints da API

### ✍️ Autores (`/autores`)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/autores` | Lista todos os autores cadastrados |
| `GET` | `/autores/:id` | Retorna os detalhes de um autor específico |
| `POST` | `/autores` | Cadastra um novo autor |
| `PUT` | `/autores/:id` | Atualiza os dados de um autor existente |
| `DELETE` | `/autores/:id` | Remove um autor pelo ID |

**Exemplo de corpo (POST / PUT):**
```json
{
  "nome_completo": "Machado de Assis",
  "nacionalidade": "Brasileiro",
  "data_nascimento": "1839-06-21"
}
```

---

### 🏷️ Gêneros (`/generos`)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/generos` | Lista todos os gêneros cadastrados |
| `GET` | `/generos/:id` | Retorna um gênero específico |
| `POST` | `/generos` | Cadastra um novo gênero |
| `PUT` | `/generos/:id` | Atualiza o nome de um gênero |
| `DELETE` | `/generos/:id` | Remove um gênero pelo ID |

**Exemplo de corpo (POST / PUT):**
```json
{
  "nome": "Ficção Científica"
}
```

---

### 📕 Livros (`/livros`)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/livros` | Lista todos os livros cadastrados |
| `GET` | `/livros/:id` | Retorna os detalhes de um livro |
| `GET` | `/livros/autor/:id` | Lista todos os livros de um autor |
| `GET` | `/livros/:id/emprestimos` | Lista o histórico de empréstimos do livro |
| `POST` | `/livros` | Cadastra um novo livro |
| `PUT` | `/livros/:id` | Atualiza as informações de um livro |
| `DELETE` | `/livros/:id` | Remove um livro pelo ID |

**Exemplo de corpo (POST / PUT):**
```json
{
  "titulo": "Dom Casmurro",
  "isbn": "9788535914849",
  "ano_publicacao": 1899,
  "numero_paginas": 256,
  "sinopse": "Uma história sobre as dúvidas e memórias de Bento Santiago."
}
```

---

### 👤 Usuários (`/usuarios`)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/usuarios` | Lista todos os usuários cadastrados |
| `GET` | `/usuarios/:id` | Retorna os detalhes de um usuário específico |
| `POST` | `/usuarios` | Cadastra um novo usuário |
| `PUT` | `/usuarios/:id` | Atualiza os dados de um usuário |
| `DELETE` | `/usuarios/:id` | Remove um usuário pelo ID |

**Exemplo de corpo (POST / PUT):**
```json
{
  "nome_completo": "Maria Silva",
  "cpf": "123.456.789-00",
  "email": "maria.silva@email.com",
  "telefone": "(11) 98765-4321",
  "data_nascimento": "1995-05-15"
}
```

---

### 🔄 Empréstimos (`/emprestimos`)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/emprestimos` | Lista todos os registros de empréstimo |
| `GET` | `/emprestimos/:id` | Retorna os dados de um empréstimo específico |
| `GET` | `/emprestimos/livro/:id` | Lista os empréstimos associados a um livro |
| `POST` | `/emprestimos` | Registra um novo empréstimo |
| `PUT` | `/emprestimos/:id` | Atualiza as informações de um empréstimo |
| `DELETE` | `/emprestimos/:id` | Remove o registro de um empréstimo |

**Exemplo de corpo (POST / PUT):**
```json
{
  "data_emprestimo": "2026-10-01",
  "data_devolucao": "2026-10-15",
  "usuarios_id": 1,
  "livros_id": 1
}
```

---

## 📋 Códigos de Status HTTP

| Código | Significado | Situação de Uso |
|---|---|---|
| `200 OK` | Sucesso | Retorno em consultas (`GET`), atualizações (`PUT`) e deleções (`DELETE`) |
| `201 Created` | Criado | Retorno na criação bem-sucedida de registros (`POST`) |
| `404 Not Found` | Não Encontrado | Recurso solicitado não existe no banco de dados |
| `500 Internal Error` | Erro Interno | Falha na execução da requisição ou comunicação com o banco |

**Exemplo de resposta de erro (404):**
```json
{
  "mensagem": "Recurso não encontrado!"
}
```