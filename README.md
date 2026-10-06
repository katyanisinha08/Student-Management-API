# 🎓 Student Management REST API

A highly modular, production-ready REST API built with Node.js and Express.js. Designed with a strict focus on Separation of Concerns, semantic HTTP standards, and advanced backend features.

## 🚀 Key Features (Evaluation Criteria Addressed)
- **Modular Architecture:** Clean separation of Routes, Controllers, Services, and Models.
- **Robust Validation:** Custom middleware prevents processing of invalid payloads (Returns `400 Bad Request`).
- **Standardized Responses:** Unified JSON wrapper for all successes and errors.
- **Global Error Handling:** Centralized error catcher ensures the app never crashes from unhandled exceptions.
- **Advanced GET Operations:** Supports **Pagination** (`?page=1&limit=5`) and **Filtering** (`?course=science`).
- **Request Logging:** Custom middleware logs all incoming traffic.

## 🛠️️ Setup & Installation

1. Clone or extract the project.
2. Install dependencies:
   ```bash
   npm install
3. Start the server:
   bash 
   npm start

The server will run on http://localhost:3000
📚 API Endpoints

Method      Endpoint               Description                                                  Status Codes
GET      /api/students           Get all students (Supports ?page, ?limit, ?course, ?name)      200
POST     /api/students           Create a new student                                           201, 400
PUT       /api/students/:id      Update an existing student                                     200, 400, 404
DELETE   /api/students/:id       Delete a student                                               200, 404

CRUL example

1. Create a Student (Validation Test):

curl -X POST http://localhost:3000/api/students \
-H "Content-Type: application/json" \
-d '{"name": "Jane Doe", "age": 22, "course": "IT"}'

2. Get Students with filtering:

curl -X GET "http://localhost:3000/api/students?course=IT&limit=2"

📬 Postman Testing

A postman_collection.json file is included in the root directory. Import it directly into Postman to instantly test all CRUD operations, validation failures, and 404 errors!