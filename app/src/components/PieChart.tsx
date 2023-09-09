import React from 'react';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PieController,
  ArcElement,
  Tooltip as PieTooltip,
  Legend as PieLegend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  PieController,
  ArcElement,
  Title,
  PieTooltip,
  PieLegend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: 'white'
      },
    },
    title: {
      display: true,
      text: 'Chart.js Pie Chart',
      color: 'white'
        },
  },
};

interface PieChartProps {
  labels: string[];
  data: number[];
  studentName: string;
  width: number;
  height: number;
}

const PieChart = ({ labels, data, studentName, width, height }: PieChartProps) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: `${studentName}`,
        data,
        backgroundColor: (ctx: { dataset: { data: number[] }; dataIndex: number }) => {
          const value = ctx.dataset.data[ctx.dataIndex];
          const hue = (value / 100) * 120;
          return `hsl(${hue}, 100%, 50%)`;
        },
      },
    ],
  };

  return (
    <div style={{ width: width, height: height }}>
      <Pie options={options} data={chartData} />
    </div>
  );
};

export default PieChart;
