import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import marketRoutes from './routes/market.js';
import portfolioRoutes from './routes/portfolio.js';
import analyticsRoutes from './routes/analytics.js';
import { fetchMarkets } from './services/cryptoService.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/analytics', analyticsRoutes);

const server = createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_URL } });

io.on('connection', (socket) => {
  socket.emit('connected', { message: 'Socket connected' });
});

setInterval(async () => {
  try {
    const markets = await fetchMarkets();
    io.emit('market:update', markets);
  } catch {
    // ignore transient API errors
  }
}, 30000);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
