// lib/api.js
export async function fetchStockData() {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/stock-data/');
      if (!response.ok) {
        throw new Error('Failed to fetch stock data');
      }
      const data = await response.json();
      console.log('Fetched stock data:', data); // Log the data
      return data;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw error;
    }
  }
  