// Standardized JSON response wrapper to maintain consistency across the API
const sendResponse = (res, statusCode, message, data = null) => {
    const success = statusCode >= 200 && statusCode < 300;
    res.status(statusCode).json({
        success,
        message,
        data,
    });
};

module.exports = sendResponse;