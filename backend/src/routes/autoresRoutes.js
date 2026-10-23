const express = require("express");
const router = express.Router();
const autoresController = require("../controllers/autoresControllers");

router.get("/", autoresController.listarAutores);
router.get("/:id", autoresController.pesquisarAutor);
router.post("/", autoresController.criarAutor);
router.put("/:id", autoresController.atualizarAutor);
router.delete("/:id", autoresController.deletarAutor);

module.exports = router;