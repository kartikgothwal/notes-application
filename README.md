# Notes Management App

## Features

### Core Features
- Users can perform **CRUD (Create, Read, Update, Delete) operations** on their notes.
- Each note consists of:
  - **Title (required)**
  - **Content (optional)**
  - **Timestamps** for creation and last update
  - **Category** for filtering notes

### Back-End
- Built using **Node.js** and **Express.js** with an **MVC (Model-View-Controller)** structure:
  - **Models:** Defines schemas for users and notes using **Mongoose**.
  - **Controllers:** Handles CRUD logic and user authentication.
  - **Routes:** RESTful APIs for managing users and notes.
- Authentication handled with **JWT (JSON Web Token)**.
- Secure password hashing using **bcrypt**.
- **Input validation** and **sanitization** for security.

### Database
- Uses **MongoDB** to store user data and notes.

### Front-End
- Built with **React.js** and **React Router** for a modular UI.
- Features include:
  - **Login/Sign Up** page
  - **Dashboard** for CRUD operations and search functionality
  - **Profile** page for updating user info
- Ensures a clean and responsive UI using **Bootstrap** or **Tailwind CSS**.

### Security
- JWT Middleware for route security.
- Uses **Helmet.js** for secure HTTP headers.
- **CORS configured** for trusted origins.

### Bonus Features
- **Filtering notes** by category.
- **Dark mode toggle** for UI customization.

## Getting Started with the Project

- Fork the Repository.
- Clone the Repository to your local Environment.

```js
run `git init` in your project directory
run `git clone Your_Repository_Link` ex.=> `git clone https://github.com/YOUR_GITHUB_USERNAME/Dev_Notes.git`
```

- Run `npm run init` cpmmand in the root directory of the project (To install all the dependencies).
- Create a .env file in the "Backend" Folder.

```js
JWT_SIGNATURE = YOUR_JWT_SECRET
MONGO_URI = YOUR_MONGO_DB_URL
FRONTEND_DEV = VITE_APP_URL ` http://localhost/3000 `
FRONTEND = YOUR_FRONTEND_WEBSITE_LINK (after deploying your frontend)

```

- Create a .env file in the "Frontend" Folder.

```js
VITE_HOST = ` http://localhost:BACKEND_PORT `
In Development => ` http://localhost:5000 ` (default:5000)
In Production  => YOUR_BACKEND_WEBSITE_LINK (afer deploying your backend)
```

- Run `npm run dev`

`Your App is live on YOUR_FRONTEND_PORT(3000) and server is running on YOUR_BACKEND_PORT(5000)`

---

### Update App according to you.

### Run the following commands

- Setup:
  - `git branch -M main`
  - `git remote add origin main`
  - `git checkout -m [new_update_branch_name]`
- Update or Add any functionality...
- Add and commit Your changes:
  - `git add .`
  - `git commit -m "YOUR_COMMIT_MESSAGE"`
  - `git push -u origin [new_update_branch_name]`

`You have Updated you Github Repository with these changes`

---

## Deploy the App

- Create an Accout on Vercel.com
- Connect your Github account
- Allow Your Repository access for vercel

### Create Frontend

- On Dashboard click NEW_PROJECT
- Select your repository
- Connect your github repository
- Choose root directory as FRONTEND
- Override output direcory to build.

#### Add details:

```js
Name : YOUR_APP_NAME
Branch : main
Root Directory : Frontend
publish directory : build
```

- click deploy.
- Copy your newly created WEBSITE_URL it will needed in next step.

### Create Backend

- On Dashboard click NEW_PROJECT
- Select your repository
- Connect your github repository
- Choose root directory as BACKEND

```js
Add details:
Name : YOUR_APP_NAME
Branch : main
Root Directory : BACKEND

**** Under Environment **** => create a environment variable

key   : FRONTEND, value : YOUR_FRONTEND_WEBSITE_URL (PASTE YOUR FRONTEND URL HERE),
key   : JWT_SIGNATURE, value : YOUR_JWT_SECRET,
key   : MONGO_URI, value : YOUR_MONGO_DB_URL,
key   : FRONTEND_DEV, value : ` http://localhost:3000 `

```

- click deploy
- Copy your WEBSITE_URL
- Go to dashboard and go to your frontend app
- Under Environment => add enviromnment=> create a environment variable

```js
key: VITE_HOST;
value: YOUR_BACKEND_WEBSITE_URL;
```

---

## Your website is live on your Frontend Website Link.
