const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const validateStudent = require('../middlewares/validateStudent');

// Routes for /api/students
router.route('/')
    .get(studentController.getStudents)
    .post(validateStudent, studentController.addstudent);

// Routes for /api/students/:id
router.route('/:id')
    .put(validateStudent, studentController.updatestudent)
    .delete(studentController.removestudent);

module.exports = router;