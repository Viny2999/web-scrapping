const express = require("express");
const router = express.Router();
const mainService = require("../services/mainService");

router.get("/", mainService.getMain);
router.get("/telefones/:endereco", mainService.getTelefones);
//router.put('/telefones/:telefone', mainService.updateDataModTelefones);
router.get('/atualizar/:telefone', mainService.updateDataModTelefones);
module.exports = router;