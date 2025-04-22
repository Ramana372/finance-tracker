import React from 'react';
import './Help.css';

const Help = () => {
  return (
    <div className="help-container">
      <h1>Help & Support</h1>
      <p className="intro-text">We're here to help you manage your expenses easily. Browse FAQs or reach out to us.</p>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <h4>💬 How do I add a new expense?</h4>
          <p>Go to the "Expense" page, click on "+ Add Expense", fill the details and hit Save.</p>
        </div>

        <div className="faq-item">
          <h4>💬 Can I edit or delete an income record?</h4>
          <p>Yes. Navigate to the "Income" page, find the record and use the Edit/Delete icons.</p>
        </div>

        <div className="faq-item">
          <h4>💬 How is Savings calculated?</h4>
          <p>Savings = Total Income - Total Expenses. You can view it on the "Savings" page.</p>
        </div>

        <div className="faq-item">
          <h4>💬 Is my data safe?</h4>
          <p>Yes, your data is securely stored and protected using authentication and encryption methods.</p>
        </div>
      </div>

      <div className="support-contact">
        <h2>Need more help?</h2>
        <p>Reach out to us through any of the options below:</p>
        <ul>
          <li><strong>Email:</strong> support@expensetracker.com</li>
          <li><strong>Live Chat:</strong> Available 9am–6pm (Mon–Fri)</li>
          <li><strong>Phone:</strong> +91-99999-88888</li>
        </ul>
      </div>
    </div>
  );
};

export default Help;
