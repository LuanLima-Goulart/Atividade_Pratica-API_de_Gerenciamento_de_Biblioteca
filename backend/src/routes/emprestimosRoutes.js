const express = require("express");
const router = express.Router();
const emprestimosController = require("../controllers/emprestimosControllers");

router.get("/", emprestimosController.listarEmprestimos);
router.get("/livro/:id", emprestimosController.buscarEmprestimosPorLivro);
router.get("/:id", emprestimosController.pesquisarEmprestimo);
router.post("/", emprestimosController.criarEmprestimo);
router.put("/:id", emprestimosController.atualizarEmprestimo);
router.delete("/:id", emprestimosController.deletarEmprestimo);

module.exports = router;