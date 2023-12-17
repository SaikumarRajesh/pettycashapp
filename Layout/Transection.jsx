import './Transection.css'
import { useState, useEffect } from 'react';
import { backendurl } from '../config';
import MoneyDetails from './Moneydiv';
import Header from './Header';
import Transectionhistory from './Transectionhistory';


const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const TransactionItem = () => {
  const initialFormData = {
    title: '',
    amount: '',
    optionId: transactionTypeOptions[0].optionId,
  };

  const [formData, setFormData] = useState(initialFormData);
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const Name = user.Name
  const user_Id = user.user_Id


  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);



  useEffect(() => {
    fetchTransactionHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTransactionHistory = async () => {
    try {
      const response = await fetch(`${backendurl}/userTransection/user/${user_Id}/history`);
      const data = await response.json();
      console.log(data)
      if (response.ok) {

        let totalIncome = 0;
        let totalExpenses = 0;

        data.transactionHistory.forEach((transaction) => {
          const parsedAmount = parseFloat(transaction.amount);

          if (transaction.optionId === 'INCOME') {
            totalIncome += parsedAmount;
          } else {
            totalExpenses += parsedAmount;
          }
        });
        setBalance(totalIncome - totalExpenses);
        setIncome(totalIncome);
        setExpenses(totalExpenses);

        setTransactions(data.transactionHistory);
      } else {
        console.error('Error fetching transaction history:', data.message);
      }
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (income === expenses && formData.optionId === 'EXPENSES') {
      alert('Insufficient Balance.');
    }else if ( parseFloat(formData.amount) > balance && formData.optionId === 'EXPENSES') {
      alert('Insufficient Balance');
    }else { 

    try {
      const payload = { ...formData, user_Id, Name };
      const response = await fetch(`${backendurl}/userTransection/addtransaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Added');
        fetchTransactionHistory();
      } else {
        console.error('Error adding transaction');
        alert('Error adding transaction');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  }
   
      setFormData(initialFormData);
    
  };

  return (
    <>
      <div className="app-container">
        <div className="responsive-container">
          <div className="Header-container">
            <Header />
          </div>
          <MoneyDetails
            balanceAmount={balance}
            incomeAmount={income}
            expensesAmount={expenses}
          />
          <div className="transaction-details" >

            <form className="transaction-form" onSubmit={handleSubmit} >
              <h1 className="transaction-header">Add Transaction</h1>
              <label className="input-label" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="input"
                placeholder="TITLE"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              <label className="input-label" htmlFor="amount">
                AMOUNT
              </label>
              <input
                type="text"
                id="amount"
                name="amount"
                className="input"
                placeholder="AMOUNT"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
              <label className="input-label" htmlFor="select">
                TYPE
              </label>
              <select
                id="select"
                className="input"
                name="optionId"
                value={formData.optionId}
                onChange={handleInputChange}
                required
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <Transectionhistory
              transactions={transactions}
              setTransactions={setTransactions}
              setBalance={setBalance}
              setIncome={setIncome}
              setExpenses={setExpenses} />
          </div>
        </div>
      </div>
    </>
  )
}

export default TransactionItem