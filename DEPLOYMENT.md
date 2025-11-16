# Deployment Guide - Sweet Shop Management System

## Project Structure

```
Sweet-Shop/
├── backend/          # Node.js/Express API
│   ├── src/
│   ├── tests/
│   ├── package.json
│   └── .gitignore
└── frontend/         # React/Vite Frontend
    ├── src/
    ├── tests/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── .gitignore
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example` if exists):
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/sweet-shop
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   CORS_ORIGIN=http://localhost:3000
   ```

4. Start the backend server:
   ```bash
   npm run dev    # Development mode with nodemon
   # OR
   npm start      # Production mode
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example` if exists):
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_ENV=development
   VITE_APP_NAME=Sweet Shop
   VITE_APP_VERSION=1.0.0
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Required Node Modules

### Backend Dependencies (Production)
- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- express-validator
- helmet
- morgan

### Backend Dependencies (Development)
- nodemon
- jest
- supertest
- @jest/globals
- mongodb-memory-server

### Frontend Dependencies (Production)
- react
- react-dom
- react-router-dom
- axios

### Frontend Dependencies (Development)
- @vitejs/plugin-react
- vite
- tailwindcss
- postcss
- autoprefixer
- @testing-library/react
- @testing-library/jest-dom
- @testing-library/user-event
- vitest
- @vitest/ui
- jsdom
- eslint and plugins

## Running Tests

### Backend Tests
```bash
cd backend
npm test              # Run all tests
npm run test:unit     # Run unit tests only
npm run test:integration  # Run integration tests only
```

### Frontend Tests
```bash
cd frontend
npm test              # Run all tests
npm run test:coverage # Run tests with coverage
npm run test:ui       # Run tests with UI
```

## Production Build

### Frontend Production Build
```bash
cd frontend
npm run build
```
This creates a `dist/` folder with optimized production files.

### Backend Production
```bash
cd backend
npm start
```
Make sure to set `NODE_ENV=production` in your `.env` file.

## Deployment Checklist

### Backend
- [ ] All dependencies installed (`npm install`)
- [ ] `.env` file configured with production values
- [ ] MongoDB connection string set
- [ ] JWT_SECRET changed from default
- [ ] CORS_ORIGIN set to frontend URL
- [ ] Tests passing (`npm test`)
- [ ] Server starts successfully (`npm start`)

### Frontend
- [ ] All dependencies installed (`npm install`)
- [ ] `.env` file configured with production API URL
- [ ] Build successful (`npm run build`)
- [ ] Tests passing (`npm test`)
- [ ] No console errors
- [ ] All routes working

## Common Issues

### Frontend: "Missing script: dev"
- **Solution**: Make sure `package.json` is in the `frontend/` root directory, not in `frontend/public/`
- Run `npm install` to ensure all dependencies are installed

### Backend: MongoDB Connection Error
- **Solution**: Check `MONGODB_URI` in `.env` file
- Ensure MongoDB is running (local) or connection string is correct (cloud)

### CORS Errors
- **Solution**: Update `CORS_ORIGIN` in backend `.env` to match frontend URL
- For development: `http://localhost:3000`
- For production: your production frontend URL

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRE` - JWT expiration time
- `CORS_ORIGIN` - Allowed CORS origins

### Frontend (.env)
- `VITE_API_URL` - Backend API URL
- `VITE_ENV` - Environment
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Application version

## Notes

- The `frontend/public/` folder is a legacy structure. The correct structure has all files in `frontend/` root.
- Make sure to run `npm install` in both `frontend/` and `backend/` directories.
- For production deployment, set `NODE_ENV=production` in backend `.env`.
- Frontend build output goes to `frontend/dist/` directory.

