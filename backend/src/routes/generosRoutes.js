const express = require("express");
const router = express.Router();
const generosController = require("../controllers/generosControllers");

router.get("/", generosController.listarGeneros);
router.get("/:id", generosController.pesquisarGenero);
router.post("/", generosController.criarGenero);
router.put("/:id", generosController.atualizarGenero);
router.delete("/:id", generosController.deletarGenero);

module.exports = router;