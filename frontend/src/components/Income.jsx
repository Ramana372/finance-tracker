import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getTransactions, addTransaction } from '../services/api';

const Income = () => {
  const [income, setIncome] = useState([]);
  const [incomeName, setIncomeName] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Fetch income data
  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        setIsLoading(true);
        const response = await getTransactions();
        const incomeTransactions = response.data.filter(transaction => transaction.type === 'income');
        setIncome(incomeTransactions);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching income data:', error);
        setError('Failed to load income data. Please try again later.');
        setIsLoading(false);
        setIncome([]); // Set empty array on error
      }
    };

    fetchIncomeData();
  }, []);

  // Handle chart updates
  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Only create chart if there is data
      if (income.length > 0) {
        chartInstance.current = new Chart(chartRef.current, {
          type: 'bar',
          data: {
            labels: income.map(i => i.name),
            datasets: [
              {
                label: 'Income',
                data: income.map(i => i.amount),
                backgroundColor: 'rgba(39, 174, 96, 0.6)',
                borderColor: 'rgba(39, 174, 96, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, [income]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!incomeName || !incomeAmount) return;

    try {
      setError(null);
      const newIncomeEntry = {
        name: incomeName,
        amount: parseFloat(incomeAmount),
        type: 'income',
        date: new Date().toISOString(),
        id: Date.now().toString()
      };

      await addTransaction(newIncomeEntry);
      setIncome([...income, newIncomeEntry]);
      setIncomeName('');
      setIncomeAmount('');
    } catch (error) {
      console.error("Error adding income:", error);
      setError('Failed to add income. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const total = income.reduce((acc, curr) => acc + curr.amount, 0);

  const styles = {
    container: {
      backgroundColor: '#f5f7fa',
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      border: '1px solid #ddd',
      marginTop:'70px'
    },
    heading: {
      color: '#2C3E50',
      fontFamily: 'Grape Nuts, cursive',
      marginTop: 0,
      borderBottom: '2px solid #27AE60',
      paddingBottom: '0.5rem',
      display: 'inline-block'
    },
    formContainer: {
      marginBottom: '2rem'
    },
    formGroup: {
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    label: {
      fontWeight: 'bold',
      marginRight: '10px',
      fontSize: '16px'
    },
    input: {
      width: '150px',
      borderRadius: '5px',
      padding: '0.5rem',
      border: '1px solid #ddd',
      fontSize: '16px'
    },
    button: {
      backgroundColor: '#27AE60',
      color: 'white',
      padding: '0.6rem 1.2rem',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '16px',
      marginTop: '1rem',
      transition: 'background-color 0.3s'
    },
    layout: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem',
      marginTop: '2rem',
      alignItems: 'stretch'
    },
    historySection: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      height: '400px',
      overflowY: 'auto'
    },
    historyHeading: {
      color: '#2C3E50',
      borderBottom: '1px solid #eee',
      paddingBottom: '0.5rem',
      marginTop: 0
    },
    listItem: {
      borderBottom: '1px solid #eee',
      padding: '0.8rem 0',
      display: 'flex',
      justifyContent: 'space-between'
    },
    incomeInfo: {
      display: 'flex',
      flexDirection: 'column'
    },
    dateText: {
      fontSize: '12px',
      color: '#888',
      marginTop: '4px'
    },
    chartSection: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      height: '400px'
    },
    totalSection: {
      marginTop: '2rem',
      backgroundColor: '#2C3E50',
      color: 'white',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    totalAmount: {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: 0
    },
    errorMessage: {
      backgroundColor: '#ffebee',
      color: '#c62828',
      padding: '10px 15px',
      borderRadius: '4px',
      marginBottom: '15px',
      fontSize: '14px'
    },
    loadingMessage: {
      textAlign: 'center',
      padding: '20px',
      color: '#666',
      fontStyle: 'italic'
    }
  };

  return (
    <fieldset style={styles.container}>
      <h1 style={styles.heading}>Income</h1>

      {error && <div style={styles.errorMessage}>{error}</div>}

      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="income-name" style={styles.label}>Income Source:</label>
            <input
              type="text"
              id="income-name"
              value={incomeName}
              onChange={(e) => setIncomeName(e.target.value)}
              style={styles.input}
              placeholder="Salary, Freelance, etc."
            />

            <label htmlFor="income-amount" style={styles.label}>Amount (₹):</label>
            <input
              type="number"
              id="income-amount"
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)}
              style={styles.input}
              placeholder="0.00"
            />

            <button
              type="submit"
              style={styles.button}>
              Add Income
            </button>
          </div>
        </form>
      </div>

      <div style={styles.layout}>
        <div style={styles.historySection}>
          <h3 style={styles.historyHeading}>Income History</h3>
          {isLoading ? (
            <div style={styles.loadingMessage}>Loading income history...</div>
          ) : income.length === 0 ? (
            <p>No income entries yet. Add your first income source!</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {income.map((inc) => (
                <li key={inc.id} style={styles.listItem}>
                  <div style={styles.incomeInfo}>
                    <span>{inc.name}</span>
                    <span style={styles.dateText}>{formatDate(inc.date)}</span>
                  </div>
                  <span style={{ fontWeight: 'bold', color: '#27AE60' }}>₹{inc.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={styles.chartSection}>
          <h3 style={styles.historyHeading}>Income Distribution</h3>
          {isLoading ? (
            <div style={styles.loadingMessage}>Loading chart data...</div>
          ) : (
            <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
          )}
        </div>
      </div>

      <div style={styles.totalSection}>
        <h3 style={{ margin: 0 }}>Total Income</h3>
        <p style={styles.totalAmount}>₹{total.toFixed(2)}</p>
      </div>
    </fieldset>
  );
};

export default Income;
