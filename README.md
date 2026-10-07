# 🎓 Student Management System & API 

A robust, production-ready full-stack web application designed for comprehensive student record management and administrative control. Built with a modular Node.js/Express backend, cloud database integration, and a dynamic multi-page vanilla JavaScript frontend.

---

## 🌟 Core Features & Detailed Functionality

### 1. Modern Welcome & Landing Portal (`welcome.html`)
* Serves as the dynamic entry point featuring automated background image sliders (including college campus assets) and smooth UI transitions.

### 2. Secure Role-Based Authentication System (`login.html`)
* **Title Case Name Formatting:** Automatically formats user inputs into proper Title Case.
* **Smart Institutional Email Validation:** Enforces a strict professional email structure based on the user's role:
  - *Formula:* `[firstname]29@college.[role].sati.in`
* **Rule-Based Secure Password Verification:** Dynamically generates and validates secure passwords based on user credentials:
  - *Formula:* First 2 letters of name + `29co` + role code (`ad` for admin / `su` for superadmin) + `01`.
* **Role Management:** Supports distinct privileges for **Admin** and **Super Admin** roles, maintaining session state via browser `localStorage`.

### 3. Interactive Analytics Dashboard (`dashboard.html`)
* Real-time tracking and live calculation of total enrolled students.
* Branch-wise segregation and instant count cards for:
  - Computer Science Engineering (CSE)
  - Electronics & Communication (ECE)
  - Mechanical Engineering
  - Civil Engineering
  - AIML & AI-DS
  - Blockchain Technology
  - Cyber Security

### 4. Advanced Student Record Management (Full CRUD)
* **Create:** Add new students with detailed attributes including Full Name, Enrollment Number, Course, Semester, Branch, Scholar Number, Phone Number, College Email, and Parent Contact details.
* **Read & Alphabetical Sorting:** Renders dynamic tables with records automatically sorted alphabetically (**A to Z**) by student names.
* **Update / Edit:** Modify existing records seamlessly using pre-filled popup or dedicated form sections with `PUT` request handlers.
* **Delete:** Secure removal of obsolete records with confirmation alerts and HTTP status feedback.

### 5. Instant Real-Time Search Filtering
* Filter student records dynamically on the fly across all branches by typing names, enrollment numbers, emails, or scholar numbers.

---

## 🛠️ Tech Stack & Architecture

This project is built following a clean, scalable **MVC (Model-View-Controller)** modular architecture.

### 1. Frontend (Client-Side)
* **HTML5 & CSS3:** Semantic layouts, responsive grids, custom styling, and dynamic CSS animations.
* **Vanilla JavaScript (ES6+):** DOM manipulation, asynchronous API requests (`fetch`), client-side security validations, multi-section switching logic, and local storage state management.

### 2. Backend (Server-Side)
* **Node.js:** Server-side JavaScript runtime environment.
* **Express.js:** Fast and modular web framework used for defining RESTful API routes, middleware integration, and static asset serving.

### 3. Database & Cloud Integration
* **Firebase / Cloud Database:** Secure, real-time cloud data storage for persistent student records.
* **Environment Configuration:** Managed securely via `dotenv` environment variables.

### 4. Deployment & Version Control
* **Vercel:** Cloud platform configured for continuous integration, serverless API deployment, and hosting static assets.
* **Git & GitHub:** Version control and automated deployment pipeline.

---

## 📁 Project Directory Structure

```text
student-management-api/
│
├── frontend/               # Client-side interface files
│   ├── welcome.html        # Landing page with animated slideshow
│   ├── login.html          # Authentication page with custom validations
│   ├── dashboard.html      # Main management dashboard & tables
│   ├── style.css           # Custom styling and color palettes
│   ├── script.js           # Frontend logic, API integration, and DOM handlers
│   └── college.png         # Institutional branding asset
│
├── src/                    # Backend server source code
│   ├── controllers/        # Request handlers and business logic
│   ├── models/             # Database schemas and validation structures
│   ├── routes/             # API endpoint configurations (studentRoutes.js)
│   ├── middlewares/        # Custom error handlers and request loggers
│   ├── utils/              # Helper utilities (AppError classes)
│   ├── firebase.js         # Cloud database connection setup
│   ├── server.js           # Server entry point
│   └── app.js              # Express app configuration & static middleware
│
├── .env                    # Environment credentials
├── package.json            # Node dependencies and scripts
└── README.md               # Project documentation
🔌 API Endpoints (RESTful Routes)
The backend exposes the following primary endpoints under /api/students:
Method              Endpoint                           Description
GET               /api/students                       Retrieve all student records
POST              /api/students                       Add a new student to the database
PUT               /api/students/:id                   Update an existing student record by ID
DELETE            /api/students/:id                   Remove a student record from the database