const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosControllers");

router.get("/usuarios", usuariosController.listarUsuarios);
router.get("/usuarios/:id", usuariosController.pesquisarUsuario);
router.post("/usuarios", usuariosController.criarUsuario);
router.put("/usuarios/:id", usuariosController.atualizarUsuario);
router.delete("/usuarios/:id", usuariosController.deletarUsuario);

module.exports = router;