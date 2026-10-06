const sendResponse = require('../utils/responseFormatter');

// Global error handling middleware to prevent app crashes
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Log the error for backend debugging
    console.error(`[ERROR] ${statusCode} - ${message}`);

    sendResponse(res, statusCode, message);
};

module.exports = globalErrorHandler;