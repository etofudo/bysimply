# BuySimply

A full-stack application featuring an Express.js backend with JWT authentication and role-based access, and a minimal Next.js frontend for server-side rendering (SSR).

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Next.js SSR Frontend](#nextjs-ssr-frontend)
- [Development Notes](#development-notes)

---

## Overview
BuySimply is a demonstration of a secure, role-based RESTful API for loan management, with a minimal server-rendered frontend using Next.js. The backend uses Express.js, JWT authentication, and reads/writes data from JSON files. The frontend is a minimal Next.js app for SSR and API route demonstration.

---

## Features
- **JWT Authentication**: Secure login for staff using credentials from `staffs.json`.
- **Role-Based Access**: Admin, superadmin, and staff roles with different data visibility and permissions.
- **Loan Management**: Fetch, filter, and delete loans with access control.
- **API Rate Limiting**: Prevents abuse with express-rate-limit.
- **CORS & Logging**: CORS enabled and HTTP request logging with morgan.
- **Next.js SSR**: Minimal frontend with server-side rendering and API route example.

---

## Folder Structure
```
BuySimply/
├── ServerSideRenderedFrontend/      # Next.js frontend (SSR)
│   └── pages/
│       ├── index.js                 # SSR homepage
│       ├── _app.js                  # Custom Next.js App
│       ├── _document.js             # Custom Next.js Document
│       └── api/
│           └── hello.js             # Next.js API route
├── controllers/                     # Express controllers
├── middlewares/                     # Express middlewares
├── routes/                          # Express routes
├── utils/                           # Utility functions
├── config/                          # Configuration files
├── test-data/
│   └── data/
│       ├── staffs.json              # Staff data
│       └── loans.json               # Loan data
├── index.js                         # Main Express server (with Next.js integration)
├── package.json
└── README.md
```

---

## Setup & Installation
1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd BuySimply
   ```
2. **Install dependencies** 
   npm install express morgan cors express-rate-limit jsonwebtoken next react react-dom
   ```
3. **Data Files**: Ensure `test-data/data/staffs.json` and `test-data/data/loans.json` exist and are properly formatted.

---

## Running the Application
Start the Express server (which also serves the Next.js frontend):
```bash
node index.js
```
- The backend API is available at `http://localhost:4000/api`.
- The Next.js frontend is available at `http://localhost:4000/`.

---

## API Endpoints
### Authentication
- `POST /api/login` — Login with `{ email, password }`, returns JWT.
- `POST /api/logout` — Dummy endpoint (JWT logout is client-side).

### Loans (Protected)
- `GET /api/loans` — Fetch all loans (role-based field filtering).
- `GET /api/loans?status=pending|active` — Filter loans by status.
- `GET /api/loans/:userEmail/get` — Fetch loans for a specific user.
- `GET /api/loans/expired` — Fetch loans with past maturity date.
- `DELETE /api/loan/:loanId/delete` — Delete a loan (superadmin only).

### Next.js API Route Example
- `GET /api/hello` — Returns `{ message: 'Welcome to BuySimply!' }` (handled by Next.js, not Express).

---

## Next.js SSR Frontend
- The homepage (`/`) is rendered server-side using Next.js.
- Minimal API route example at `/api/hello`.

---

## Development Notes
- **Testing**: Add automated tests for endpoints as needed.
- **Session Management**: JWT logout is stateless; for true session invalidation.
- **Next.js Integration**: The Express server is integrated with Next.js for SSR and API routes.
