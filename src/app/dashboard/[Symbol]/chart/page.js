// app/[Symbol]/chart/page.js

"use client";

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2'; // Import Line chart component from Chart.js
import Chart from 'chart.js/auto'; // Import Chart.js
import NavBar from '../../../../components/NavBar';

const fetchHistoricalStockData = async (symbol, period) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/historical-stock-data/?symbol=${symbol}&period=${period}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stock data:', error.message);
    throw error;
  }
};

const ChartPage = ({ params }) => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState('1mo'); // Default period is 1 month

  useEffect(() => {
    const getData = async () => {
      try {
        const historicalData = await fetchHistoricalStockData(params.Symbol, period);
        setData(historicalData);
      } catch (error) {
        console.error('Error fetching historical stock data:', error.message);
      }
    };

    getData();
  }, [params.Symbol, period]);

  const chartData = {
    labels: data.map(item => new Date(item.Date).toLocaleDateString()),
    datasets: [
      {
        label: 'Close Price',
        data: data.map(item => item.Close),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div>
    <NavBar />
   
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Stock Chart for {params.Symbol}</h1>
        <div className="mb-4">
          <label htmlFor="period" className="mr-2">Select Period:</label>
          <select
            id="period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border rounded p-2"
          >
            <option value="1w">1 Week</option>
            <option value="1mo">1 Month</option>
            <option value="3mo">3 Months</option>
            <option value="6mo">6 Months</option>
            <option value="1y">1 Year</option>
          </select>
        </div>
        <Line data={chartData} />
      </main>
    </div>
    </div>
  );
};

export default ChartPage;
