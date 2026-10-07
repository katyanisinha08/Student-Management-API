let allStudentsData = [];
let currentFilter = 'all';

// --- 1. नेविगेशन और सेक्शन स्विचिंग ---
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('loggedInUser') || "Gaurav";
    const profileNameEl = document.getElementById('profile-name');
    const profileAvatarEl = document.getElementById('profile-avtar');
    
    if (profileNameEl) profileNameEl.innerText = savedUser;
    if (profileAvatarEl) profileAvatarEl.innerText = savedUser.charAt(0).toUpperCase();

    fetchStudents();

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');

            const target = link.getAttribute('data-section');
            if (target === 'dashboard') {
                switchSection('dashboard');
            } else if (target === 'students') {
                currentFilter = 'all';
                document.getElementById('table-title').innerText = "All Students List";
                switchSection('students');
                renderTable(allStudentsData);
            } else if (target === 'cse-students') {
                currentFilter = 'CSE';
                document.getElementById('table-title').innerText = "Computer Science Engineering (CSE) Students";
                switchSection('students');
                const filtered = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('computer science') || (s.Branch || s.branch || '').toLowerCase().includes('cse'));
                renderTable(filtered);
            } else if (target === 'ece-students') {
                currentFilter = 'ECE';
                document.getElementById('table-title').innerText = "Electronics & Communication (ECE) Students";
                switchSection('students');
                const filtered = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('electronics') || (s.Branch || s.branch || '').toLowerCase().includes('ece'));
                renderTable(filtered);
            } else if (target === 'mech-students') {
                currentFilter = 'Mechanical';
                document.getElementById('table-title').innerText = "Mechanical Engineering Students";
                switchSection('students');
                const filtered = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('mechanical'));
                renderTable(filtered);
            } else if (target === 'civil-students') {
                currentFilter = 'Civil';
                document.getElementById('table-title').innerText = "Civil Engineering Students";
                switchSection('students');
                const filtered = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('civil'));
                renderTable(filtered);
            } else if (target === 'aiml-students') {
                currentFilter = 'AIML';
                document.getElementById('table-title').innerText = "AIML Students";
                switchSection('students');
                const filtered = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('aiml'));
                renderTable(filtered);
            } else if (target === 'aids-students') {
                currentFilter = 'AI-DS';
                document.getElementById('table-title').innerText = "AI-DS Students";
                switchSection('students');
                const filtered = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('ai-ds') || (s.Branch || s.branch || '').toLowerCase().includes('aids'));
                renderTable(filtered);
            } else if (target === 'blockchain-students') {
                currentFilter = 'Blockchain';
                document.getElementById('table-title').innerText = "Blockchain Students";
                switchSection('students');
                const filtered = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('blockchain'));
                renderTable(filtered);
            } else if (target === 'cyber-students') {
                currentFilter = 'Cyber Security';
                document.getElementById('table-title').innerText = "Cyber Security Students";
                switchSection('students');
                const filtered = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('cyber'));
                renderTable(filtered);
            } else if (target === 'add-student') {
                switchSection('add-student');
            }
        });
    });

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', searchStudents);
    }
});

function switchSection(sectionName) {
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('students-section').style.display = 'none';
    document.getElementById('add-student-section').style.display = 'none';
    document.getElementById('edit-student-section').style.display = 'none';

    if (sectionName === 'dashboard') {
        document.getElementById('dashboard-section').style.display = 'block';
        updateDashboardStats();
    } else if (sectionName === 'students') {
        document.getElementById('students-section').style.display = 'block';
    } else if (sectionName === 'add-student') {
        document.getElementById('add-student-section').style.display = 'block';
    } else if (sectionName === 'edit-student') {
        document.getElementById('edit-student-section').style.display = 'block';
    }
}

// --- 2. डेटा फेच करना और डैशबोर्ड अपडेट करना ---
async function fetchStudents() {
    try {
        const response = await fetch('/api/students');
        const resultData = await response.json();

        if (Array.isArray(resultData)) {
            allStudentsData = resultData;
        } else if (resultData.data && Array.isArray(resultData.data)) {
            allStudentsData = resultData.data;
        } else if (resultData.students && Array.isArray(resultData.students)) {
            allStudentsData = resultData.students;
        } else {
            allStudentsData = Object.values(resultData.data || resultData).find(val => Array.isArray(val)) || [];
        }

        updateDashboardStats();
        renderTable(allStudentsData);
    } catch (error) {
        console.error("डेटा फेच करने में त्रुटि:", error);
    }
}

