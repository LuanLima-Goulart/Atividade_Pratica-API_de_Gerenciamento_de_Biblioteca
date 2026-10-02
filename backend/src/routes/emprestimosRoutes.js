const express = require("express");
const router = express.Router();
const emprestimosController = require("../controllers/emprestimosControllers");

router.get("/emprestimos", emprestimosController.listarEmprestimos);
router.get("/emprestimos/livro/:id", emprestimosController.buscarEmprestimosPorLivro);
router.get("/emprestimos/:id", emprestimosController.pesquisarEmprestimo);
router.post("/emprestimos", emprestimosController.criarEmprestimo);
router.put("/emprestimos/:id", emprestimosController.atualizarEmprestimo);
router.delete("/emprestimos/:id", emprestimosController.deletarEmprestimo);

module.exports = router;