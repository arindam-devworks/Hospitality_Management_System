const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all hotels or filtered hotels
router.get('/', (req, res) => {
    const {
        minPrice,
        maxPrice,
        rating,
        amenities,
        location,
        sortBy
    } = req.query;

    let query = 'SELECT * FROM hotels WHERE 1=1';
    const params = [];

    // Price filter
    if (minPrice && maxPrice) {
        query += ' AND price BETWEEN ? AND ?';
        params.push(parseFloat(minPrice), parseFloat(maxPrice));
    }

    // Rating filter
    if (rating) {
        query += ' AND FLOOR(rating) = ?';
        params.push(parseInt(rating));
    }

    // Amenities filter
    if (amenities) {
        const amenitiesArray = amenities.split(',');
        amenitiesArray.forEach(amenity => {
            query += ' AND JSON_CONTAINS(amenities, ?)';
            params.push(JSON.stringify(amenity));
        });
    }

    // Location filter
    if (location) {
        query += ' AND location LIKE ?';
        params.push(`%${location}%`);
    }

    // Sorting
    if (sortBy) {
        switch (sortBy) {
            case 'price-low':
                query += ' ORDER BY price ASC';
                break;
            case 'price-high':
                query += ' ORDER BY price DESC';
                break;
            case 'rating':
                query += ' ORDER BY rating DESC';
                break;
            default:
                query += ' ORDER BY id';
        }
    }

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Error fetching hotels:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});

// Get hotel by ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM hotels WHERE id = ?', [req.params.id], (err, results) => {
        if (err) {
            console.error('Error fetching hotel:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Hotel not found' });
        }
        res.json(results[0]);
    });
});

module.exports = router;