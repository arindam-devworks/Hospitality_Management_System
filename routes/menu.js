const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM menu_items', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    // Convert price to number
    const formattedResults = results.map(item => ({
      ...item,
      price: parseFloat(item.price)
    }));
    res.json(formattedResults);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM menu_items WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    // Convert price to number
    const formattedItem = {
      ...results[0],
      price: parseFloat(results[0].price)
    };
    res.json(formattedItem);
  });
});

module.exports = router;