const express = require("express");
const app = express();

const autoresRoute = require("./routes/autoresRoutes");
const emprestimosRoute = require("./routes/emprestimosRoutes");
const generosRoute = require("./routes/generosRoutes");
const livrosRoute = require("./routes/livrosRoutes");
const usuariosRoute = require("./routes/usuariosRoutes");

app.use(express.json());
app.use(autoresRoute);
app.use(emprestimosRoute);
app.use(generosRoute);
app.use(livrosRoute);
app.use(usuariosRoute);

module.exports = app;