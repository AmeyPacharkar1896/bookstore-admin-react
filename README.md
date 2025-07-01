# 📘 Bookstore Admin Dashboard (React)

![Bookstore App & Admin Demo](YOUR_DEMO_GIF_URL_HERE)

This repository contains the **React-based Admin Dashboard** for a complete full-stack e-commerce platform. This dashboard demonstrates real-world full-stack skills by providing the secure "back office" that powers a seamless mobile shopping experience.

> **Note:** This is the admin panel. The main, user-facing **Flutter application** can be found here: **[bookstore-flutter-app](https://github.com/AmeyPacharkar1896/bookstore-app-flutter)**

---

## 🚀 Live Demo & Credentials

You can test the live, deployed admin dashboard using the credentials below.

-   **Live Site:** **[bookstore-admin.vercel.app](https://bookstore-admin-jvs6.onrender.com/admin/login)**
-   **Email:** `recruiter@demo.com`
-   **Password:** `password123`

---

## ✨ Key Features

- ✅ **Secure Admin Authentication:** Full login flow powered by Supabase Auth, with protected routes accessible only to users with an "admin" role.
- ✅ **Complete Product Management (CRUD):** A full-featured interface to Create, Read, Update, and Delete products, with changes reflecting live in the user app.
- ✅ **Cloud-Based Media Uploads:** Seamlessly upload and manage product images via Cloudinary, with an in-form image preview for a better UX.
- ✅ **Efficient State Management:** Built with Zustand for fast, scalable, and boilerplate-free state management, enabling features like instant form pre-fills on edit.
- ✅ **Clean & Scalable Architecture:** Organized into modular components and services with a centralized theme for consistent and maintainable design.

## 🛠️ Tech Stack

| Category         | Technology                                  |
| ---------------- | ------------------------------------------- |
| **Framework**    | React (Vite)                                |
| **State**        | Zustand                                     |
| **Backend**      | Supabase (PostgreSQL Database & Auth)       |
| **Media Storage**| Cloudinary                                  |
| **Styling**      | Custom CSS-in-JS via `theme.ts`             |

## 👨‍💻 Author

-   **Amey Pacharkar** – [LinkedIn](https://www.linkedin.com/in/amey-pacharkar-28520b307) | [GitHub](https://github.com/AmeyPacharkar1896)

---

<details>
<summary><b>View Technical Details & Setup Instructions</b></summary>
<br>

### 📂 Folder Structure
```bash
bookstore-admin/
├── components/ # Reusable UI components (Sidebar, Header)
├── pages/ # View components for each route
├── store/ # Zustand state management logic
├── services/ # API layer for Supabase communication
├── models/ # TypeScript type definitions
├── utils/ # Helper functions (e.g., Cloudinary uploads)
└── theme/ # Centralized design tokens
```


### 🚀 Getting Started Locally

#### Prerequisites
-   Node.js & npm
-   A configured Supabase project
-   A configured Cloudinary account

#### Steps
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AmeyPacharkar1896/bookstore-admin-react.git
    cd bookstore-admin-react
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the root and add the following keys:
    ```
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_KEY
    VITE_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
    VITE_UPLOAD_PRESET=YOUR_CLOUDINARY_UPLOAD_PRESET
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
</details>

---