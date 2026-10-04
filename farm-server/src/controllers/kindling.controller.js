const kindlingService = require("../services/kindling.service");

const createKindling = async (req, res) => {
    try {
        const kindling = await kindlingService.createKindling(req.body);
        res.status(201).json(kindling);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getKindlings = async (req, res) => {
    try {
        const kindlings = await kindlingService.getKindlings();
        res.status(200).json(kindlings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getKindlingsByRabbit = async (req, res) => {
    try {
        const kindlings = await kindlingService.getKindlingsByRabbit(req.params.rabbitId);
        res.status(200).json(kindlings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getKindling = async (req, res) => {
    try {
        const kindling = await kindlingService.getKindling(req.params.id);
        res.status(200).json(kindling);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateKindling = async (req, res) => {
    try {
        const updatedKindling = await kindlingService.updateKindling(req.params.id, req.body);
        res.status(200).json(updatedKindling);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { 
    createKindling,
    getKindlings,
    getKindlingsByRabbit,
    getKindling,
    updateKindling
 };