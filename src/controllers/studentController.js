const studentService = require('../services/studentService');
const sendResponse = require('../utils/responseFormatter');
const AppError = require('../utils/AppError');

// नाम को Title Case (पहला अक्षर कैपिटल, बाकी स्मॉल) में बदलने का फंक्शन
const formatNameToTitleCase = (name) => {
    return name.trim().split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

const getStudents = async (req, res, next) => {
    try {
        const result = await studentService.getAllStudents(req.query);
        sendResponse(res, 200, '200 OK: Students fetched successfully', result);
    } catch (error) {
        next(error);
    }
};

const addstudent = async (req, res, next) => {
    try {
        let { Name, EnrollmentNo, Course, Semester, Branch, ScholarNo, PhoneNo, Email } = req.body;

        // 1. नाम का फॉर्मेट ठीक करना (हर शब्द का पहला अक्षर कैपिटल)
        Name = formatNameToTitleCase(Name);

        // 2. सभी मौजूदा स्टूडेंट्स को फेच करें (डुप्लीकेट, कैपेसिटी और यूनिक चेक के लिए)
        const allData = await studentService.getAllStudents({});
        const studentsList = Array.isArray(allData) ? allData : (allData.data || allData.students || []);

        // 3. सेम ब्रांच में अगर नाम पहले से मौजूद है, तो (1), (2) जोड़ना
        const sameBranchStudents = studentsList.filter(s => (s.Branch || s.branch || '').toLowerCase() === Branch.toLowerCase());
        const matchingNames = sameBranchStudents.filter(s => {
            const existingName = (s.Name || s.name || '').replace(/\s*\(\d+\)$/, '').trim();
            return existingName.toLowerCase() === Name.toLowerCase();
        });

        if (matchingNames.length > 0) {
            Name = `${Name} (${matchingNames.length + 1})`;
        }
        req.body.Name = Name;

        // 4. एनरोलमेंट नंबर फॉर्मेट वैलिडेशन (उदा: 0108CS251001)
        const branchCodeMap = {
            'computer science engineering': 'CS', 'cse': 'CS', 'computer science': 'CS',
            'electronics & communication': 'EC', 'ece': 'EC', 'electronics': 'EC',
            'mechanical engineering': 'ME', 'mechanical': 'ME',
            'civil engineering': 'CE', 'civil': 'CE',
            'aiml': 'AI', 'artificial intelligence and machine learning': 'AI',
            'ai-ds': 'DS', 'aids': 'DS', 'artificial intelligence and data science': 'DS',
            'blockchain': 'BL',
            'cyber security': 'CY', 'cyber': 'CY'
        };

        const cleanBranchInput = Branch.trim().toLowerCase();
        const expectedBranchChars = branchCodeMap[cleanBranchInput] || Branch.trim().replace(/\s+/g, '').toUpperCase().slice(0, 2);
        
        const enrollmentRegex = new RegExp(`^0108${expectedBranchChars}2510(0[1-9]|[1-7][0-9]|8[0-3])$`);
        
        if (!enrollmentRegex.test(EnrollmentNo)) {
            return next(new AppError(`400 Bad Request: एनरोलमेंट नंबर का फॉर्मेट गलत है! सही फॉर्मेट '0108${expectedBranchChars}2510XX' (जहाँ XX = 01 से 83) होना चाहिए।`, 400));
        }

        // 5. स्कॉलर नंबर वैलिडेशन (5 डिजिट, शुरुआत '36' से और पूरे इंस्टिट्यूट में ग्लोबल यूनिक होना चाहिए)
        const scholarStr = ScholarNo ? ScholarNo.toString().trim() : '';
        const scholarRegex = /^36\d{3}$/;
        if (!scholarRegex.test(scholarStr)) {
            return next(new AppError('400 Bad Request: स्कॉलर नंबर ठीक 5 अंकों का होना चाहिए और इसकी शुरुआत 36 से होनी अनिवार्य है!', 400));
        }

        // ग्लोबल यूनिक स्कॉलर नंबर चेक (चाहे किसी भी ब्रांच का हो)
        const existingScholar = studentsList.find(s => (s.ScholarNo || s.scholarNo || '').toString() === scholarStr);
        if (existingScholar) {
            return next(new AppError('400 Bad Request: यह Scholar Number पहले से ही किसी अन्य स्टूडेंट को आवंटित किया जा चुका है!', 400));
        }

        // 6. डुप्लीकेट एनरोलमेंट चेक (400 Bad Request)
        const existingEnrollment = studentsList.find(s => (s.EnrollmentNo || s.enrolmentNo) === EnrollmentNo);
        if (existingEnrollment) {
            return next(new AppError('400 Bad Request: यह Enrollment Number पहले से मौजूद है!', 400));
        }

        // 7. ब्रांच कैपेसिटी चेक (प्रत्येक ब्रांच में अधिकतम 83 स्टूडेंट्स)
        if (sameBranchStudents.length >= 83) {
            return next(new AppError('400 Bad Request: इस ब्रांच की कैपेसिटी (83 स्टूडेंट्स) पूरी हो चुकी है!', 400));
        }

        // 8. फोन नंबर वैलिडेशन (ठीक 9 डिजिट)
        if (!PhoneNo || PhoneNo.toString().length !== 9) {
            return next(new AppError('400 Bad Request: फोन नंबर ठीक 9 अंकों का होना अनिवार्य है!', 400));
        }

        // 9. ईमेल फॉर्मेट वैलिडेशन (पहला नाम + ब्रांच + @gmail.com)
        const firstName = Name.trim().split(' ')[0].toLowerCase();
        const branchClean = Branch.replace(/\s+/g, '').toLowerCase();
        const expectedEmail = `${firstName}${branchClean}@gmail.com`;

        if (Email.trim().toLowerCase() !== expectedEmail) {
            return next(new AppError(`400 Bad Request: ईमेल का फॉर्मेट गलत है! सही फॉर्मेट यह होना चाहिए: ${expectedEmail}`, 400));
        }

        // सभी नियम पास होने पर नया स्टूडेंट बनाएं (201 Created)
        const newStudent = await studentService.createStudent(req.body);
        sendResponse(res, 201, '201 Created: Student created successfully', newStudent);
    } catch (error) {
        next(error);
    }
};

const updatestudent = async (req, res, next) => {
    try {
        const studentId = req.params.id;
        let { Name, EnrollmentNo, Branch, ScholarNo, PhoneNo, Email } = req.body;

        // 1. नाम का फॉर्मेट ठीक करना
        Name = formatNameToTitleCase(Name);

        // 2. सभी मौजूदा स्टूडेंट्स की लिस्ट फेच करें
        const allData = await studentService.getAllStudents({});
        const studentsList = Array.isArray(allData) ? allData : (allData.data || allData.students || []);

        // 3. अपडेट करते समय सेम ब्रांच में नाम टकराव चेक करना (खुद को छोड़कर)
        const sameBranchStudents = studentsList.filter(s => 
            (s.Branch || s.branch || '').toLowerCase() === Branch.toLowerCase() && 
            (s.id || s._id).toString() !== studentId.toString()
        );
        const matchingNames = sameBranchStudents.filter(s => {
            const existingName = (s.Name || s.name || '').replace(/\s*\(\d+\)$/, '').trim();
            return existingName.toLowerCase() === Name.toLowerCase();
        });

        if (matchingNames.length > 0) {
            Name = `${Name} (${matchingNames.length + 1})`;
        }
        req.body.Name = Name;

        // 4. एनरोलमेंट नंबर फॉर्मेट वैलिडेशन
        const branchCodeMap = {
            'computer science engineering': 'CS', 'cse': 'CS', 'computer science': 'CS',
            'electronics & communication': 'EC', 'ece': 'EC', 'electronics': 'EC',
            'mechanical engineering': 'ME', 'mechanical': 'ME',
            'civil engineering': 'CE', 'civil': 'CE',
            'aiml': 'AI', 'artificial intelligence and machine learning': 'AI',
            'ai-ds': 'DS', 'aids': 'DS', 'artificial intelligence and data science': 'DS',
            'blockchain': 'BL',
            'cyber security': 'CY', 'cyber': 'CY'
        };

        const cleanBranchInput = Branch.trim().toLowerCase();
        const expectedBranchChars = branchCodeMap[cleanBranchInput] || Branch.trim().replace(/\s+/g, '').toUpperCase().slice(0, 2);
        
        const enrollmentRegex = new RegExp(`^0108${expectedBranchChars}2510(0[1-9]|[1-7][0-9]|8[0-3])$`);
        
        if (!enrollmentRegex.test(EnrollmentNo)) {
            return next(new AppError(`400 Bad Request: एनरोलमेंट नंबर का फॉर्मेट गलत है! सही फॉर्मेट '0108${expectedBranchChars}2510XX' (जहाँ XX = 01 से 83) होना चाहिए।`, 400));
        }

        // 5. स्कॉलर नंबर वैलिडेशन (ग्लोबल यूनिक चेक)
        const scholarStr = ScholarNo ? ScholarNo.toString().trim() : '';
        const scholarRegex = /^36\d{3}$/;
        if (!scholarRegex.test(scholarStr)) {
            return next(new AppError('400 Bad Request: स्कॉलर नंबर ठीक 5 अंकों का होना चाहिए और इसकी शुरुआत 36 से होनी अनिवार्य है!', 400));
        }

        const existingScholar = studentsList.find(s => 
            (s.ScholarNo || s.scholarNo || '').toString() === scholarStr && 
            (s.id || s._id).toString() !== studentId.toString()
        );
        if (existingScholar) {
            return next(new AppError('400 Bad Request: यह Scholar Number पहले से ही किसी अन्य स्टूडेंट को आवंटित किया जा चुका है!', 400));
        }

        // 6. डुप्लीकेट एनरोलमेंट चेक
        const existingEnrollment = studentsList.find(s => 
            (s.EnrollmentNo || s.enrolmentNo) === EnrollmentNo && 
            (s.id || s._id).toString() !== studentId.toString()
        );
        if (existingEnrollment) {
            return next(new AppError('400 Bad Request: यह Enrollment Number किसी अन्य स्टूडेंट का पहले से मौजूद है!', 400));
        }

        // 7. फोन नंबर वैलिडेशन
        if (!PhoneNo || PhoneNo.toString().length !== 9) {
            return next(new AppError('400 Bad Request: फोन नंबर ठीक 9 अंकों का होना अनिवार्य है!', 400));
        }

        // 8. ईमेल फॉर्मेट वैलिडेशन
        const firstName = Name.trim().split(' ')[0].toLowerCase();
        const branchClean = Branch.replace(/\s+/g, '').toLowerCase();
        const expectedEmail = `${firstName}${branchClean}@gmail.com`;

        if (Email.trim().toLowerCase() !== expectedEmail) {
            return next(new AppError(`400 Bad Request: ईमेल का फॉर्मेट गलत है! सही फॉर्मेट यह होना चाहिए: ${expectedEmail}`, 400));
        }

        // सभी नियम पास होने पर स्टूडेंट अपडेट करें (200 OK)
        const updatedStudent = await studentService.updateStudent(studentId, req.body);
        if (!updatedStudent) {
            return next(new AppError('404 Not Found: Student not found', 404));
        }
        
        sendResponse(res, 200, '200 OK: Student updated successfully', updatedStudent);
    } catch (error) {
        next(error);
    }
};

const removestudent = async (req, res, next) => {
    try {
        const isDeleted = await studentService.deleteStudent(req.params.id);
        if (!isDeleted) {
            return next(new AppError('404 Not Found: Student not found', 404));
        }
        sendResponse(res, 200, '200 OK: Student deleted successfully');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStudents,
    addstudent,
    updatestudent,
    removestudent
};