# 🏢 Employee Management System

![Java](https://img.shields.io/badge/Java-17+-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?style=flat-square&logo=springboot)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square&logo=mysql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38bdf8?style=flat-square&logo=tailwindcss)

A full-stack Employee Management System built with **Spring Boot** (backend) and **React** (frontend). Supports complete CRUD operations with pagination, sorting, search, and a responsive UI.

---

## 🚀 Features

- ✅ Add, Edit, Delete Employees
- ✅ Search Employees by First Name
- ✅ Pagination & Sorting
- ✅ Dashboard with Stats
- ✅ Toast Notifications
- ✅ Loading Spinner & Empty State
- ✅ Delete Confirmation
- ✅ Input Validation
- ✅ Global Exception Handling
- ✅ Swagger API Documentation
- ✅ Responsive UI (Desktop & Mobile)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Java 17+, Spring Boot, Spring Data JPA, Hibernate |
| Database | MySQL 8.0 |
| Frontend | React 19, Vite, Axios, React Router, Tailwind CSS |
| Build Tool | Maven |
| API Docs | Swagger (SpringDoc OpenAPI) |

---

## 📁 Project Structure

```
Employee-Management-System/
├── ems-backend/          # Spring Boot REST API
│   └── src/main/java/com/manoja/ems_backend/
│       ├── controller/   # REST Controllers
│       ├── service/      # Business Logic
│       ├── repository/   # Spring Data JPA
│       ├── dto/          # Data Transfer Objects
│       ├── entity/       # JPA Entities
│       ├── mapper/       # DTO <-> Entity Mapping
│       └── exception/    # Global Exception Handling
│
└── ems-frontend/         # React Application
    └── src/
        ├── components/   # Reusable UI Components
        ├── pages/        # Page Components
        └── services/     # Axios API Calls
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Java 17+
- Node.js 18+
- MySQL 8.0

### 1. Database Setup

```sql
CREATE DATABASE ems_db;
```

### 2. Backend Setup

```bash
cd ems-backend
```

Update `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ems_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

Run the backend:

```bash
./mvnw spring-boot:run
```

Backend runs on: `http://localhost:8080`

### 3. Frontend Setup

```bash
cd ems-frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/employees` | Get all employees (pagination + sorting) |
| `GET` | `/api/employees/{id}` | Get employee by ID |
| `GET` | `/api/employees/search?name=` | Search employees by first name |
| `POST` | `/api/employees` | Create new employee |
| `PUT` | `/api/employees/{id}` | Update employee |
| `DELETE` | `/api/employees/{id}` | Delete employee |

### Pagination & Sorting Parameters

```
GET /api/employees?page=0&size=5&sortBy=firstName&sortDirection=asc
```

### Swagger UI

```
http://localhost:8080/swagger-ui/index.html
```

---

## 📷 Screenshots

> Add screenshots here after running the application.

| Dashboard | Employee List | Add Employee |
|-----------|--------------|--------------|
| *(screenshot)* | *(screenshot)* | *(screenshot)* |

---

## 👨‍💻 Author

**Manoja Somarathna**

[![GitHub](https://img.shields.io/badge/GitHub-manojasomarathna-181717?style=flat-square&logo=github)](https://github.com/manojasomarathna)
