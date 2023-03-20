import React, {useState, useEffect} from 'react';
// import axios from 'axios'
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

export default function FarmChart(props) {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: '친환경',
        data: [],
        borderColor: '#111',
        backgroundColor: '#fff3b2',
      },
      {
        label: '일반',
        data: [],
        borderColor: '#111',
        backgroundColor: '#111',
      }
    ]
  });
  const ticks = {
    ticks: {
      color: '#111',
      font: {weight: 'bold',family: 'Noto Sans KR'},
    }
  }
  const options = {
    indexAxis: 'x',
    elements: {bar: {borderWidth: 1,},},
    responsive: true,
    scales: {
      y: ticks,
      x: ticks
    },
    plugins: {
      legend: {position: 'top',},
      title: {display: false},
    },
  };

  useEffect(() => {
    if(props.chartData){
      const newEcoPrice = [], newLabels = [], newnormalPrice =[]
      props.chartData.map(v => newLabels.push(v.itemName))
      props.chartData.map(v => newEcoPrice.push(v.ecoPrice))
      props.chartData.map(v => newnormalPrice.push(v.normalPrice))
      setData({
        labels: newLabels,
        datasets: [
          {
            label: '친환경',
            borderColor: '#333',
            backgroundColor: '#fff3b2',
            data: newEcoPrice,
          }, {
            label: '일반',
            borderColor: '#333',
            backgroundColor: '#333',
            data: newnormalPrice
          }
        ]
      })
    }
  },[props.chartData])
  return (
    <Bar options={options} data={data} id="chart"/>
  );
}
