const express = require("express");
const router = express.Router();
const generosController = require("../controllers/generosControllers");

router.get("/generos", generosController.listarGeneros);
router.get("/generos/:id", generosController.pesquisarGenero);
router.post("/generos", generosController.criarGenero);
router.put("/generos/:id", generosController.atualizarGenero);
router.delete("/generos/:id", generosController.deletarGenero);

module.exports = router;