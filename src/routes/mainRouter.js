const express = require("express");
const router = express.Router();
const mainService = require("../services/main.service");
const usuarioService = require("../services/usuario.service");
const territorioService = require("../services/territorio.service");

router.get("/", mainService.getMain);

router.post("/login", usuarioService.login);
router.post('/users', usuarioService.postUser);
router.put('/users/:username', usuarioService.updateUser);
router.delete('/users/:username', usuarioService.deleteUser);

router.get("/telefones/:endereco", territorioService.getTelefones);
router.get('/observacoes/:telefone', territorioService.getObservacao);
router.put('/observacoes/:telefone', territorioService.updateDataModTelefones);
router.delete('/observacoes/:telefone', territorioService.deleteObservacao);

module.exports = router;