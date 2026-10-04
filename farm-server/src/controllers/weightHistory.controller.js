const weightHistoryService = require("../services/weightHistory.service");

const addWeight = async (req, res) => {
  try {
    const weight = await weightHistoryService.addWeight(req.body);

    res.status(201).json(weight);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRabbitWeights = async (req, res) => {
  try {
    const weights = await weightHistoryService.getRabbitWeights(
      req.params.id
    );

    res.status(200).json(weights);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getWeightGrowth = async (req, res) => {
  try {
    const weightGrowth = await weightHistoryService.getWeightGrowth(
      req.params.id
    );

    res.status(200).json(weightGrowth);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addWeight,
  getRabbitWeights,
  getWeightGrowth
};