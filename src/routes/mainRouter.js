const express = require("express");
const router = express.Router();
const mainService = require("../services/mainService");

router.get("/", mainService.getMain);
router.get("/noticias", mainService.getNoticias);
router.get("/scrap", mainService.getNovas);
router.get("/download", mainService.download);

module.exports = router;
