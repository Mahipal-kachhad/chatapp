# Server (Backend)

This is the backend for the chat application, built with Node.js, Express, and TypeScript.

## Features
- RESTful API for authentication and messaging
- JWT-based authentication
- MongoDB integration
- File uploads

- Secure authentication using httpOnly cookies

## Table of Contents
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Useful Scripts](#useful-scripts)
- [License](#license)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation
```bash
npm install
```

### Running the Server
```bash
npm run dev
```

### Environment Variables
Create a `.env` file in the `server` directory:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Project Structure
```
server/
  src/
    controllers/      # Route handlers for user and message APIs
    middlewares/      # Auth and validation middleware
    models/           # Mongoose models for User and Message
    routes/           # API route definitions
    types/            # TypeScript types and schemas
    config/           # Database configuration
  uploads/            # Uploaded files
  ...
```

## API Documentation

### Authentication

#### Register
- **POST** `/api/users/register`
  - Request Body: `{ username, email, password }`
  - Response: `201 Created` with user info and JWT (JWT is set in an httpOnly cookie)

#### Login
- **POST** `/api/users/login`
  - Request Body: `{ email, password }`
  - Response: `200 OK` with user info and JWT (JWT is set in an httpOnly cookie)

#### Get Current User
- **GET** `/api/users/me`
  - Authentication: httpOnly cookie (JWT)
  - Response: `200 OK` with user info

### Messaging

#### Send Message
- **POST** `/api/messages/send`
  - Authentication: httpOnly cookie (JWT)
  - Request Body: `{ recipientId, content }`
  - Response: `201 Created` with message info

#### Get Messages
- **GET** `/api/messages`
  - Authentication: httpOnly cookie (JWT)
  - Query Params: `recipientId` (optional)
  - Response: `200 OK` with array of messages

### File Uploads
 - **POST** `/api/messages/upload`
   - Authentication: httpOnly cookie (JWT)
   - Form Data: `file`
   - Response: `200 OK` with file info

### Error Handling
All endpoints return errors in the format:
```json
{
  "success":false,
  "error": "Error message"
}
```

## Project Structure
```
server/
  src/
    controllers/
    middlewares/
    models/
    routes/
    types/
    config/
  uploads/
  ...
```

## Useful Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production

## License
MIT
