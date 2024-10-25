// BarChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getBarChartData } from '../api';
import { Chart, registerables } from 'chart.js';

// Register all required components
Chart.register(...registerables);

const BarChart = ({ selectedMonth }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchBarChartData = async () => {
            try {
                const data = await getBarChartData(selectedMonth);
                const labels = Object.keys(data); // Price ranges
                const datasets = [{
                    label: 'Number of Transactions',
                    data: Object.values(data), // Counts for each range
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                }];
                
                setChartData({ labels, datasets });
            } catch (error) {
                console.error("Error fetching bar chart data:", error);
            }
        };

        fetchBarChartData();
    }, [selectedMonth]);

    return (
        <div className='bar-chart-container'>
            <h2>Bar Chart - {selectedMonth}</h2>
            {chartData.labels ? (
                <Bar data={chartData} />
            ) : (
                <p>Loading chart data...</p>
            )}
        </div>
    );
};

export default BarChart;