# Noto Frontend

Noto Frontend adalah aplikasi note bergaya block editor seperti Notion mini version.  
User dapat membuat note, block, nested block, checklist, code block, image block, drag & drop, serta realtime update menggunakan websocket.

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
- Realtime update with websocket
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

Buat file `.env`

```env
VITE_API_URL=http://localhost:3000/api/v1
```

---

# Run Project

```bash
npm run dev
```

Frontend berjalan di:

```txt
http://localhost:5173
```

---

# Backend Requirement

Project ini membutuhkan backend Noto API agar seluruh fitur berjalan dengan baik.

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

Menggunakan websocket untuk:

- Realtime note update
- Synchronize antar tab/session
- Live workspace refresh

---

# Dummy Account

```txt
Email    : admin@yopmail.com
Password : 123456
```

# Author

Made with ❤️ by Muzaim Surya
