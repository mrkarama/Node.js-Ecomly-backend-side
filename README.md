# Ecomly — RESTful E-Commerce Backend API (Node.js & MongoDB)

A modular, security-focused RESTful backend API built with **Node.js**, **Express**, and **MongoDB (Mongoose)**. Designed to power cross-platform mobile clients (such as Flutter) with dual-token JWT authentication, strict request validation, role-based access control, and secure media/image uploads.

---

## 🛠️ Tech Stack

- **Runtime & Framework:** Node.js, Express.js
- **Database & ODM:** MongoDB, Mongoose
- **Authentication & Security:** JSON Web Tokens (`jsonwebtoken` — Access & Refresh Tokens), Password Hashing (`bcryptjs`), Environment Variable Management (`dotenv`)
- **Validation & Middleware:** `express-validator`, `multer` (file/image uploads)

---

## 🔐 Security & Architecture Highlights

- **Dual-Token JWT Authentication:** Issues short-lived **Access Tokens (`24h`)** and long-lived **Refresh Tokens (`60d`)** signed with separate secrets (`ACCESS_TOKEN_SECRET` & `REFRESH_TOKEN_SECRET`), persisted and rotated per user in MongoDB (`Token` model).
- **Password & Data Protection:** Hashes user passwords using `bcryptjs` prior to database persistence and strips `passwordHash` from API responses.
- **Input Validation & Sanitization:** Validates incoming payloads via `express-validator`, returning structured field-level `400 Bad Request` error arrays before hitting database operations.
- **Role-Based Authorization:** Embeds `userId` and `isAdmin` claims inside JWT payloads to protect administrative and customer routes.
- **Standardized Error Handling:** Returns explicit, predictable HTTP status codes (`201 Created`, `400 Bad Request`, `404 Not Found`, `409 Conflict` for duplicate emails, `500 Internal Server Error`).

---

## 📂 Project Structure

```text
├── controllers/       # Route handlers & business logic (e.g., auth.js, products, orders)
├── models/            # Mongoose schemas & data models (User, Token, Product, etc.)
├── routes/            # Express route definitions & express-validator rules
├── middlewares/       # JWT verification, admin guards, and file upload handlers
├── .env.example       # Environment variable template
└── app.js / server.js # Application entry point & MongoDB connection
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** (Local instance or MongoDB Atlas URI)

### 2. Installation
```bash
git clone https://github.com
cd Node.js-Ecomly-backend-side
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and configure the following variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

### 4. Run the Server
```bash
npm start
```

---

## 📡 Core Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/register` | Validates payload, hashes password (`bcrypt`), and creates a new user (`201`). | No |
| `POST` | `/api/v1/login` | Verifies credentials, rotates `Token` record in MongoDB, and returns user + `accessToken`. | No |

### Sample Login Response (`200 OK`)
```json
{
  "_id": "65f1a9c2e4b0a123456789ab",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "isAdmin": false,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 👨‍💻 Author

**Abdoul-Rahmane Bande**  
Mobile & Backend Application Developer | Ouagadougou, Burkina Faso  
abdoulrahmanebande@gmail.com
