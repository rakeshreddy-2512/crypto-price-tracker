import { Router } from 'express';
import { fetchGlobal, fetchMarkets } from '../services/cryptoService.js';

const router = Router();

router.get('/markets', async (_req, res) => {
  try {
    const data = await fetchMarkets();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/global', async (_req, res) => {
  try {
    const data = await fetchGlobal();
    res.json(data.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
