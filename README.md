# React Todo App

A simple and clean Todo list app built using React, Context API, and TailwindCSS. Supports create, edit, delete, and mark complete — with full localStorage persistence.


## 🚀 Features

- Add, edit, delete todos
- Mark todos as complete
- Data saved in `localStorage` even after refresh
- Responsive design with TailwindCSS

## 🧠 How It Works (Data Flow)

- The app uses React Context (`TodoContext`) to manage global todo state.
- All logic (add, edit, delete, toggle complete) is inside the provider.
- `useTodo()` is a custom hook that exposes context data and functions to components.
- LocalStorage is synced using `useEffect` with a `hasLoaded` flag to avoid overwrites.

## 🛠️ Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/todo-app.git

# Navigate to project
cd todo-app

# Install dependencies
npm install

# Run the app
npm run dev
