import React, { useState } from 'react';
import MonthSelector from './MonthSelector';
import TransactionTable from './TransactionTable';

import Statistics from './Statistics';
import BarChart from './BarChart';

const Dashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState('2024-03');

    return (
        <div className="dashboard">
            <h1>Product Transactions Dashboard</h1>
            <div style={{display:"flex"}}>
            <MonthSelector selectedMonth={selectedMonth} onChange={setSelectedMonth} />
           
            </div>
            <TransactionTable selectedMonth={selectedMonth}  />
            <Statistics selectedMonth={selectedMonth} />
            <BarChart selectedMonth={selectedMonth}/>
           
        </div>
    );
};

export default Dashboard;
