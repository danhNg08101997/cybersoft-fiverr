# Cybersoft Fiverr Clone Frontend

<p align="center">
  <img src="./public/fiverr-logo-page.png" alt="Cybersoft Fiverr Clone banner" width="100%" />
</p>

<p align="center">
  A Fiverr-inspired freelance marketplace frontend built with React, TypeScript, Redux Toolkit, and Vite.
</p>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#environment-variables">Environment Variables</a>
</p>

---

## Overview

This project is a freelance marketplace frontend inspired by Fiverr. It focuses on a modern single-page application experience for job discovery, authentication, job detail browsing, user profile management, and admin operations.

The application is organized with a route-based structure, centralized state management using Redux Toolkit, and a reusable service layer built on top of Axios.

### What this project includes

- User authentication flow: login and register
- Job category and job listing pages
- Job detail page with supporting content sections
- Comments and job rental / hiring flow
- Personal profile page
- Admin area for dashboard, users, jobs, and orders
- API integration with token-based request handling
- Lazy-loaded routes for cleaner code splitting

---

## Features

### User-facing features

- Browse the homepage and marketplace sections
- Search and explore available jobs/services
- View detailed information for each job
- Register a new account and sign in
- Persist authenticated user data in local storage
- View and manage profile-related information
- Read and post comments for jobs
- Rent / hire a job from the detail flow

### Admin features

- Dashboard overview
- User management page
- Job management page
- Order management page
- Route separation for admin screens

### Technical highlights

- Built with **React 19** and **TypeScript**
- State management with **Redux Toolkit** and **React Redux**
- Client-side routing with **React Router DOM**
- API abstraction through **Axios** service modules
- Request interceptor for attaching authentication tokens
- Automatic local logout handling on `401 Unauthorized`
- Suspense-based lazy loading with a shared app loader

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router DOM
- Redux Toolkit
- React Redux

### UI and styling

- Tailwind CSS
- Ant Design
- Framer Motion
- Lucide React
- Flowbite

### Tooling

- ESLint
- TypeScript Compiler
- Vite Build Tool

---

## Project Structure

```txt
src/
├── components/
│   ├── Footer/
│   ├── Navbar/
│   │   ├── Logo/
│   │   └── PopularTag/
│   ├── guards/
│   └── shared/
├── config/
├── pages/
│   ├── AdminTemplate/
│   │   ├── _Components/
│   │   └── _pages/
│   ├── AuthTemplate/
│   │   ├── Login/
│   │   └── Register/
│   ├── HomeTemplate/
│   │   └── Home/
│   ├── JobDetailTemplate/
│   ├── JobListAndJobType/
│   ├── JobListTemplate/
│   ├── PageNotFound/
│   └── ProfileTemplate/
├── routes/
├── services/
├── store/
├── utils/
├── App.tsx
├── main.tsx
└── types.ts
```

### Folder responsibilities

- `components/`: shared UI building blocks and reusable layout components
- `pages/`: route-level screens grouped by template or feature
- `routes/`: application route definitions and nested route rendering
- `services/`: API requests, async actions, and feature-related slices
- `store/`: Redux store configuration
- `config/`: environment configuration helpers
- `utils/`: utility helpers such as storage and API error normalization

---

## Routing Overview

Main routes currently defined in the project:

- `/` — Home page
- `/danh-sach-cong-viec` — Job list page
- `/danh-sach-cong-viec-va-loai-cong-viec` — Job list with job type page
- `/chi-tiet-cong-viec` — Job detail page
- `/trang-ca-nhan` — Profile page
- `/admin/dashboard` — Admin dashboard
- `/admin/users` — User management
- `/admin/jobs` — Job management
- `/admin/orders` — Order management
- `*` — Not found page

---

## State Management and API Layer

This project uses Redux Toolkit to manage async flows and feature state. The store currently combines slices for:

- authentication
- registration
- job search
- job menu / categories
- job type details
- job details
- comments
- hired jobs
- hiring actions

The API layer is centralized with Axios and includes:

- `baseURL` from environment variables
- automatic token injection via request interceptor
- `401` handling that clears stored user data

Authenticated user information is persisted in local storage under the `USER_LOGIN` key.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/danhNg08101997/cybersoft-fiverr.git
cd cybersoft-fiverr
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://fiverr-clone-be.onrender.com/api
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

### 6. Preview the production build locally

```bash
npm run preview
```

---

## Environment Variables

The project currently requires the following variable:

| Variable | Required | Description |
|---|---:|---|
| `VITE_API_BASE_URL` | Yes | Base URL of the backend API |

### Example

```env
VITE_API_BASE_URL=https://fiverr-clone-be.onrender.com/api
```

> Recommended: create a `.env.example` file and avoid committing your real `.env` file to the repository.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Run the Vite development server |
| `npm run build` | Compile TypeScript and create a production build |
| `npm run lint` | Run ESLint across the project |
| `npm run preview` | Preview the production build locally |

---

## Deployment Notes

This frontend expects a running backend API exposed through `VITE_API_BASE_URL`.

Before deploying, make sure:

- the backend API is live and accessible
- environment variables are configured correctly in your hosting platform
- CORS is configured properly on the backend
- production build succeeds with `npm run build`

---

## Improvement Ideas

Here are some good next steps if you want to level up the project further:

- Add `.env.example`
- Add loading, empty, and error states more consistently
- Improve route protection for admin-only pages
- Add unit and integration tests
- Add CI/CD workflow for lint and build checks
- Standardize service naming for better readability
- Add pagination and filtering enhancements
- Improve responsive behavior across all pages

---

## Author

**Danh Nguyen**

- GitHub: `https://github.com/danhNg08101997`
- LinkedIn: `https://www.linkedin.com/in/danh-nguy%E1%BB%85n-265a13251/`

---

## License

This project is created for educational and portfolio purposes.

---

## Acknowledgements

This project is inspired by the Fiverr marketplace experience and was developed as a practice/portfolio project to strengthen frontend architecture, API integration, and React ecosystem skills.
