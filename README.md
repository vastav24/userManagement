# React + Vite Project

This project is built using **React** with **Vite** for fast and efficient development.

---

## 📋 Requirements

- **Node.js**: version 18 or higher  
  You can check your version with:
  ```bash
  node -v
  ```

## 🛠 Installation & Setup

1. Clone the repository

git clone https://github.com/vastav24/userManagement.git
cd userManagement

2. Install dependencies

npm install -f

3. Start development server

npm run dev

4. Build for production (optional)

npm run build

## Project structure

userManagement/
├── public/ # Static assets (favicon, images, etc.)
├── src/
│ ├── assets/ # Images, styles, fonts, and other assets
│ ├── components/ # Reusable UI components
│ ├── pages/ # Application pages
│ ├── store/
│ │ └── store.js # Zustand store for state management
│ ├── routing/
│ │ └── AppRoutes.jsx # Page routing definitions
│ ├── helper.jsx # Utility/helper functions
│ ├── App.jsx # Main app component
│ └── main.jsx # Application entry point
├── index.html # HTML template
├── package.json # Project metadata and dependencies
└── vite.config.js # Vite configuration
