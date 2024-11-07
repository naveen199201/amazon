const express = require('express');
// const { PaymentHistory } = require('../models');
const router = express.Router();

router.post('/:userId', async (req, res) => {
  try {
    const payment = await PaymentHistory.create({ ...req.body, userId: req.params.userId });
    res.json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:userId', async (req, res) => {
  const payments = await PaymentHistory.findAll({ where: { userId: req.params.userId } });
  res.json(payments);
});

module.exports = router;
