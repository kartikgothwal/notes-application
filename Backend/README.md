# Dev Notes Backend

## Overview
This project is a backend application for a notes management system built using Node.js, Express, and MongoDB. It provides functionalities for user authentication and managing notes.

## Features
- User registration and login
- Create, read, update, and delete notes
- Middleware for authentication
- Environment variable management

## Technologies Used
- Node.js
- Express.js
- MongoDB
- TypeScript
- bcryptjs for password hashing
- jsonwebtoken for authentication tokens
- express-validator for input validation

## Project Structure
```
Dev_Notes
├── Backend
│   ├── src
│   │   ├── controllers
│   │   │   ├── auth
│   │   │   ├── notes
│   │   │   └── user
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── db.ts
│   │   ├── index.ts
│   │   └── types
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd Dev_Notes/Backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Environment Variables
Create a `.env` file in the root directory and add the following variables:
```
JWT_SIGNATURE=YOUR_JWT_SECRET
MONGO_URI=YOUR_MONGO_DB_URL
FRONTEND_DEV=http://localhost:3000
FRONTEND=http://localhost:3000
PORT=8080
```

## Running the Application
To start the application in development mode, use:
```
npm run dev
```

## API Endpoints
### Authentication
- `POST /api/auth/createuser`: Register a new user
- `POST /api/auth/login`: Authenticate a user
- `POST /api/auth/getuser`: Get logged-in user details

### Notes
- `GET /api/notes/fetchallnotes`: Get all notes for the logged-in user
- `POST /api/notes/addnote`: Add a new note
- `PUT /api/notes/updatenote/:id`: Update an existing note
- `DELETE /api/notes/deletenote/:id`: Delete a note

## License
This project is licensed under the MIT License.