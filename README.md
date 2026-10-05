# 📚 API de Gerenciamento de Biblioteca



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


## 🛠️ Tecnologias Utilizadas

- **Framework Web:** [Express](https://expressjs.com/) (v5)#aire*a```bash
   cp .env.example .env
   ```Preencha os valores de acordo com seu ambiente:
   ```env
   DB_HOST=loca

PI_PORT=3000u MySQL via CLI ou cliente gráfico (DBeaver, MySQL Workbench):
   ```bash
   mysql -u root -p < src/config/script.sql
```

   ```bash
   npm start

i

### ✍️ Autores (`/autores`)

| `PUT` | `/aorpo (POST / PUT):**
n
  "nome_completo": "Machado de Assis", 

| `DELETE` | `/generos/:id` | Remove um gênero pelo ID |


|---|---|---|
GET` | `/livros` | Lista todos os livros cadastrados |
| `GET` | `/livros/autor/:id` | Lista todos os livros de um autor |
emprestimos` | Lista o histórico de empréstimos do livro |
| `PUT` |pT):**


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