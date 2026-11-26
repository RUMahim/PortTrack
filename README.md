# PortTrack — Container Cargo Tracking System for Import & Export

PortTrack is a web-based cargo, container, and ship tracking application for ports
handling import and export shipments. Port officials register ship arrivals,
shipments, and containers and update their status, while importers and exporters
track their cargo in real time using a tracking ID.

Built according to the project proposal: **PortTrack: A Container Cargo Tracking
System for Import & Export** (MERN stack).

## Features

- **Role-based authentication (JWT)** — Admin/Port Officer, Importer, Exporter
- **Ship management** — arrival/departure dates, dock number, status (Expected / Arrived / Departed)
- **Shipment registration** — import & export cargo with container ID, goods type, origin, destination, linked ship and owner; tracking IDs auto-generate as `PT-YYYY-XXXX`
- **Container status tracking** — Booked → Loaded → In Transit → Arrived at Port → Customs Clearance → Delivered, with full status history
- **Public tracking** — search by tracking ID or container ID without login
- **Dashboard** — total ships/shipments/containers, delivered count, Import vs Export summary, container pipeline, recent shipments, ships arriving soon
- **Notifications** — the shipment owner is notified whenever a container status changes

Importers and exporters only see their own shipments and containers. The admin sees everything.

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | React (Vite), React Router, Axios |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Auth | JWT + bcrypt password hashing |

## Project structure

```
PortTrack/
├── backend/
│   ├── models/        User, Ships, Shipment, Container, Notification
│   ├── middleware/    JWT auth + role guard
│   ├── routes/        auth, ships, shipments, containers, track, notifications, dashboard, users
│   ├── server.js      API entry point
│   └── seed.js        Demo data seeder
└── frontend/
    └── src/
        ├── pages/     Login, Register, Dashboard, ShipManagement, ShipmentManagement, ContainerManagement, TrackShipment, Notifications
        ├── components/ Layout, StatusStepper, ProtectedRoute
        └── context/   AuthContext
```

## Getting started

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # then fill in MONGODB_URI and JWT_SECRET
npm run seed           # optional: create demo users, ships, shipments, containers
npm run dev            # http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_URL=http://localhost:5000
npm run dev            # http://localhost:5173
```

## Demo accounts (after `npm run seed`)

Password for all demo accounts: `demo123`

| Role | Email |
| --- | --- |
| Admin / Port Officer | admin@porttrack.demo |
| Importer | importer@porttrack.demo |
| Exporter | exporter@porttrack.demo |

Try public tracking with demo tracking ID: **PT-2026-1042**

## API overview

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Public | Register importer/exporter |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| GET | `/api/auth/me` | Logged in | Current user |
| GET | `/api/ships` | Logged in | List ships |
| POST/PUT/DELETE | `/api/ships` | Admin | Manage ships |
| GET | `/api/shipments` | Logged in | List shipments (own only, admin sees all) |
| POST | `/api/shipments` | Logged in | Create shipment + container |
| PUT/DELETE | `/api/shipments/:id` | Owner/Admin | Update/delete shipment |
| GET | `/api/containers` | Logged in | List containers |
| PUT | `/api/containers/:id/status` | Admin | Update status (notifies owner) |
| GET | `/api/track/:query` | Public | Track by tracking ID or container ID |
| GET | `/api/notifications` | Logged in | My notifications |
| GET | `/api/dashboard` | Logged in | Summary counts + Import vs Export |

## Environment variables

Backend (`.env`): `PORT`, `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRE`, `CLIENT_URL`
Frontend (`.env`): `VITE_API_URL`
