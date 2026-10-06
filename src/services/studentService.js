const { db } = require('../config/firebase');

const getAllStudents = async (query) => {
    try {
        const snapshot = await db.collection('students').get();
        let result = [];
        snapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
        });

        // Filtering logic
        if (query.course) {
            result = result.filter(s => s.course && s.course.toLowerCase().includes(query.course.toLowerCase()));
        }

        // Pagination logic
        const page = parseInt(query.page, 10) || 1;
        const limit = parseInt(query.limit, 10) || 50;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedResults = result.slice(startIndex, endIndex);

        return {
            total: result.length,
            page,
            limit,
            data: paginatedResults
        };
    } catch (error) {
        throw new Error("Error fetching students: " + error.message);
    }
};

const createStudent = async (data) => {
    try {
        const docRef = await db.collection('students').add(data);
        return { id: docRef.id, ...data };
    } catch (error) {
        throw new Error("Error creating student: " + error.message);
    }
};

const updateStudent = async (id, data) => {
    try {
        const docRef = db.collection('students').doc(id);
        const doc = await docRef.get();
        
        if (!doc.exists) {
            return null;
        }

        await docRef.update(data);
        return { id, ...doc.data(), ...data };
    } catch (error) {
        throw new Error("Error updating student: " + error.message);
    }
};

const deleteStudent = async (id) => {
    try {
        const docRef = db.collection('students').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return false;
        }

        await docRef.delete();
        return true;
    } catch (error) {
        throw new Error("Error deleting student: " + error.message);
    }
};

module.exports = { getAllStudents, createStudent, updateStudent, deleteStudent };