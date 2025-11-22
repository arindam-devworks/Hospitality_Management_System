const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all bookings
router.get("/", (req, res) => {
  db.query(
    `
        SELECT b.*, h.name AS hotel_name, h.location AS hotel_location
        FROM bookings b
        JOIN hotels h ON b.hotel_id = h.id
    `,
    (err, results) => {
      if (err) {
        console.error("Error fetching bookings:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(results);
    }
  );
});

// Create a new booking
router.post("/", (req, res) => {
  const { hotel_id, checkin, checkout, guests, total, payment_method } =
    req.body;

  // Validate input
  if (
    !hotel_id ||
    !checkin ||
    !checkout ||
    !guests ||
    !total ||
    !payment_method
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const id = Date.now(); // Simple ID generation; consider UUID in production
  const query = `
        INSERT INTO bookings (id, hotel_id, checkin, checkout, guests, total, payment_method)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  db.query(
    query,
    [id, hotel_id, checkin, checkout, guests, total, payment_method],
    (err, result) => {
      if (err) {
        console.error("Error creating booking:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(201).json({ message: "Booking confirmed", bookingId: id });
    }
  );
});

// Cancel a booking
router.delete("/:id", (req, res) => {
  db.query(
    "UPDATE bookings SET status = ? WHERE id = ?",
    ["cancelled", req.params.id],
    (err, result) => {
      if (err) {
        console.error("Error cancelling booking:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json({ message: "Booking cancelled" });
    }
  );
});

// Permanently remove a booking
router.delete("/:id/remove", (req, res) => {
  const bookingId = req.params.id;
  console.log(`DELETE /api/bookings/${bookingId}/remove called`);

  db.query("DELETE FROM bookings WHERE id = ?", [bookingId], (err, result) => {
    if (err) {
      console.error("Error deleting booking:", err);
      return res
        .status(500)
        .json({ error: "Internal server error", details: err.message });
    }
    console.log("Delete result:", result);
    if (result.affectedRows === 0) {
      console.log("Booking not found for id:", bookingId);
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json({ message: "Booking removed", bookingId });
  });
});

module.exports = router;
