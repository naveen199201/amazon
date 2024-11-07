const express = require('express');
// const { Address } = require('../models');
const router = express.Router();

router.post('/:userId', async (req, res) => {
  try {
    const address = await Address.create({ ...req.body, userId: req.params.userId });
    res.json(address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:userId', async (req, res) => {
  const addresses = await Address.findAll({ where: { userId: req.params.userId } });
  res.json(addresses);
});

module.exports = router;
