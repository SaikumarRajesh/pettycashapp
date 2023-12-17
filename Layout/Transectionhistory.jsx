import './Transectionhistory.css'
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { backendurl } from '../config';


const Transectionhistory = ({ transactions, setTransactions, setBalance, setIncome, setExpenses }) => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [showDateRange, setShowDateRange] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');



  useEffect(() => {
    setTransactionHistory(transactions);

  }, [transactions]);

  const handleDelete = async (transactionId) => {
    try {
      const response = await fetch(`${backendurl}/userTransection/delete/${transactionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {

        const updatedTransactions = transactions.filter(transaction => transaction._id !== transactionId);
        setTransactions(updatedTransactions);

        let totalIncome = 0;
        let totalExpenses = 0;

        updatedTransactions.forEach(transaction => {
          const parsedAmount = parseFloat(transaction.amount);

          if (transaction.optionId === 'INCOME') {
            totalIncome += parsedAmount;
          } else {
            totalExpenses += parsedAmount;
          }
        });

        setIncome(totalIncome);
        setExpenses(totalExpenses);
        setBalance(totalIncome - totalExpenses);
      } else {
        console.error('Error deleting transaction');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleFilterByRange = () => {
    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
    });

    setTransactionHistory(filteredTransactions);
    setShowDateRange(false);
  }


  return (

    <div className="history-transactions">
      <h1 className="transaction-header">History</h1>   <div className="filter-container">
        <button onClick={() => setShowDateRange(!showDateRange)} className='filter-button'>Filter</button>
        {showDateRange && (
          <div className="date-range-dropdown">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
            />
            <button onClick={handleFilterByRange}>Apply</button>
          </div>
        )}
      </div>
      <div className="transactions-table-container">
        <ul className="transactions-table">
          <li className="table-header">
            <p className="table-header-cell">Title</p>
            <p className="table-header-cell">Amount</p>
            <p className="table-header-cell">Type</p>
            <p className="table-header-cell">Date</p>
          </li>
          {transactionHistory.map(transaction => (
            <li className="table-row" key={transaction._id}>
              <p className="transaction-text">{transaction.title}</p>
              <p className="transaction-text">{transaction.amount}</p>
              <p className="transaction-text">{transaction.optionId}</p>
              <p className="transaction-text">{new Date(transaction.date).toLocaleDateString()}</p>
              <div className="delete-container">
                <button
                  className="delete-button"
                  type="button"
                  onClick={() => handleDelete(transaction._id)}
                >
                  <img
                    className="delete-img"
                    src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
                    alt="delete"
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
   
    </div>
  )

}

Transectionhistory.propTypes = {
  transactions: PropTypes.array.isRequired,
  setTransactions: PropTypes.func.isRequired,
  setBalance: PropTypes.func.isRequired,
  setIncome: PropTypes.func.isRequired,
  setExpenses: PropTypes.func.isRequired,
};


export default Transectionhistory