function updateDashboardStats() {
    const total = allStudentsData.length;
    
    const cseCount = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('computer science') || (s.Branch || s.branch || '').toLowerCase().includes('cse')).length;
    const eceCount = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('electronics') || (s.Branch || s.branch || '').toLowerCase().includes('ece')).length;
    const mechCount = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('mechanical')).length;
    const civilCount = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('civil')).length;
    const aimlCount = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('aiml')).length;
    const aidsCount = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('ai-ds') || (s.Branch || s.branch || '').toLowerCase().includes('aids')).length;
    const blockchainCount = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('blockchain')).length;
    const cyberCount = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('cyber')).length;

    if(document.getElementById('total-count')) document.getElementById('total-count').innerText = total;
    if(document.getElementById('cse-count')) document.getElementById('cse-count').innerText = cseCount;
    if(document.getElementById('ece-count')) document.getElementById('ece-count').innerText = eceCount;
    if(document.getElementById('mech-count')) document.getElementById('mech-count').innerText = mechCount;
    if(document.getElementById('civil-count')) document.getElementById('civil-count').innerText = civilCount;
    if(document.getElementById('aiml-count')) document.getElementById('aiml-count').innerText = aimlCount;
    if(document.getElementById('aids-count')) document.getElementById('aids-count').innerText = aidsCount;
    if(document.getElementById('blockchain-count')) document.getElementById('blockchain-count').innerText = blockchainCount;
    if(document.getElementById('cyber-count')) document.getElementById('cyber-count').innerText = cyberCount;
}

