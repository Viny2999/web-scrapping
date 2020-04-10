const express = require("express");
const router = express.Router();
const mainService = require("../services/mainService");

router.get("/", mainService.getMain);
router.get("/telefones/:endereco", mainService.getTelefones);
router.get('/observacoes/:telefone', mainService.getObservacao);
router.put('/observacoes/:telefone', mainService.updateDataModTelefones);
module.exports = router;