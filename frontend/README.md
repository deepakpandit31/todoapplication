# My Todo Website

## Project Overview
 So I have built this todo application as an assignment project for mernstack.
 In this todo website you can add your task delete task update taskmark them as completed or pending also you can search the task added .
 user cannot add task without mentioning the title .
 All the data is being saved to mongoDB.

 ### Main features
 1. Add task
 2. Delete Task
 3. Update your old/existing Task
 4. Search Task
 5. Responsive for mobile and desktop
 6. No title task not allowed 
 7. Used MongoDb to store task
 8. Loading state if backend takes time to load  the previously added tasks

 ### Tech stack used


### Frontend
- React.js
- Axios
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- Mongoose

### Database
- MongoDB Atlas

### Tools
- GitHub
- Postman--- for Api testing
- Netlify---- for frontend
- Render---for backend

todoapplication/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controller/
│   │   └── todoController.js
│   ├── models/
│   │   └── todoModel.js
│   ├── routes/
│   │   └── todoRoutes.js
│   ├── services/
│   │   └── todoService.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── App.jsx
    │   └── ...
    ├── package.json

## Installation and Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
## API Endpoints

GET     /api/todos                 → Get all todos

GET     /api/todos/:id             → Get a todo by ID

POST    /api/todos                 → Create a new todo

PUT     /api/todos/:id             → Update a todo

PATCH   /api/todos/:id/status      → Update todo status

DELETE  /api/todos/:id             → Delete a todo

GET     /api/todos?search=keyword  → Search todos

## Challenges Faced

### 1. API Update Error
While connecting the React frontend with the backend, I faced a 404 error while updating a todo. The update API was working correctly in Postman, so I checked the API URL and route used in the frontend and fixed the issue.

### 2. UI Not Updating After Changes
After updating a todo or changing its status, the changes were saved in MongoDB but were not immediately visible on the frontend. I solved this by updating the React `todos` state using the updated data received from the API.

### 3. Status Update
I faced an issue while connecting the Pending/Completed dropdown with the backend. I implemented a separate PATCH API for status updates and connected it with the React state so the status changes immediately in the UI and MongoDB.

### 4. Search Functionality
I had to connect the search input in React with the backend search API. I used Axios query parameters to send the search text and display only the matching todos.


## Live Demo

Frontend:
Backend: 
## GitHub

https://github.com/deepakpandit31/todoapplication


## Author

Deepak Sikhwal

B.Tech - Computer Science & Engineering