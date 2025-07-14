
# Client (Frontend)

This is the frontend for the chat application, built with React, TypeScript, and Vite.

## Features
- User authentication (login/register)
- Dashboard with chat functionality
- Responsive UI with Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
npm install
```

### Running the App
```bash
npm run dev
```

### Environment Variables
Create a `.env` file in the `client` directory:
```
VITE_BASE_URL=http://localhost:5000
```

## Project Structure
```
client/
  src/
    components/
    images/
    interfaces/
  public/
  ...
```

## Linting & Formatting
- ESLint is configured for code quality.
- Use `npm run lint` to check for issues.

## Useful Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run lint` — Run linter

## License
MIT
