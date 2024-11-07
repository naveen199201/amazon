const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const addressRoutes = require('./routes/address');
const paymentRoutes = require('./routes/payments');
const { initializeTables } = require('./db');

dotenv.config();
const app = express();
initializeTables();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/address', addressRoutes);
app.use('/payments', paymentRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
