const express = require("express");
const router = express.Router();
const mainService = require("../services/mainService");

router.get("/", mainService.getMain);
router.get("/noticias", mainService.getNoticias(,,"api"));
router.get("/novas", mainService.getNovas);

module.exports = router;
