const express = require("express");


const router = express.Router();

const kindlingController = require("../controllers/kindling.controller");

router.post("/", kindlingController.createKindling);
router.get("/", kindlingController.getKindlings);

router.post("/offspring/:id", kindlingController.createOffspring);
router.get("/offspring/:id", kindlingController.getOffspringByKindling);

router.get("/rabbit/:rabbitId", kindlingController.getKindlingsByRabbit);
router.get("/:id", kindlingController.getKindling);
router.patch("/:id", kindlingController.updateKindling);

module.exports = router;