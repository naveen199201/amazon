const express = require('express');
const router = express.Router();
const { pool }= require('../db');
const jwt = require('jsonwebtoken');

router.post('/add', async (req, res) => {
  const { user_id, product_id, product_name, quantity, price } = req.body;

  try {
    // SQL query to insert a new item into the cart or update if already exists
    const query = `
      INSERT INTO cart_items (user_id, product_id, product_name, quantity, price)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (user_id, product_id) 
      DO UPDATE SET 
        quantity = cart_items.quantity + EXCLUDED.quantity; -- Increment by provided quantity
    `;

    // Execute the query with user-provided values
    await pool.query(query, [user_id, product_id, product_name, quantity, price]);

    res.json({ message: 'Item added to cart or quantity updated successfully.' });
  } catch (error) {
    // Handle any errors
    console.error('Error adding item to cart:', error);
    res.status(400).json({ error: error.message });
  }
});


  router.get('/cartitems', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id  = decoded.id;
  
    try {
      const query = `
        SELECT * FROM cart_items
        WHERE user_id = $1;
      `;
      const result = await pool.query(query, [user_id]);
      res.json(result.rows);
    } catch (error) {
      // Handle errors by logging and sending an error response
      console.error('Error fetching cart items:', error);
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;
