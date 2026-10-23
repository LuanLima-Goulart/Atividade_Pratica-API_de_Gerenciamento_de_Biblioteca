const express = require("express");
const router = express.Router();
const livrosController = require("../controllers/livrosControllers");

router.get("/", livrosController.listarLivros);
router.get("/autor/:id", livrosController.buscarLivrosPorAutor);
router.get("/:id/emprestimos", livrosController.buscarEmprestimosPorLivro);
router.get("/:id", livrosController.pesquisarLivro);
router.post("/", livrosController.criarLivro);
router.put("/:id", livrosController.atualizarLivro);
router.delete("/:id", livrosController.deletarLivro);

module.exports = router;