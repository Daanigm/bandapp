# Bandapp 🎺 — Band Management Dashboard

A complete band management web application built with React, Vite, Tailwind CSS, and Lucide React icons.

## Features

- **Private Login**: Secure login for band managers (demo: `admin` / `banda2026`)
- **Dashboard**: Overview with metric cards, upcoming rehearsals, instrument status, stock alerts
- **Instrumentos**: Full CRUD for instruments (name, category, brand, model, quantity, status, condition)
- **Uniformes**: Full CRUD for uniforms (name, type, size, quantity, color, status)
- **Ensayos**: Rehearsal scheduling with date, time, duration, location, type, and notes
- **Almacén**: Inventory management with low stock alerts and min-stock thresholds
- **Settings**: Customize band name and upload/change the band logo (shield)
- **Mobile First**: Responsive sidebar becomes a hamburger drawer on mobile devices

## Tech Stack

- **React 18** (Vite)
- **Tailwind CSS v4**
- **Lucide React** (icons)
- **Vitest** + Testing Library (tests)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npx vitest run
```

## Login Credentials (Demo)

| Field    | Value       |
|----------|-------------|
| User     | `admin`     |
| Password | `banda2026` |

## Project Structure

```
bandapp/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx       # Responsive sidebar navigation
│   │   ├── Modal.jsx          # Reusable modal component
│   │   └── CrudTable.jsx      # Reusable CRUD table with search, add, edit, delete
│   ├── context/
│   │   └── AppContext.jsx     # Global state management (auth, data, CRUD operations)
│   ├── data/
│   │   └── mockData.js        # Sample data for instruments, uniforms, rehearsals, inventory
│   ├── pages/
│   │   ├── LoginPage.jsx      # Login screen
│   │   ├── DashboardPage.jsx  # Main dashboard with metrics
│   │   ├── InstrumentosPage.jsx
│   │   ├── UniformesPage.jsx
│   │   ├── EnsayosPage.jsx
│   │   ├── AlmacenPage.jsx
│   │   └── SettingsPage.jsx   # Band name & logo configuration
│   ├── test/
│   │   ├── setup.js
│   │   └── App.test.jsx       # 10 integration tests
│   ├── App.jsx                # Main app with page routing
│   ├── main.jsx               # Entry point
│   └── index.css              # Tailwind + custom styles
├── index.html
├── vite.config.js
├── vitest.config.js
├── package.json
└── README.md
```
