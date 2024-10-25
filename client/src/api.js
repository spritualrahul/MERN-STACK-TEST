import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust if necessary

export const getTransactions = async (month, search, page) => {
    const response = await axios.get(`${API_BASE_URL}/transactions`, {
        params: { month, search, page }
    });
    return response.data;
};

export const getStatistics = async (month) => {
    const response = await axios.get(`${API_BASE_URL}/statistics`, {
        params: { month }
    });
    return response.data;
};

export const getBarChartData = async (month) => {
    const response = await axios.get(`${API_BASE_URL}/bar-chart`, {
        params: { month }
    });
    return response.data;
    
};

export const getPieChartData = async (month) => {
    const response = await axios.get(`${API_BASE_URL}/piechart`, {
        params: { month }
    });
    return response.data;
};
