# 📌 TaskFlow — Team Task Manager (Full-Stack)

A full-stack web app for managing projects and tasks with **role-based access control (Admin/Member)**.

## 🚀 Live Demo
> _Deploy to Railway and add URL here_

## ✨ Features

- 🔐 **Authentication** — Signup/Login with JWT
- 📁 **Project Management** — Create, view, delete projects (Admin only)
- 👥 **Team Management** — Add/remove members to projects (Admin only)
- ✅ **Task Management** — Create, assign, update, and delete tasks
- 📊 **Dashboard** — Task stats: total, pending, in-progress, completed, overdue
- 🛡️ **Role-Based Access**:
  - **Admin**: Full control (CRUD on everything)
  - **Member**: View/update status of their assigned tasks

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, TypeScript, Tailwind CSS v4, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Auth | JWT (jsonwebtoken) |
| Deployment | Railway |

## 📂 Project Structure

```
full-stack-task-manager/
├── backend/               # Express REST API
│   ├── config/db.js       # MongoDB connection
│   ├── controllers/       # Business logic
│   ├── middleware/        # Auth middleware (protect, authorize)
│   ├── models/            # Mongoose schemas (User, Project, Task)
│   ├── routes/            # API routes
│   ├── server.js          # Entry point
│   └── .env               # Environment variables
└── src/                   # React frontend
    ├── api/               # Axios API functions
    ├── components/        # Reusable UI components
    ├── context/           # Auth context
    └── pages/             # Dashboard, Projects, Tasks, Auth
```

## ⚙️ Local Setup

### Prerequisites
- Node.js >= 18
- MongoDB Atlas account (or local MongoDB)

### 1. Clone & Setup Backend

```bash
cd full-stack-task-manager/backend
npm install
```

Create `.env` file in `backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

Start backend:
```bash
npm run dev   # with nodemon (hot-reload)
# or
npm start     # production
```

Backend runs at: `http://localhost:5000`

### 2. Setup Frontend

```bash
cd full-stack-task-manager   # root folder
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Protected |

### Projects
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/projects` | Protected |
| POST | `/api/projects` | Admin |
| GET | `/api/projects/:id` | Protected |
| PUT | `/api/projects/:id` | Admin |
| DELETE | `/api/projects/:id` | Admin |
| POST | `/api/projects/:id/members` | Admin |
| DELETE | `/api/projects/:id/members/:userId` | Admin |

### Tasks
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/tasks` | Protected |
| POST | `/api/tasks` | Admin |
| GET | `/api/tasks/:id` | Protected |
| PUT | `/api/tasks/:id` | Admin (all fields), Member (status only) |
| DELETE | `/api/tasks/:id` | Admin |
| GET | `/api/tasks/stats/overview` | Protected |

## 🚂 Deploy to Railway

### Backend
1. Push code to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Select the `backend` folder (or set root directory to `backend`)
4. Add environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT` (Railway sets this automatically)
5. Deploy!

### Frontend
1. Update `src/api/axios.ts` — change `baseURL` to your Railway backend URL
2. Create new Railway service → Deploy from GitHub → root directory = project root
3. Set build command: `npm run build`
4. Set start command: `npm run preview`
5. Deploy!

## 📹 Demo Video
> _Add 2-5 min demo video link here_

## 👤 Author
Built for the Team Task Manager Full-Stack Assignment.
