const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./Routes/products'); //import the module
const requestLogger = require('./middleware/logger');

// Load config
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(requestLogger);
app.use('/api/products', productRoutes);

app.listen(port, () => {
    console.log(`${process.env.SERVICE_NAME} running on http://localhost:${port}`);
});

// Place this AT THE END, after all routes
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error'});
});