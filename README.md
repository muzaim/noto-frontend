# Noto Frontend

Noto Frontend is a note-taking application inspired by block editor style apps like Notion.  
Users can create notes, blocks, nested blocks, checklist blocks, code blocks, image blocks, drag & drop blocks, and receive realtime updates using websocket.

---

# Features

- Authentication UI
- Workspace notes
- Block editor
- Nested / sub block
- Checklist block
- Code block
- Image block
- Drag & drop block
- Realtime websocket updates
- Audit trail activity
- Responsive UI
- Modern clean interface

---

# Tech Stack

- React
- TypeScript
- TailwindCSS
- React Hook Form
- Socket.IO Client
- React Router DOM
- Axios
- AOS Animation

---

# Installation

## Clone Repository

```bash
git clone https://gitlab.com/muzaimsurya16/noto-frontend.git
```

```bash
cd noto-frontend
```

---

# Install Dependencies

```bash
npm install
```

---

# Environment Setup

Create a `.env` file

```env
VITE_API_URL=http://localhost:8181/api/v1
```

---

# Run Project

```bash
npm run dev
```

Frontend will run on:

```txt
http://localhost:5173
```

---

# Backend Requirement

This project requires the Noto Backend API for all features to work properly.

Default backend URL:

```txt
http://localhost:8181/api/v1
```

---

# Main Pages

- Landing Page
- Login
- Register
- Workspace
- Audit Trail

---

# Realtime Features

Using websocket for:

- Realtime note updates
- Synchronization between tabs/sessions
- Live workspace refresh

---

# Dummy Account

```txt
Email    : admin@yopmail.com
Password : 123456
```

---

# Author

Made with ❤️ by Muzaim Surya
