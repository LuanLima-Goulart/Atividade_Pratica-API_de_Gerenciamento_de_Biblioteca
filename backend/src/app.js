const express = require("express");
const app = express();

const autoresRoute = require("./routes/autoresRoutes");

app.use(express.json());
app.use(autoresRoute);

module.exports = app;