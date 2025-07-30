# Wellness Session Platform

A full-stack web application where users can **sign up, create wellness sessions**, save them as drafts, and publish them. Built using the **MERN stack (MongoDB, Express.js, React, Node.js)** with JWT authentication and auto-save support.

## Features

- User Authentication (Register/Login using JWT)
- Create, Save Drafts, and Publish Wellness Sessions
- Auto-save functionality during session writing
- Dashboard shows only published sessions (not protected)
- Responsive UI with React + Vite


## Tech Stack

**Frontend:** React, Vite, CSS, axios, React Router dom
**Backend:** Node.js, Express.js  
**Database:** MongoDB Atlas, mongoose
**Authentication:** JWT, bcrypt  
**Deployment:** Render (Backend), Vercel (Frontend), MongoDB Atlas (Database)


## Folder Structure

Wellness_Session_Platform-main/
├── backend/        # Express server & API logic
│ ├── config/       # DB config (MongoDB)
│ ├── controllers/  # Auth and Session logic
│ ├── middleware/   # Auth middleware
│ ├── models/       # Mongoose schemas
│ ├── routes/       # API routes
│ └── server.js     # Entry point
└── frontend/       # React + Vite frontend
├── public/         # Static assets
├── src/            # Components and pages
│ ├── components/
│ ├── pages/
└── main.jsx        # App entry point

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB Atlas account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/SatyamGarg297/Wellness_Session_Platform.git
cd wellness-session-platform

```

2. **Backend Setup**
```bash
cd backend
npm install
# Create a .env file with the following variables:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
npm start
```

3. **Frontend Setup**
```bash
cd frontend
npm install
# Create a .env file with the following variables:
VITE_API_URL=https://your-backend-api.onrender.com/api
npm run dev
```

## 🔐 Environment Variables

In `backend/.env`:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

In `frontend/.env`:

```
VITE_API_URL=https://your-backend-api.onrender.com/api
```

## Deployment

- **Backend:** Deployed on [Render](https://wellness-session-platform-x6ud.onrender.com/)
- **Frontend:** Deployed on [Vercel](https://wellness-session-platform-one.vercel.app/)




