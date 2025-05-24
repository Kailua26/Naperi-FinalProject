# Naperi-FinalProject
Project Overview
A blog app that allows users to manage blogs.

Main Features
View all Blog posts
Search blogs
Create Blog
Edit Blog
Delete Blog
Like a blog
Comment to a blog

Technologies Used
	Frontend
React
Axios
Backend
Node js
Express js
MongoDB


Setup Instructions

Step 1: Clone the Repository
Step 2: Install dependencies (Frontend & Backend)
npm install
Step 3: Setup Environment variables
Create a .env folder in the backend folder
Type:
 MONGODB_URI=your_mongodb_connection_string
PORT=3001
Step 4: Run the servers
cd frontend
npm start
Open another terminal
cd backend
npm start

Folder Structure

NAPERI_FINALPROJECT/
├──client/ - React App (Frontend)
├──node_modules/
├──public/ - Contains Static files
├──src/ - Main source for React
├──components/
├──BlogList.js - display list of blogs
├──Footer.js - footer of the page
├──Header.js - header of the page
├──NotFound.js - 404
├──pages/
├──Create.js - creating blog post
├──Edit.js - editing blog post
├──Index.js - Home page
├──App.js - main layout
├──App-test.js
├──AppRouter.js - route definitions
├──index.js - entry points, renders app.js
├──styles.css - styles applied to frontend
├──.gitignore
├──package-lock.json
├──package.json - list of dependencies
├──README.md - documentation
├──controllers/ 
├──blogControllers.js - - Backend logic
├──models/
├──blog.js - to connect to database
├──node_modules/
├──.env - environmental variables
├──app.js - renders backend
├──package-lock.json
├──package.json

Code Explanation

Backend
API Routes:
GET /api/blogs - Get all blogs
POST /api/blogs - Create blog
PUT /api/blogs/:id - Update blog
DELETE /api/blogs/:id - Delete blog
PATCH /api/blogs/:id/like - Like a blog
POST /api/blogs/:id/comment - Add a comment
