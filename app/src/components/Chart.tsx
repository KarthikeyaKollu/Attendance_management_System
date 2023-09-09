import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};
interface ChartProps{
  labels:string[];
  bars:number[];
  studentName:String;
  width:number;
  height:number;

}




const Chart = ({labels,bars,studentName ,width,height}:ChartProps) => {
  

  const data = {
    labels,
    datasets: [
      {
        label: `${studentName}`,
        data: bars, // Example array of values
        backgroundColor: (ctx: { dataset: { data: { [x: string]: any; }; }; dataIndex: string | number; }) => {
          const value = ctx.dataset.data[ctx.dataIndex];
          const hue = (value / 100) * 120; // Calculate the hue value from 0 to 120 based on the value
          return `hsl(${hue}, 100%, 50%)`;
        },
      },
    ],
  };


    
  return (
 <div style={{ width: width, height:height }}>
  <Bar options={options} data={data} />
  </div>
  );
};

export default Chart;
