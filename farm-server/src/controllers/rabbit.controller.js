const rabbitService = require("../services/rabbit.service");

const createRabbit = async (req, res) => {
    try {
        const newRabbit = await rabbitService.createRabbit(req.body);
        res.status(201).json(newRabbit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getRabbits = async (req, res) => {
    try {
        const rabbits = await rabbitService.getRabbits();
        res.status(200).json(rabbits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getRabbit = async (req, res) => {
    try {
        const rabbit = await rabbitService.getRabbit(req.params.id);
        res.status(200).json(rabbit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateRabbit = async (req, res) => {
    try {
        const updatedRabbit = await rabbitService.updateRabbit(req.params.id, req.body);
        res.status(200).json(updatedRabbit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const canBreed = async (req, res) => {
    try {
        const rabbit = await rabbitService.canBreed(req.params.maleCode, req.params.femaleCode);
        res.status(200).json(rabbit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getRabbitDetails = async (req, res) => {
    try {
        const rabbit = await rabbitService.getRabbitDetails(req.params.id);
        res.status(200).json(rabbit);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}


module.exports = {
    createRabbit,
    getRabbits,
    getRabbit,
    updateRabbit,
    canBreed,
    getRabbitDetails
};