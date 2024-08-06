// src/app/report/page.js

"use client";

import React, { useEffect, useState } from 'react';
import ReportDashboard from '../../components/ReportDashboard';
import NavBar from '../../components/NavBar';


const getToken = () => {
    return localStorage.getItem('access_token');
  };
  
  // Function to fetch stock data with authorization header
  async function fetchStockData() {
    const token = getToken();
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/stock-data-db/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.status === 401) {
        window.location.href = '/login'

        // Handle unauthorized error, e.g., refresh token or redirect to login
        console.error('Unauthorized access - handle token refresh or login');
        return null;
      }
  
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
  


const ReportPage = () => {
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
        <h1 className="text-4xl font-bold mb-6">Stock Report</h1>
        <ReportDashboard stocks={stocks} />
      </main>
    </div>
    </div>
  );
};

export default ReportPage; 
