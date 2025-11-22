const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all hotels or filtered hotels
router.get("/", (req, res) => {
  const { minPrice, maxPrice, rating, amenities, location, sortBy } = req.query;

  let query = "SELECT * FROM hotels WHERE 1=1";
  const params = [];

  // Price filter
  if (minPrice !== undefined && maxPrice !== undefined) {
    query += " AND price BETWEEN ? AND ?";
    params.push(parseFloat(minPrice), parseFloat(maxPrice));
  }

  // Rating filter
  // Rating filter: match hotels with rating >= selected rating
  if (rating) {
    const r = parseFloat(rating);
    if (!isNaN(r)) {
      query += " AND rating >= ?";
      params.push(r);
    }
  }

  // Amenities filter
  if (amenities) {
    const amenitiesArray = amenities.split(",");
    amenitiesArray.forEach((amenity) => {
      query += " AND JSON_CONTAINS(amenities, ?)";
      params.push(JSON.stringify(amenity));
    });
  }

  // Location filter
  if (location) {
    query += " AND location LIKE ?";
    params.push(`%${location}%`);
  }

  // Sorting
  if (sortBy) {
    switch (sortBy) {
      case "price-low":
        query += " ORDER BY price ASC";
        break;
      case "price-high":
        query += " ORDER BY price DESC";
        break;
      case "rating":
        query += " ORDER BY rating DESC";
        break;
      default:
        query += " ORDER BY id";
    }
  }

  // Debug logging to help diagnose filter issues
  console.log("Received /api/hotels request with query:", req.query);
  console.log("Final SQL:", query);
  console.log("SQL params:", params);

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching hotels:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    console.log(`Returning ${results.length} hotels`);
    res.json(results);
  });
});

// Get hotel by ID
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM hotels WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        console.error("Error fetching hotel:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Hotel not found" });
      }
      res.json(results[0]);
    }
  );
});

module.exports = router;
