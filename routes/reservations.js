const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', (req, res) => {
  const { name, date, time, party_size, contact, special_requests, status } = req.body;
  
  db.query(
    'INSERT INTO reservations (name, date, time, party_size, contact, special_requests, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, date, time, party_size, contact, special_requests, status],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({
        id: result.insertId,
        name,
        date,
        time,
        party_size,
        contact,
        special_requests,
        status,
        created_at: new Date()
      });
    }
  );
});

module.exports = router;