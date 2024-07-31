
"use client"; 

import React, { useEffect, useState } from 'react';
import StockDashboard from '../../components/StockDashboard';
import NavBar from '../../components/NavBar';

async function fetchStockData() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/stock-data-db/');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched stock data:', data); 
    return data;
  } catch (error) {
    console.error('Error fetching stock data:', error.message); 
    throw error;
  }
}

const DashboardPage = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStockData = async () => {
      try {
        const data = await fetchStockData();
        setStocks(data);
      } catch (error) {
        console.error('Error fetching stock data:', error.message); 
        setError('Failed to fetch stock data');
      }
    };

    getStockData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
    <NavBar />
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Stock Dashboard</h1>
        <StockDashboard stocks={stocks} />
      </main>
    </div>
    </div>
  );
};

export default DashboardPage; 