// --- 3. टेबल रेंडर करना और अल्फाबेटिकल सॉर्टिंग (A to Z) ---
function renderTable(studentsArray) {
    const tbody = document.getElementById('student-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (studentsArray.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; color: #777;">कोई स्टूडेंट नहीं मिला</td></tr>`;
        return;
    }

    const sortedStudents = [...studentsArray].sort((a, b) => {
        const nameA = (a.Name || a.name || '').toLowerCase();
        const nameB = (b.Name || b.name || '').toLowerCase();
        return nameA.localeCompare(nameB);
    });

    sortedStudents.forEach((student, index) => {
        const studentId = student.id || student._id || 'N/A';
        const enrollmentNo = student.EnrollmentNo || student.enrolmentNo || 'N/A';
        const scholarNo = student.ScholarNo || student.scholarNo || 'N/A';
        const phoneNo = student.PhoneNo || student.phoneNo || 'N/A';
        const branch = student.Branch || student.branch || 'N/A';

        const row = `<tr>
            <td>${index + 1}</td>
            <td>${student.Name || student.name || 'N/A'}</td>
            <td>${enrollmentNo}</td>
            <td>${student.Course || student.course || 'N/A'}</td>
            <td>${student.Semester || student.semester || 'N/A'}</td>
            <td>${branch}</td>
            <td>${scholarNo}</td>
            <td>${phoneNo}</td>
            <td>${student.Email || student.email || 'N/A'}</td>
            <td>
                <button onclick='openEditForm(${JSON.stringify(student)})' style="background: #ffc107; color: black; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; margin-right: 5px;">Edit</button>
                <button onclick="deleteStudent('${studentId}')" style="background: #dc3545; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;">Delete</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// --- 4. सर्च फंक्शन (फुल्ली फिक्सड) ---
function searchStudents() {
    const searchInputEl = document.getElementById('search-input');
    if (!searchInputEl) return;
    
    const query = searchInputEl.value.toLowerCase().trim();
    
    let baseData = allStudentsData;
    if (currentFilter === 'CSE') {
        baseData = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('computer science') || (s.Branch || s.branch || '').toLowerCase().includes('cse'));
    } else if (currentFilter === 'ECE') {
        baseData = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('electronics') || (s.Branch || s.branch || '').toLowerCase().includes('ece'));
    } else if (currentFilter === 'Mechanical') {
        baseData = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('mechanical'));
    } else if (currentFilter === 'Civil') {
        baseData = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('civil'));
    } else if (currentFilter === 'AIML') {
        baseData = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('aiml'));
    } else if (currentFilter === 'AI-DS') {
        baseData = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('ai-ds') || (s.Branch || s.branch || '').toLowerCase().includes('aids'));
    } else if (currentFilter === 'Blockchain') {
        baseData = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('blockchain'));
    } else if (currentFilter === 'Cyber Security') {
        baseData = allStudentsData.filter(s => (s.Branch || s.branch || '').toLowerCase().includes('cyber'));
    }

    const filtered = baseData.filter(s => 
        (s.Name || s.name || '').toLowerCase().includes(query) ||
        (s.EnrollmentNo || s.enrolmentNo || '').toLowerCase().includes(query) ||
        (s.Email || s.email || '').toLowerCase().includes(query) ||
        (s.ScholarNo || s.scholarNo || '').toLowerCase().includes(query)
    );
    
    // अगर यूजर कुछ टाइप कर रहा है, तो ऑटोमैटिकली स्टूडेंट्स वाली टेबल दिखा दें
    if(query.length > 0) {
        document.getElementById('dashboard-section').style.display = 'none';
        document.getElementById('students-section').style.display = 'block';
        document.getElementById('add-student-section').style.display = 'none';
        document.getElementById('edit-student-section').style.display = 'none';
    }

    renderTable(filtered);
}

// --- 5. नया स्टूडेंट जोड़ना (POST विद स्टेटस कोड अलर्ट्स) ---
const addStudentForm = document.getElementById('add-student-form');
if (addStudentForm) {
    addStudentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newStudent = {
            Name: document.getElementById('student-name').value,
            EnrollmentNo: document.getElementById('student-enrollment').value,
            Course: document.getElementById('student-course').value,
            Semester: Number(document.getElementById('student-semester').value),
            Branch: document.getElementById('student-branch').value,
            ScholarNo: String(document.getElementById('student-scholarno').value),
            PhoneNo: String(document.getElementById('student-phone').value),
            Email: document.getElementById('student-email').value
        };

        try {
            const response = await fetch('/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStudent)
            });

            const result = await response.json();

            if (response.ok) {
                alert(`Status: ${response.status} OK - ${result.message || 'सफलतापूर्वक जोड़ दिया गया है!'}`);
                addStudentForm.reset();
                await fetchStudents();
                switchSection('dashboard');
            } else {
                alert(`Status: ${response.status} Error - ${result.message || result.error || 'अमान्य डेटा (Invalid Data)'}`);
            }
        } catch (err) {
            console.error(err);
            alert("Status: 500 Internal Server Error - सर्वर से कनेक्ट करने में विफल!");
        }
    });
}

// --- 6. एडिट/अपडेट फॉर्म ---
function openEditForm(student) {
    switchSection('edit-student');

    document.getElementById('edit-student-id').value = student.id || student._id;
    document.getElementById('edit-name').value = student.Name || student.name || '';
    document.getElementById('edit-enrollment').value = student.EnrollmentNo || student.enrolmentNo || '';
    document.getElementById('edit-course').value = student.Course || student.course || '';
    document.getElementById('edit-semester').value = student.Semester || student.semester || '';
    document.getElementById('edit-branch').value = student.Branch || student.branch || '';
    document.getElementById('edit-scholarno').value = student.ScholarNo || student.scholarNo || '';
    document.getElementById('edit-phone').value = student.PhoneNo || student.phoneNo || '';
    document.getElementById('edit-email').value = student.Email || student.email || '';
}

const editStudentForm = document.getElementById('edit-student-form');
if (editStudentForm) {
    editStudentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const studentId = document.getElementById('edit-student-id').value;
        const updatedData = {
            Name: document.getElementById('edit-name').value,
            EnrollmentNo: document.getElementById('edit-enrollment').value,
            Course: document.getElementById('edit-course').value,
            Semester: Number(document.getElementById('edit-semester').value),
            Branch: document.getElementById('edit-branch').value,
            ScholarNo: String(document.getElementById('edit-scholarno').value),
            PhoneNo: String(document.getElementById('edit-phone').value),
            Email: document.getElementById('edit-email').value
        };

        try {
            const response = await fetch(`api/students/${studentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });

            const result = await response.json();

            if (response.ok) {
                alert(`Status: ${response.status} OK - ${result.message || 'सफलतापूर्वक अपडेट हो गया है!'}`);
                await fetchStudents();
                switchSection('students');
            } else {
                alert(`Status: ${response.status} Error - ${result.message || result.error || 'अपडेट करने में विफल!'}`);
            }
        } catch (err) {
            console.error(err);
            alert("Status: 500 Internal Server Error - सर्वर से कनेक्ट करने में विफल!");
        }
    });
}

// --- 7. डिलीट फंक्शन ---
async function deleteStudent(id) {
    if (!confirm("क्या आप वाकई इसे डिलीट करना चाहते हैं?")) return;
    try {
        const response = await fetch(`/api/students/${id}`, { method: 'DELETE' });
        const result = await response.json();

        if (response.ok) {
            alert(`Status: ${response.status} OK - ${result.message || 'सफलतापूर्वक डिलीट हो गया!'}`);
            await fetchStudents();
        } else {
            alert(`Status: ${response.status} Error - ${result.message || result.error || 'डिलीट करने में विफल!'}`);
        }
    } catch (err) {
        console.error(err);
        alert("Status: 500 Internal Server Error");
    }
}

// --- 8. लॉगआउट ---
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
}