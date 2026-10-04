const express = require("express");

const router = express.Router();

const weightHistoryController = require(
  "../controllers/weightHistory.controller"
);

router.post("/", weightHistoryController.addWeight);

router.get(
  "/:id",
  weightHistoryController.getRabbitWeights
);

router.get(
  "/growth/:id",
  weightHistoryController.getWeightGrowth
);

module.exports = router;