const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const PORT = process.env.API_PORT || 3001;

const autoresRoute = require("./routes/autoresRoutes");
const emprestimosRoute = require("./routes/emprestimosRoutes");
const generosRoute = require("./routes/generosRoutes");
const livrosRoute = require("./routes/livrosRoutes");
const usuariosRoute = require("./routes/usuariosRoutes");

app.use(express.json());
app.use("/autores", autoresRoute);
app.use("/emprestimos", emprestimosRoute);
app.use("/generos", generosRoute);
app.use("/livros", livrosRoute);
app.use("/usuarios", usuariosRoute);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});