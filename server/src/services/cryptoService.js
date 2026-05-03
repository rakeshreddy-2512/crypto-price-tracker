const BASE_URL = 'https://api.coingecko.com/api/v3';

export async function fetchMarkets(vs = 'usd') {
  const url = `${BASE_URL}/coins/markets?vs_currency=${vs}&order=market_cap_desc&per_page=30&page=1&sparkline=true&price_change_percentage=24h,7d`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch market data');
  return response.json();
}

export async function fetchGlobal() {
  const response = await fetch(`${BASE_URL}/global`);
  if (!response.ok) throw new Error('Failed to fetch global data');
  return response.json();
}
