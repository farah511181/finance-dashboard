# Finance Dashboard UI

## Overview
Clean, responsive finance dashboard built with React, Vite, Tailwind CSS, Recharts, and Zustand. Meets all assignment requirements including role-based UI, filtering, charts, and insights.

## Features
- **Dashboard Overview**: Summary cards, balance trend line chart, spending pie chart
- **Transactions**: List with search, filter (category/type), sort (date/amount), Admin add form
- **Role-Based Access**: Viewer (read-only), Admin (add transactions)
- **Insights**: Top spending category, monthly net, total categories
- **Responsive**: Works on mobile/desktop
- **State Management**: Zustand for global state

## Role Demo
- Switch role using top-right dropdown
- Viewer: Read-only view
- Admin: Add new transactions, shows edit/delete buttons

## Tech Stack
- React 18 + Vite
- Tailwind CSS
- Recharts (charts/visualizations)
- Zustand (state management)
- Mock data (20+ transactions)

## Setup & Run
1. `npm install --legacy-peer-deps`
2. `npm run dev` (runs on http://localhost:5173)
3. Open in browser

## Screenshots
*(View live demo)*

## Assumptions & Notes
- Static mock data
- Basic RBAC simulation (no backend)
- Responsive grid layouts
- Edge cases handled (no transactions, empty filters)
- Ready for production enhancements (API, auth, persistence)

Built by Farah Naz - Frontend Developer Intern Assignment.

