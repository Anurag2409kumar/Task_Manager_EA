# TaskFlow - Team Task Manager

A web-based task management app for teams. Built with React + Node.js + MongoDB.

## 🔗 Live Demo
👉 **[Open App](https://taskmanagerea-production-0b5f.up.railway.app)**

- **Frontend:** https://taskmanagerea-production-0b5f.up.railway.app
- **Backend API:** https://taskmanagerea-production.up.railway.app/api

## What it does
- Login / Register with roles (Admin or Member)
- Admin can create projects, assign tasks, manage team members
- Members can view their tasks and update task status
- Dashboard shows task stats and progress
- Filter tasks by status, priority, or search by name

## Tech Used
- Frontend: React, TypeScript, Vite, React Router, Axios
- Backend: Node.js, Express, MongoDB, JWT

## Run Locally

**Backend**
```bash
cd backend
npm install
npm run dev
```
Add a `.env` file in `/backend`:
```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
JWT_EXPIRE=7d
NODE_ENV=development
```

**Frontend**
```bash
npm install
npm run dev
```
Add a `.env` file in root:
```
VITE_API_URL=http://localhost:5000/api
```

## Deployed On
Railway — https://railway.app