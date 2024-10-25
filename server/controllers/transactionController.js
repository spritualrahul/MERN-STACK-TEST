const axios = require('axios');
const Product = require('../models/Product');

// Initialize the database by fetching data from the third-party API
const initializeDatabase = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = response.data;

        // Clear the existing data and seed new data
        await Product.deleteMany({});
        await Product.insertMany(data);

        res.status(200).json({ message: 'Database initialized with seed data' });
    } catch (error) {
        res.status(500).json({ message: 'Error initializing database', error });
    }
};

// Utility function to filter products by month
const filterByMonth = (products, month) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    const monthIndex = monthNames.indexOf(month);
    return products.filter(product => {
        const productDate = new Date(product.dateOfSale);
        return productDate.getMonth() === monthIndex;
    });
};

// List transactions with search and pagination
const listTransactions = async (req, res) => {
    const { month, search = '', page = 1, perPage = 10 } = req.query;
    try {
        const allProducts = await Product.find();
        const filteredProducts = filterByMonth(allProducts, month);

        const searchRegex = new RegExp(search, 'i');
        const results = filteredProducts.filter(product =>
            searchRegex.test(product.title) ||
            searchRegex.test(product.description) ||
            (product.price && product.price.toString().includes(search))
        );

        const startIndex = (page - 1) * perPage;
        const paginatedResults = results.slice(startIndex, startIndex + perPage);

        res.json({ page, perPage, totalResults: results.length, results: paginatedResults });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get statistics for the selected month
const getStatistics = async (req, res) => {
    const { month } = req.query;
    try {
        const allProducts = await Product.find();
        const filteredProducts = filterByMonth(allProducts, month);

        const totalSaleAmount = filteredProducts.filter(item => item.sold).reduce((sum, item) => sum + item.price, 0);
        const totalSoldItems = filteredProducts.filter(item => item.sold).length;
        const totalNotSoldItems = filteredProducts.filter(item => !item.sold).length;

        res.json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get bar chart data for the selected month
const getBarChartData = async (req, res) => {
    const { month } = req.query;
    try {
        const allProducts = await Product.find();
        const filteredProducts = filterByMonth(allProducts, month);

        const priceRanges = {
            '0-100': 0, '101-200': 0, '201-300': 0, '301-400': 0, '401-500': 0,
            '501-600': 0, '601-700': 0, '701-800': 0, '801-900': 0, '901-above': 0
        };

        filteredProducts.forEach(product => {
            if (product.price <= 100) priceRanges['0-100']++;
            else if (product.price <= 200) priceRanges['101-200']++;
            else if (product.price <= 300) priceRanges['201-300']++;
            else if (product.price <= 400) priceRanges['301-400']++;
            else if (product.price <= 500) priceRanges['401-500']++;
            else if (product.price <= 600) priceRanges['501-600']++;
            else if (product.price <= 700) priceRanges['601-700']++;
            else if (product.price <= 800) priceRanges['701-800']++;
            else if (product.price <= 900) priceRanges['801-900']++;
            else priceRanges['901-above']++;
        });

        res.json(priceRanges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get pie chart data by unique categories for the selected month
const getPieChartData = async (req, res) => {
    const { month } = req.query;
    try {
        const allProducts = await Product.find();
        const filteredProducts = filterByMonth(allProducts, month);

        const categoryCount = filteredProducts.reduce((acc, product) => {
            acc[product.category] = (acc[product.category] || 0) + 1;
            return acc;
        }, {});

        res.json(categoryCount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Combine all responses from other APIs
const getCombinedData = async (req, res) => {
    const { month } = req.query;
    try {
        const transactionsResponse = await listTransactions({ query: { month } });
        const statisticsResponse = await getStatistics({ query: { month } });
        const barChartResponse = await getBarChartData({ query: { month } });
        const pieChartResponse = await getPieChartData({ query: { month } });

        res.json({
            transactions: transactionsResponse.data,
            statistics: statisticsResponse.data,
            barChart: barChartResponse.data,
            pieChart: pieChartResponse.data
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    initializeDatabase,
    listTransactions,
    getStatistics,
    getBarChartData,
    getPieChartData,
    getCombinedData
};

