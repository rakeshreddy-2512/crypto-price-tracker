import { Router } from 'express';
import { portfolios } from '../data/store.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);

router.get('/', (req, res) => {
  res.json(portfolios.get(req.user.id) ?? []);
});

router.post('/', (req, res) => {
  const { coinId, symbol, quantity, buyPrice } = req.body;
  if (!coinId || !symbol || !quantity || !buyPrice) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const holdings = portfolios.get(req.user.id) ?? [];
  const item = { id: crypto.randomUUID(), coinId, symbol, quantity: Number(quantity), buyPrice: Number(buyPrice), createdAt: new Date().toISOString() };
  holdings.push(item);
  portfolios.set(req.user.id, holdings);
  res.status(201).json(item);
});

router.delete('/:id', (req, res) => {
  const holdings = portfolios.get(req.user.id) ?? [];
  portfolios.set(req.user.id, holdings.filter((h) => h.id !== req.params.id));
  res.status(204).send();
});

export default router;
