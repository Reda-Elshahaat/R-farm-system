const breedingService = require("../services/breeding.service");

const createBreeding = async (req, res) => {
  try {
    const breeding = await breedingService.createBreeding(req.body);

    res.status(201).json(breeding);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const checkBreeding = async (req, res) => {
  try {
    const { status } = req.body;

    const breeding = await breedingService.checkBreeding(
      req.params.id,
      status
    );

    res.status(200).json(breeding);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getPregnantBreedings = async (req, res) => {
  try {
    const breedings = await breedingService.getPregnantBreedings();

    res.status(200).json(breedings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBreedingsByRabbit = async (req, res) => {
  try {
    const breedings = await breedingService.getBreedingsByRabbit(req.params.id);

    res.status(200).json(breedings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBreeding,
  checkBreeding,
  getPregnantBreedings,
  getBreedingsByRabbit
};