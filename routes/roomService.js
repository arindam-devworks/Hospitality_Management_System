const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', (req, res) => {
  const { room_number, guest_name, service_type, special_requests, status } = req.body;
  
  db.query(
    'INSERT INTO room_service_requests (room_number, guest_name, service_type, special_requests, status) VALUES (?, ?, ?, ?, ?)',
    [room_number, guest_name, service_type, special_requests, status],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({
        id: result.insertId,
        room_number,
        guest_name,
        service_type,
        special_requests,
        status,
        created_at: new Date()
      });
    }
  );
});

module.exports = router;