const express = require("express");
const router = express.Router();

const rabbitController = require("../controllers/rabbit.controller");

router.post("/", rabbitController.createRabbit);
router.get("/", rabbitController.getRabbits);
router.get("/can-breed/:maleCode/:femaleCode", rabbitController.canBreed);
router.get("/details/:id",rabbitController.getRabbitDetails)
router.get("/:id", rabbitController.getRabbit);
router.put("/:id", rabbitController.updateRabbit);

module.exports = router;