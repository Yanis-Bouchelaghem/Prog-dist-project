import React from 'react';
import TransactionList from './components/TransactionList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      {/*<Header />*/}
      <TransactionList />
    </div>
  );
};

export default App;