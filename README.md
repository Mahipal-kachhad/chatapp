
# Chat Application

A robust full-stack chat application with a modern React + Vite frontend and a secure Node.js + Express backend.

## Overview

- **Frontend (`client/`)**: React, TypeScript, Vite, Tailwind CSS
- **Backend (`server/`)**: Node.js, Express, TypeScript, MongoDB, JWT Authentication

## Key Features

- User authentication (login/register)
- Real-time chat dashboard
- RESTful API for messaging and user management
- JWT-based authentication and httpOnly cookies
- Responsive UI with Tailwind CSS
- MongoDB integration
- File uploads
- Modular, scalable codebase

## Setup Instructions

See individual `README.md` files in `client/` and `server/` for detailed setup, environment variables, and scripts.

### Quick Start

1. **Install dependencies** (run in both `client` and `server` folders):
   ```bash
   npm install
   ```
2. **Configure environment variables**:
   - `client/.env`:  
     ```
     VITE_BASE_URL=http://localhost:5000
     ```
   - `server/.env`:  
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
3. **Run development servers**:
   - Frontend: `npm run dev` (in `client`)
   - Backend: `npm run dev` (in `server`)

## Project Structure

```
chat/
  client/   # React + Vite frontend
    src/
      components/
      images/
      interfaces/
    public/
    ...
  server/   # Node.js + Express backend
    src/
      controllers/
      models/
      routes/
      middlewares/
      config/
      ...
```

## Industry Standards

- Separation of concerns (frontend/backend)
- Environment variables for sensitive data
- Linting and formatting (ESLint)
- Modular code structure
- MIT License

## Documentation

- See `client/README.md` for frontend details, features, and scripts.
- See `server/README.md` for backend API, environment, and scripts.

## License
MIT
