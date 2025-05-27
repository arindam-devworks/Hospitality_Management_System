const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', (req, res) => {
  const { items, total, payment_method, status } = req.body;
  
  db.query(
    'INSERT INTO orders (total, payment_method, status) VALUES (?, ?, ?)',
    [total, payment_method, status],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      const orderId = result.insertId;
      const orderItems = items.map(item => [
        orderId,
        item.id,
        item.quantity,
        item.price * item.quantity
      ]);
      
      db.query(
        'INSERT INTO order_items (order_id, menu_item_id, quantity, subtotal) VALUES ?',
        [orderItems],
        (err) => {
          if (err) {
            return res.status(500).json({ error: 'Database error' });
          }
          res.status(201).json({ message: 'Order created successfully', orderId });
        }
      );
    }
  );
});

module.exports = router;