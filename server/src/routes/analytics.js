import { Router } from 'express';
import { portfolios } from '../data/store.js';
import { requireAuth } from '../middleware/auth.js';
import { fetchMarkets } from '../services/cryptoService.js';

const router = Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  try {
    const holdings = portfolios.get(req.user.id) ?? [];
    const markets = await fetchMarkets();
    const byId = Object.fromEntries(markets.map((coin) => [coin.id, coin]));

    const rows = holdings.map((h) => {
      const market = byId[h.coinId];
      const currentPrice = market?.current_price ?? h.buyPrice;
      const currentValue = currentPrice * h.quantity;
      const invested = h.buyPrice * h.quantity;
      const pnl = currentValue - invested;
      return { ...h, currentPrice, currentValue, invested, pnl, pnlPercent: (pnl / invested) * 100 };
    });

    const totalInvested = rows.reduce((sum, row) => sum + row.invested, 0);
    const totalCurrent = rows.reduce((sum, row) => sum + row.currentValue, 0);
    const totalPnl = totalCurrent - totalInvested;

    res.json({
      rows,
      summary: {
        totalAssets: rows.length,
        totalInvested,
        totalCurrent,
        totalPnl,
        roi: totalInvested ? (totalPnl / totalInvested) * 100 : 0
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
