// const express = require('express');
// const mongoose = require('mongoose');
// const axios = require('axios');

// const app = express();

// const productSchema = new mongoose.Schema({
//     id: { type: Number, unique: true },
//     title: { type: String, required: true },
//     price: { type: Number, required: true },
//     description: { type: String },
//     category: { type: String },
//     image: { type: String },
//     sold: { type: Boolean, default: false },
//     dateOfSale: { type: Date, default: null }
// });

// const Product = mongoose.model('Product', productSchema);

// app.get('/initialize-db', async (req, res) => {
//     try {
//         const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
//         const data = response.data;

//         const products = data.map((item) => ({
//             id: item.id,
//             title: item.title,
//             price: item.price,
//             description: item.description,
//             category: item.category,
//             image: item.image,
//             sold: item.sold,
//             dateOfSale: item.sold ? new Date(item.dateOfSale) : null
//         }));

//         await Product.insertMany(products);

//         res.send('Database initialized successfully with seed data.');
//     } catch (error) {
//         res.status(500).send('Error initializing database: ' + error.message);
//     }
// });















// mongoose.connect('mongodb+srv://Mitesh:5d81UE2osFaiNzJg@cluster0.rjlqyvs.mongodb.net/MernTest?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => app.listen(5000, () => console.log('Server started on port 5000')))
//     .catch(error => console.log(error));


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionRoutes = require('./routes/transactions');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', transactionRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
