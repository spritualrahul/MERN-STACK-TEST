// Statistics.js
import React, { useEffect, useState } from 'react';
import { getStatistics } from '../api';

const Statistics = ({ selectedMonth }) => {
    const [statistics, setStatistics] = useState({
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await getStatistics(selectedMonth);
                setStatistics(data);
            } catch (error) {
                console.error("Error fetching transaction statistics:", error);
                setError("Failed to load statistics");
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, [selectedMonth]);

    if (loading) {
        return <p>Loading statistics...</p>;
    }

    if (error) {
        return <p>{error}</p>; 
    }

    return (
        <div className="statistics-container">
            <h2>Transaction Statistics for {selectedMonth}</h2>
            <div className="statistics-box">
                <div>
                    <h3>Total Sale Amount</h3>
                    <p>${statistics.totalSaleAmount.toFixed(2)}</p>
                </div>
                <div>
                    <h3>Total Sold Items</h3>
                    <p>{statistics.totalSoldItems}</p>
                </div>
                <div>
                    <h3>Total Not Sold Items</h3>
                    <p>{statistics.totalNotSoldItems}</p>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
