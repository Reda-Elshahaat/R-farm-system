const express = require("express");

const router = express.Router();

const breedingController = require("../controllers/breeding.controller");

router.post("/", breedingController.createBreeding);
router.get("/:id", breedingController.getBreedingsByRabbit);
router.patch("/check/:id",breedingController.checkBreeding);

module.exports = router;