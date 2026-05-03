# Crypto Tracker Pro

A full-stack **cryptocurrency tracking platform** built with **React + Tailwind CSS** and **Node.js + Express**, featuring real-time market streaming, portfolio management, authentication, and analytics.

## Features

- 🔐 JWT authentication (register/login)
- 📈 Real-time market feed via CoinGecko + Socket.IO broadcasting
- 📊 Live price chart (7-day sparkline)
- 💼 Portfolio tracking (add/remove holdings)
- 🧠 Analytics dashboard (current value, P/L, ROI)
- 🎨 Professional dark UI with Tailwind CSS

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Chart.js (`react-chartjs-2`)
- Axios
- Socket.IO client

### Backend
- Node.js
- Express
- Socket.IO
- JWT + bcryptjs authentication
- CoinGecko API integration

## Project Structure

```bash
crypto-price-tracker/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   └── ...
├── server/
│   ├── src/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── data/
│   └── ...
└── README.md
```

## Quick Start

### 1) Install dependencies

```bash
npm install
```

### 2) Environment setup

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### 3) Run development servers

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## API Overview

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Market
- `GET /api/market/markets`
- `GET /api/market/global`

### Portfolio (Bearer Token required)
- `GET /api/portfolio`
- `POST /api/portfolio`
- `DELETE /api/portfolio/:id`

### Analytics (Bearer Token required)
- `GET /api/analytics`

## Real-Time Flow

1. Server polls CoinGecko every 30 seconds.
2. Updated market data is emitted through `market:update` Socket.IO event.
3. Dashboard subscribes and re-renders with latest prices.

## Notes

- Data storage is in-memory for demo speed and simplicity.
- For production, replace with PostgreSQL/MongoDB + Redis caching.
- Add rate-limiting and refresh-token strategy for hardened auth.

## Production Build

```bash
npm run build
npm run start
```

## License

MIT (see `LICENSE`)
