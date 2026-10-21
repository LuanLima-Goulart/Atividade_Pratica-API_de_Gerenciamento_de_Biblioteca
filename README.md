# 📚 API de Gerenciamento de Biblioteca

API RESTful para controle e administração de biblioteca desenvolvida em **Node.js** com **Express**, utilizando **MySQL** para persistência de dados. A aplicação oferece suporte ao gerenciamento completo (CRUD) de autores, gêneros, livros, usuários e registros de empréstimos, contando com **criptografia e hashing seguro** para proteção de dados sensíveis em conformidade com as boas práticas de segurança.

---

## 🗂️ Estrutura do Projeto

```text
backend/
├── src/
│   ├── config/
│   │   ├── db.js                  # Conexão com o banco (Pool MySQL2)
│   │   └── script.sql             # Script DDL, tabelas e seeds iniciais
│   ├── controllers/               # Lógica de controle e respostas HTTP
│   ├── models/                    # Camada de acesso a dados (SQL Queries)
│   ├── routes/                    # Definição e roteamento dos endpoints
│   ├── utils/
│   │   └── crypto/                # Utilitários de segurança e criptografia
│   │       ├── criptografia.js    # Criptografia simétrica AES-256-GCM (CPF)
│   │       └── hash.js            # Hashing e salt seguro via scrypt (Senhas)
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
  <img src="https://img.shields.io/badge/Crypto_Security-blueviolet?style=for-the-badge&logo=shield&logoColor=white" alt="Security" />
  <img src="https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white" alt="Nodemon" />
</p>

* **Node.js & Express** — Plataforma e framework para construção da API RESTful.
* **MySQL & mysql2** — Banco de dados relacional e driver com suporte nativo a Promises.
* **Módulo Nativo Crypto (Node.js)**:
  * **AES-256-GCM**: Criptografia autenticada para dados confidenciais (CPF), armazenando valor criptografado, vetor de inicialização (`iv`) e tag de autenticação (`tag`).
  * **scrypt & Salt aleatório**: Algoritmo robusto de derivação de chave para proteção e verificação de senhas de usuários contra ataques de força bruta e tabelas rainbow.
* **dotenv** — Gerenciamento seguro de variáveis de ambiente.
* **Nodemon** — Reinicialização automática em ambiente de desenvolvimento.

---

## 🔐 Segurança e Criptografia

A API implementa proteção em repouso (*at-rest*) para dados pessoais sensíveis dos usuários cadastrados:

| Dado | Mecanismo | Armazenamento no Banco |
|---|---|---|
| **CPF** | Criptografia Simétrica `AES-256-GCM` | `VARBINARY(32)` (dado cifrado), `BINARY(12)` (IV) e `BINARY(16)` (Auth Tag) |
| **Senha** | Hash com Salt via função `scrypt` | `BINARY(64)` (hash da senha) e `BINARY(16)` (salt aleatório) |

> Nas consultas de usuários (`GET`), o CPF é automaticamente descriptografado em memória para exibição, enquanto senhas, hashes e salts **nunca são expostos** nas respostas da API.

---

## ⚙️ Instalação e Configuração

### 1. Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (v18 ou superior recomendado).
- Servidor [MySQL](https://www.mysql.com/) ativo e em execução.

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
   Crie um arquivo `.env` na raiz da pasta `backend/` a partir do modelo `.env.example`:
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
   API_PORT=3001
   CRYPTO_KEY= (Digite uma chave com 32 bytes (hexadecilmal de 64 caracteres))
   ```
   > **Dica:** `CRYPTO_KEY` deve ser uma chave hexadecimal de 32 bytes (64 caracteres hexadecimais). Você pode gerar uma nova chave executando no terminal:
   > ```bash
   > node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   > ```

4. **Inicialize o Banco de Dados:**
   Execute o script `src/config/script.sql` no seu MySQL via CLI ou cliente gráfico (DBeaver, MySQL Workbench, etc.):
   ```bash
   mysql -u root -p < src/config/script.sql
   ```
   > **Nota:** O script cria a base `Biblioteca`, as tabelas com integridade referencial (`ON DELETE CASCADE`), campos binários para segurança e dados simulados (seeds) para testes.

5. **Inicie a aplicação:**
   ```bash
   npm start
   ```
   O servidor estará disponível em: `http://localhost:3001` (ou na porta definida em `API_PORT`).

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
| `GET` | `/livros/autor/:id` | Lista todos os livros associados a um autor |
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
| `GET` | `/usuarios` | Lista todos os usuários (com CPF descriptografado) |
| `GET` | `/usuarios/:id` | Retorna os detalhes de um usuário específico |
| `POST` | `/usuarios` | Cadastra um usuário com criptografia de CPF e hash de senha |
| `PUT` | `/usuarios/:id` | Atualiza os dados de um usuário (suporta alteração de senha/CPF) |
| `DELETE` | `/usuarios/:id` | Remove um usuário pelo ID |

**Exemplo de corpo (POST):**
```json
{
  "nome_completo": "Maria Silva",
  "cpf": "123.456.789-00",
  "email": "maria.silva@email.com",
  "telefone": "(11) 98765-4321",
  "data_nascimento": "1995-05-15",
  "senha": "senhaSegura123"
}
```

**Exemplo de resposta (GET /usuarios/:id):**
```json
{
  "id": 1,
  "cpf": "123.456.789-00",
  "nome_completo": "Maria Silva",
  "data_nascimento": "1995-05-15",
  "email": "maria.silva@email.com",
  "telefone": 11987654321
}
```

---

### 🔄 Empréstimos (`/emprestimos`)

Os endpoints de consulta de empréstimos realizam junções relacionais (`JOINs`) com as tabelas de **Usuários**, **Livros** e **Autores**, retornando os dados detalhados e consolidados do empréstimo.

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/emprestimos` | Lista todos os empréstimos com nomes de usuário, livro e autores |
| `GET` | `/emprestimos/:id` | Retorna os dados completos de um empréstimo por ID |
| `GET` | `/emprestimos/livro/:id` | Lista os empréstimos vinculados a um livro específico |
| `POST` | `/emprestimos` | Registra um novo empréstimo |
| `PUT` | `/emprestimos/:id` | Atualiza as informações de um empréstimo |
| `DELETE` | `/emprestimos/:id` | Remove o registro de um empréstimo |

**Exemplo de corpo para cadastro (POST / PUT):**
```json
{
  "data_emprestimo": "2026-10-01",
  "data_devolucao": "2026-10-15",
  "usuarios_id": 1,
  "livros_id": 1
}
```

**Exemplo de resposta detalhada (GET /emprestimos ou GET /emprestimos/:id):**
```json
{
  "id_Emprestimos": 1,
  "nome_Usuarios": "Maria Silva",
  "nome_Livros": "A Guerra dos Boletos",
  "nome_Autores": "Jorge R. R. Serasa",
  "data_emprestimo": "2026-10-01",
  "data_devolucao": "2026-10-15"
}
```

---

## 📋 Códigos de Status HTTP

| Código | Significado | Situação de Uso |
|---|---|---|
| `200 OK` | Sucesso | Retorno em consultas (`GET`), atualizações (`PUT`) e exclusões (`DELETE`) |
| `201 Created` | Criado | Retorno na criação bem-sucedida de registros (`POST`) |
| `404 Not Found` | Não Encontrado | Recurso solicitado não existe no banco de dados |
| `500 Internal Server Error` | Erro Interno | Falha na execução da requisição ou comunicação com o banco |

**Exemplo de resposta de erro (404):**
```json
{
  "mensagem": "Empréstimo não encontrado!"
}
```