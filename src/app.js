const path = require('path');
const express = require('express');
const studentRoutes = require('./routes/studentRoutes');
const globalErrorHandler = require('./middlewares/errorHandler');
const requestLogger = require('./middlewares/logger');
const AppError = require('./utils/AppError');

const app = express();

// Built-in Middleware for parsing JSON requests
app.use(express.json());
//Frontend folder ko serve krne k liye
app.use('/frontend',express.static(path.join(__dirname, '../frontend')));

// Custom Logger Middleware
app.use(requestLogger);

// Mount Routes
app.use('/api/students', studentRoutes);

// Handle Undefined Routes (404)
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handling Middleware (Always at the end)
app.use(globalErrorHandler);

module.exports = app;