import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

export function LineChart() {
  const data = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [{
      label: 'Ventas',
      data: [12000, 19000, 3000, 5000, 2000, 3000],
      borderColor: '#646cff',
      fill: true,
      tension: 0.4
    }]
  }

  return <Line data={data} />
}

export function BarChart() {
  const data = {
    labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D'],
    datasets: [{
      label: 'Ventas',
      data: [120, 190, 30, 50],
      backgroundColor: '#646cff'
    }]
  }

  return <Bar data={data} />
}
