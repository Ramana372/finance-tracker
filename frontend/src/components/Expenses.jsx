import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getTransactions, addTransaction } from '../services/api';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        setIsLoading(true);
        const response = await getTransactions();
        const expenseTransactions = response.data.filter(transaction =>
          transaction.type === 'expense'
        );
        setExpenses(expenseTransactions);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching expense data:', error);
        setError('Failed to load expense data. Please try again later.');
        setIsLoading(false);
        setExpenses([]);
      }
    };

    fetchExpenseData();
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Only create chart if there is data
    if (expenses.length > 0) {
      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: expenses.map(e => e.name),
          datasets: [
            {
              label: 'Expense',
              data: expenses.map(e => e.amount),
              backgroundColor: 'rgba(231, 76, 60, 0.6)',
              borderColor: 'rgba(231, 76, 60, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [expenses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!expenseName || !expenseAmount) return;

    try {
      setError(null);
      const newExpenseEntry = {
        name: expenseName,
        amount: parseFloat(expenseAmount),
        type: 'expense',
        date: new Date().toISOString(),
        id: Date.now().toString()
      };

      await addTransaction(newExpenseEntry);
      setExpenses([...expenses, newExpenseEntry]);
      setExpenseName('');
      setExpenseAmount('');
    } catch (error) {
      console.error("Error adding expense:", error);
      setError('Failed to add expense. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

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
      gridTemplateColumns: '1fr 1.5fr',
      gap: '2rem',
      marginTop: '2rem'
    },
    historySection: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      maxHeight: '450px',
      height: '450px', // <-- add this
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
      height: '450px', // <-- add this
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
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
      <h1 style={styles.heading}>Expense</h1>
      
      {error && <div style={styles.errorMessage}>{error}</div>}
      
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="expense-name" style={styles.label}>Expense For:</label>
            <input
              type="text"
              id="expense-name"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              style={styles.input}
              placeholder="Rent, Food, Travel, etc."
            />
            
            <label htmlFor="expense-amount" style={styles.label}>Amount (₹):</label>
            <input
              type="number"
              id="expense-amount"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              style={styles.input}
              placeholder="0.00"
            />
            
            <button type="submit" style={styles.button}>Add Expense</button>
          </div>
        </form>
      </div>

      <div style={styles.layout}>
        <div style={styles.historySection}>
          <h3 style={styles.historyHeading}>Expense History</h3>
          {isLoading ? (
            <div style={styles.loadingMessage}>Loading expense history...</div>
          ) : expenses.length === 0 ? (
            <p>No expense entries yet. Add your first one!</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {expenses.map((exp) => (
                <li key={exp.id} style={styles.listItem}>
                  <div style={styles.incomeInfo}>
                    <span>{exp.name}</span>
                    <span style={styles.dateText}>{formatDate(exp.date)}</span>
                  </div>
                  <span style={{ fontWeight: 'bold', color: '#E74C3C' }}>₹{exp.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={styles.chartSection}>
          <h3 style={styles.historyHeading}>Expense Distribution</h3>
          {isLoading ? (
            <div style={styles.loadingMessage}>Loading chart data...</div>
          ) : (
            <canvas ref={chartRef} style={{ width: '100%', height: '300px' }}></canvas>
          )}
        </div>
      </div>

      <div style={styles.totalSection}>
        <h3 style={{ margin: 0 }}>Total Expenses</h3>
        <p style={styles.totalAmount}>₹{total.toFixed(2)}</p>
      </div>
    </fieldset>
  );
};

export default Expense;
