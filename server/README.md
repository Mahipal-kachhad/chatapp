# Server (Backend)

This is the backend for the chat application, built with Node.js, Express, and TypeScript.

## Features
- RESTful API for authentication and messaging
- JWT-based authentication
- MongoDB integration
- File uploads

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
