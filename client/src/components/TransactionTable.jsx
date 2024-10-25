import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api';

const TransactionTable = ({ selectedMonth }) => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    console.log(transactions);
    

    useEffect(() => {
        const fetchTransactions = async () => {
            const data = await getTransactions(selectedMonth, search, page);
            setTransactions(data.results);
            setTotalPages(Math.ceil(data.totalResults / 10)); // Assuming 10 results per page
        };

        fetchTransactions();
    }, [selectedMonth, search, page]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1); // Reset to the first page on search
    };

    return (

        <>

        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", textAlign:"center", marginTop:"-35px"}}>
        <input style={{textAlign:"center", width:"500px", height:"20px", padding:"10px"}}
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search transactions here...."
        />
        </div>

        <div  className="transaction-table">
           
           
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Date of Sale</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                            <td>{transaction.title}</td>
                            <td>{transaction.price}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.category}</td>
                            <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
        </>
    );
};

export default TransactionTable;
