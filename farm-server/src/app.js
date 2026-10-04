const express = require('express');
const cors = require('cors');
const rabbitRoutes = require('./routes/rabbit.routes');
const weightHistoryRoutes = require("./routes/weightHistory.routes");
const breedingRoutes = require("./routes/breeding.routes");
const kindlingRoutes = require("./routes/kindling.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/rabbits', rabbitRoutes);
app.use("/weight-history", weightHistoryRoutes);
app.use("/breedings", breedingRoutes);
app.use("/kindlings", kindlingRoutes);

module.exports = app;