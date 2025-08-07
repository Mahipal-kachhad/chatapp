

# Client (Frontend)

This is the frontend for the chat application, built with React, TypeScript, and Vite.

## Features
- User authentication (login/register)
- Dashboard with real-time chat functionality
- Responsive UI with Tailwind CSS
- Modular component structure
- Type-safe interfaces

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
    components/    # Reusable React components
    images/        # Static assets
    interfaces/    # TypeScript interfaces
  public/          # Static public files
  ...
```

## Linting & Formatting
- ESLint is configured for code quality.
- Use `npm run lint` to check for issues.
- Prettier for consistent code formatting.

## Useful Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run lint` — Run linter


## License
MIT
