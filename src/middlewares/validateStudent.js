const AppError = require('../utils/AppError');

// Payload validation middleware for POST and PUT requests
const validateStudent = (req, res, next) => {
    const { Name, EnrollmentNo, Course, Semester, Branch, ScholarNo, PhoneNo, Email } = req.body;

    if (!Name || typeof Name !== 'string' || Name.trim() === '') {
        return next(new AppError('Bad Request: Student name is required.', 400));
    }
    if (!EnrollmentNo || typeof EnrollmentNo !== 'string') {
        return next(new AppError('Bad Request: Enrolment no is required.', 400));
    }
    if (!Course || typeof Course !== 'string') {
        return next(new AppError('Bad Request: Course is required.', 400));
    }
    if (!Semester || typeof Semester !== 'number') {
        return next(new AppError('Bad Request: Semester must be a number.', 400));
    }
    if (!Branch || typeof Branch !== 'string') {
        return next(new AppError('Bad Request: Branch is required.', 400));
    }
    if (!ScholarNo || typeof ScholarNo !== 'string') {
        return next(new AppError('Bad Request: Scholar no is required.', 400));
    }
    if (!PhoneNo || typeof PhoneNo !== 'string') {
        return next(new AppError('Bad Request: Phone number is required.', 400));
    }
    if (!Email || typeof Email !== 'string') {
        return next(new AppError('Bad Request: College mail is required.', 400));
    }
    
    next(); 
};

module.exports = validateStudent;