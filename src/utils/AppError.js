// Custom error class to handle operational errors cleanly
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Identifies expected errors vs programming bugs
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;