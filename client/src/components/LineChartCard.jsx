import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js/auto';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function LineChartCard({ coin }) {
  if (!coin?.sparkline_in_7d?.price) return null;
  const prices = coin.sparkline_in_7d.price;
  const data = {
    labels: prices.map((_, i) => i + 1),
    datasets: [{ label: `${coin.symbol.toUpperCase()} 7D`, data: prices, borderColor: '#22d3ee', tension: 0.25, pointRadius: 0 }]
  };
  return <div className="card"><h3 className="font-semibold mb-2">Live Trend</h3><Line data={data} /></div>;
}
