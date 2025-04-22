// Local storage based services
export const registerUser = (userData) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const existingUser = users.find(user => user.username === userData.username);
  
  if (existingUser) {
    throw new Error('Username already exists');
  }
  
  users.push(userData);
  localStorage.setItem('users', JSON.stringify(users));
  return { data: { user: userData } };
};

export const loginUser = (credentials) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  return { data: { user } };
};

// Transaction services
export const getTransactions = () => {
  // Initialize transactions if not exists
  if (!localStorage.getItem('transactions')) {
    localStorage.setItem('transactions', JSON.stringify([]));
  }
  const transactions = JSON.parse(localStorage.getItem('transactions'));
  return { data: transactions };
};

export const addTransaction = (transaction) => {
  // Initialize transactions if not exists
  if (!localStorage.getItem('transactions')) {
    localStorage.setItem('transactions', JSON.stringify([]));
  }
  const transactions = JSON.parse(localStorage.getItem('transactions'));
  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  return { data: transaction };
};
