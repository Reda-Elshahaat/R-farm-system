const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const port = process.env.PORT || 4000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    } catch (error) {
        console.error("Failed to start server",error.message);
    }
};

startServer();
