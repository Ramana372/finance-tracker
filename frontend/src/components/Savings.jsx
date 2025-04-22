import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getTransactions } from '../services/api';

const Savings = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        setIsLoading(true);
        const response = await getTransactions();
        const expenseTransactions = response.data.filter(transaction =>
          transaction.type === 'expense'
        );
        const incomeTransactions = response.data.filter(transaction =>
          transaction.type === 'income'
        );
        setExpenses(expenseTransactions);
        setIncomes(incomeTransactions);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
        setError('Failed to load transaction data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchTransactionData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      // Calculate monthly savings data
      const monthlySavings = calculateMonthlySavings(incomes, expenses);
      
      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: monthlySavings.map(item => item.month),
          datasets: [
            {
              label: 'Income',
              data: monthlySavings.map(item => item.income),
              backgroundColor: 'rgba(46, 204, 113, 0.6)',
              borderColor: 'rgba(46, 204, 113, 1)',
              borderWidth: 1,
            },
            {
              label: 'Expenses',
              data: monthlySavings.map(item => item.expense),
              backgroundColor: 'rgba(231, 76, 60, 0.6)',
              borderColor: 'rgba(231, 76, 60, 1)',
              borderWidth: 1,
            },
            {
              label: 'Savings',
              data: monthlySavings.map(item => item.savings),
              backgroundColor: 'rgba(52, 152, 219, 0.6)',
              borderColor: 'rgba(52, 152, 219, 1)',
              borderWidth: 1,
            }
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount (₹)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Month'
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Monthly Income, Expenses and Savings'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ₹${context.raw.toFixed(2)}`;
                }
              }
            }
          }
        },
      });
    }
  }, [incomes, expenses]);

  const calculateMonthlySavings = (incomes, expenses) => {
    const monthlyData = {};
    
    incomes.forEach(income => {
      const date = new Date(income.date);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { month: monthYear, income: 0, expense: 0, savings: 0 };
      }
      
      monthlyData[monthYear].income += income.amount;
    });
    
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { month: monthYear, income: 0, expense: 0, savings: 0 };
      }
      
      monthlyData[monthYear].expense += expense.amount;
    });
    
    const result = Object.values(monthlyData).map(item => {
      item.savings = item.income - item.expense;
      return item;
    });

    return result.sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA - dateB;
    });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalSavings = totalIncome - totalExpense;

  const recentTransactions = [...incomes, ...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

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
      borderBottom: '2px solid #3498DB',
      display: 'inline-block'
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
      height: '450px',
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
    transactionInfo: {
      display: 'flex',
      flexDirection: 'column'
    },
    dateText: {
      fontSize: '12px',
      color: '#888',
      marginTop: '4px',
      height:'auto'
    },
    chartSection: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      height: '450px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    summarySection: {
      marginTop: '2rem',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '1rem'
    },
    summaryCard: {
      borderRadius: '8px',
      padding: '1rem 1.5rem',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    incomeCard: {
      backgroundColor: '#27AE60' // Green for income
    },
    expenseCard: {
      backgroundColor: '#E74C3C' // Red for expense
    },
    savingsCard: {
      backgroundColor: '#3498DB' // Blue for savings
    },
    cardTitle: {
      fontSize: '16px',
      fontWeight: 'normal',
      margin: '0 0 10px 0'
    },
    cardAmount: {
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
    },
    positive: {
      color: '#27AE60' // Green for positive amount
    },
    negative: {
      color: '#E74C3C' // Red for negative amount
    },
    neutral: {
      color: '#3498DB' // Blue for neutral amount
    }
  };

  return (
    <fieldset style={styles.container}>
      <h1 style={styles.heading}>Savings Dashboard</h1>
      
      {error && <div style={styles.errorMessage}>{error}</div>}

      <div style={styles.layout}>
        <div style={styles.historySection}>
          <h3 style={styles.historyHeading}>Recent Transactions</h3>
          {isLoading ? (
            <div style={styles.loadingMessage}>Loading transaction history...</div>
          ) : recentTransactions.length === 0 ? (
            <p>No transactions yet. Add income and expenses to see your savings!</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {recentTransactions.map((transaction) => (
                <li key={transaction.id} style={styles.listItem}>
                  <div style={styles.transactionInfo}>
                    <span>{transaction.name}</span>
                    <span style={styles.dateText}>{formatDate(transaction.date)}</span>
                  </div>
                  <span style={{ 
                    fontWeight: 'bold', 
                    color: transaction.type === 'income' ? '#27AE60' : '#E74C3C' 
                  }}>
                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={styles.chartSection}>
          <h3 style={styles.historyHeading}>Savings Analysis</h3>
          {isLoading ? (
            <div style={styles.loadingMessage}>Loading chart data...</div>
          ) : (
            <canvas ref={chartRef} style={{ width: '100%', height: '300px' }}></canvas>
          )}
        </div>
      </div>

      <div style={styles.summarySection}>
        <div style={{...styles.summaryCard, ...styles.incomeCard}}>
          <h3 style={styles.cardTitle}>Total Income</h3>
          <p style={styles.cardAmount}>₹{totalIncome.toFixed(2)}</p>
        </div>
        
        <div style={{...styles.summaryCard, ...styles.expenseCard}}>
          <h3 style={styles.cardTitle}>Total Expenses</h3>
          <p style={styles.cardAmount}>₹{totalExpense.toFixed(2)}</p>
        </div>
        
        <div style={{...styles.summaryCard, ...styles.savingsCard}}>
          <h3 style={styles.cardTitle}>Total Savings</h3>
          <p style={styles.cardAmount}>₹{totalSavings.toFixed(2)}</p>
        </div>
      </div>
      
      <div style={{ 
        marginTop: '2rem',
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={styles.historyHeading}>Savings Rate</h3>
        {isLoading ? (
          <div style={styles.loadingMessage}>Calculating savings rate...</div>
        ) : (
          <div>
            <p style={{ fontSize: '18px' }}>
              Your savings rate is <span style={{ 
                fontWeight: 'bold', 
                color: totalIncome > 0 ? '#3498DB' : '#7F8C8D' 
              }}>
                {totalIncome > 0 ? (totalSavings / totalIncome * 100).toFixed(2) : 0}%
              </span> of your income.
            </p>
            <p>
              {totalSavings > 0 
                ? "Great job! You're saving money."
                : totalSavings < 0
                  ? "Alert: You're spending more than you earn. Consider reducing expenses."
                  : "Your income and expenses are balanced."}
            </p>
          </div>
        )}
      </div>
    </fieldset>
  );
};

export default Savings;
