const express = require("express");
const router = express.Router();
const livrosController = require("../controllers/livrosControllers");

router.get("/livros", livrosController.listarLivros);
router.get("/livros/autor/:id", livrosController.buscarLivrosPorAutor);
router.get("/livros/:id/emprestimos", livrosController.buscarEmprestimosPorLivro);
router.get("/livros/:id", livrosController.pesquisarLivro);
router.post("/livros", livrosController.criarLivro);
router.put("/livros/:id", livrosController.atualizarLivro);
router.delete("/livros/:id", livrosController.deletarLivro);

module.exports = router;