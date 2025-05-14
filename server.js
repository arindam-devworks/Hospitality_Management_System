const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for local development
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Routes for HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

app.get('/hotel', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'hotel.html'));
});

app.get('/securepayment', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'securepayment.html')); 
});

app.get('/food&beverage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'food&beverage.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/checkin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'checkin.html'));
});

// API Endpoints
app.post('/api/hotels', (req, res) => {
    const hotels = [
        {
            id: 1,
            name: "The Oberoi Grand, Kolkata",
            location: "Kolkata, West Bengal",
            price: 110,
            rating: 4.6,
            image: "./Image/The Oberoi Grand, Kolkata.jpg",
            badge: "Popular",
            amenities: ["wifi", "pool", "gym", "spa"]
        },
        {
            id: 2,
            name: "ITC Royal Bengal",
            location: "Kolkata, West Bengal",
            price: 250,
            rating: 4.8,
            image: "./Image/ITC Royal Bengal.jpg",
            badge: "Luxury",
            amenities: ["wifi", "pool", "gym", "spa", "restaurant"]
        },
        {
            id: 3,
            name: "Hyatt Regency Kolkata",
            location: "Kolkata, West Bengal",
            price: 110,
            rating: 4.5,
            image: "./Image/Hyatt Regency Kolkata.jpg",
            badge: "Nature",
            amenities: ["wifi", "pool", "garden"]
        },
        {
            id: 4,
            name: "The Park Hotel",
            location: "Kolkata, West Bengal",
            price: 50,
            rating: 4.4,
            image: "./Image/The Park Hotel.jpg",
            badge: "Business",
            amenities: ["wifi", "conference", "restaurant"]
        },
        {
            id: 5,
            name: "Taj Bengal Kolkata",
            location: "Kolkata, West Bengal",
            price: 120,
            rating: 4.7,
            image: "./Image/Taj Bengal Kolkata.jpg",
            badge: "Premium",
            amenities: ["wifi", "pool", "gym", "spa", "restaurant"]
        },
        {
            id: 6,
            name: "The Imperial, New Delhi",
            location: "New Delhi, Delhi",
            price: 24,
            rating: 4.7,
            image: "./Image/The Imperial, New Delhi.jpg",
            badge: "Charming",
            amenities: ["wifi", "pool", "spa", "historic"]
        },
        {
            id: 7,
            name: "Taj Palace, New Delhi",
            location: "New Delhi, Delhi",
            price: 14,
            rating: 4.7,
            image: "./Image/Taj Palace, New Delhi.jpg",
            badge: "Premium",
            amenities: ["wifi", "pool", "gym", "spa"]
        },
        {
            id: 8,
            name: "The Leela Palace, New Delhi",
            location: "New Delhi, Delhi",
            price: 28,
            rating: 4.6,
            image: "./Image/The Leela Palace, New Delhi.jpg",
            badge: "Business",
            amenities: ["wifi", "pool", "conference", "spa"]
        },
        {
            id: 9,
            name: "Hotel Ajanta",
            location: "New Delhi, Delhi",
            price: 30,
            rating: 4.4,
            image: "./Image/Hotel Ajanta.jpg",
            badge: "Business",
            amenities: ["wifi", "restaurant"]
        },
        {
            id: 10,
            name: "The Suryaa, New Delhi",
            location: "New Delhi, Delhi",
            price: 60,
            rating: 4.5,
            image: "./Image/The Suryaa, New Delhi.jpg",
            badge: "Charming",
            amenities: ["wifi", "pool", "restaurant"]
        },
        {
            id: 11,
            name: "The Taj Mahal Tower, Mumbai",
            location: "Colaba, Mumbai",
            price: 160,
            rating: 4.8,
            image: "./Image/The Taj Mahal Tower, Mumbai.jpg",
            badge: "Business",
            amenities: ["wifi", "pool", "gym", "spa"]
        },
        {
            id: 12,
            name: "Trident Bandra Kurla",
            location: "Bandra, Mumbai",
            price: 120,
            rating: 4.6,
            image: "./Image/Trident Bandra Kurla.jpg",
            badge: "Charming",
            amenities: ["wifi", "pool", "beach"]
        },
        {
            id: 13,
            name: "Taj Santacruz",
            location: "Santacruz(East), Mumbai",
            price: 170,
            rating: 4.7,
            image: "./Image/Taj Santacruz.jpg",
            badge: "Premium",
            amenities: ["wifi", "pool", "gym", "spa"]
        },
        {
            id: 14,
            name: "Moxy Mumbai Andheri West",
            location: "Western Suburbs, Mumbai",
            price: 190,
            rating: 4.5,
            image: "./Image/Moxy Mumbai Andheri West.jpg",
            badge: "Nature",
            amenities: ["wifi", "garden"]
        },
        {
            id: 15,
            name: "Fairmont Mumbai",
            location: "Western Suburbs, Mumbai",
            price: 120,
            rating: 4.9,
            image: "./Image/Fairmont Mumbai.jpg",
            badge: "Premium",
            amenities: ["wifi", "pool", "gym", "spa", "restaurant"]
        },
        {
            id: 16,
            name: "Taj Cidade de Goa Horizon, Goa",
            location: "Panaji, Goa",
            price: 110,
            rating: 4.8,
            image: "./Image/Taj Cidade de Goa Horizon, Goa.jpg",
            badge: "Premium",
            amenities: ["wifi", "pool", "beach", "spa"]
        },
        {
            id: 17,
            name: "Palma Beach Resort",
            location: "Mandrem, Goa",
            price: 120,
            rating: 4.8,
            image: "./Image/Palma Beach Resort.jpg",
            badge: "Nature",
            amenities: ["wifi", "pool", "beach"]
        },
        {
            id: 18,
            name: "JW Marriott, Goa",
            location: "Vagator, Goa",
            price: 100,
            rating: 4.9,
            image: "./Image/JW Marriott, Goa.jpg",
            badge: "Charming",
            amenities: ["wifi", "pool", "beach", "spa"]
        },
        {
            id: 19,
            name: "Hyatt Centric Candolim, Goa",
            location: "Calangute, Goa",
            price: 10,
            rating: 4.8,
            image: "./Image/Hyatt Centric Candolim, Goa.jpg",
            badge: "Popular",
            amenities: ["wifi", "pool", "beach"]
        },
        {
            id: 20,
            name: "Neelams The Grand Hotel",
            location: "Calangute, Goa",
            price: 40,
            rating: 4.9,
            image: "./Image/Neelams The Grand Hotel.jpg",
            badge: "Luxury",
            amenities: ["wifi", "pool", "beach", "spa", "restaurant"]
        },
        {
            id: 21,
            name: "ITC Gardenia",
            location: "Karnataka, Bangalore",
            price: 110,
            rating: 4.8,
            image: "./Image/ITC Gardenia.jpg",
            badge: "Premium",
            amenities: ["wifi", "pool", "gym", "spa"]
        },
        {
            id: 22,
            name: "Conrad, Bengaluru",
            location: "Ulsoor, Bangalore",
            price: 140,
            rating: 4.9,
            image: "./Image/Conrad, Bengaluru.jpg",
            badge: "Nature",
            amenities: ["wifi", "pool", "garden"]
        },
        {
            id: 23,
            name: "Hyatt Centric Hebbal, Bengaluru",
            location: "Bangalore",
            price: 90,
            rating: 4.7,
            image: "./Image/Hyatt Centric Hebbal, Bengaluru.jpg",
            badge: "Charming",
            amenities: ["wifi", "pool", "restaurant"]
        },
        {
            id: 24,
            name: "Shangri-La, Bengaluru",
            location: "Bangalore",
            price: 130,
            rating: 4.6,
            image: "./Image/Shangri-La, Bengaluru.jpg",
            badge: "Popular",
            amenities: ["wifi", "pool", "gym", "spa"]
        },
        {
            id: 25,
            name: "Taj West End",
            location: "Bangalore",
            price: 150,
            rating: 4.9,
            image: "./Image/Taj West End.jpg",
            badge: "Luxury",
            amenities: ["wifi", "pool", "gym", "spa", "garden"]
        },
        {
            id: 26,
            name: "The Leela, Hyderabad",
            location: "Telangana, Hyderabad",
            price: 100,
            rating: 4.8,
            image: "./Image/The Leela, Hyderabad.jpg",
            badge: "Premium",
            amenities: ["wifi", "pool", "gym", "spa"]
        },
        {
            id: 27,
            name: "ITC Kohenur",
            location: "Telangana, Hyderabad",
            price: 200,
            rating: 4.9,
            image: "./Image/ITC Kohenur.jpg",
            badge: "Nature",
            amenities: ["wifi", "pool", "garden"]
        },
        {
            id: 28,
            name: "Le Meridien, Hyderabad",
            location: "Telangana, Hyderabad",
            price: 180,
            rating: 4.7,
            image: "./Image/Le Meridien, Hyderabad.jpg",
            badge: "Charming",
            amenities: ["wifi", "pool", "restaurant"]
        },
        {
            id: 29,
            name: "Amrutha castle",
            location: "Telangana, Hyderabad",
            price: 170,
            rating: 4.6,
            image: "./Image/Amrutha castle.jpg",
            badge: "Popular",
            amenities: ["wifi", "restaurant"]
        },
        {
            id: 30,
            name: "Sheraton Hyderabad Hotel",
            location: "Gachibowli, Hyderabad",
            price: 200,
            rating: 4.8,
            image: "./Image/Sheraton Hyderabad Hotel.jpg",
            badge: "Luxury",
            amenities: ["wifi", "pool", "gym", "spa"]
        },
        {
            id: 31,
            name: "Taj Skyline, Ahmedabad",
            location: "Shilaj, Gujarat",
            price: 70,
            rating: 4.6,
            image: "./Image/Taj Skyline, Ahmedabad.jpg",
            badge: "Luxury",
            amenities: ["wifi", "pool", "gym"]
        },
        {
            id: 32,
            name: "ITC Narmada",
            location: "Ahmedabad, Gujarat",
            price: 70,
            rating: 4.8,
            image: "./Image/ITC Narmada.jpg",
            badge: "Premium",
            amenities: ["wifi", "pool", "gym", "spa"]
        },
        {
            id: 33,
            name: "Grand Mercure, Ahmedabad",
            location: "Techcity, Gujarat",
            price: 80,
            rating: 4.5,
            image: "./Image/Grand Mercure, Ahmedabad.jpg",
            badge: "Nature",
            amenities: ["wifi", "garden"]
        },
        {
            id: 34,
            name: "The Leela Gandhinagar",
            location: "Gandhinagar, Gujarat",
            price: 100,
            rating: 4.7,
            image: "./Image/The Leela Gandhinagar.jpg",
            badge: "Charming",
            amenities: ["wifi", "pool", "restaurant"]
        },
        {
            id: 35,
            name: "Hyatt Regency, Ahmedabad",
            location: "Ahmedabad, Gujarat",
            price: 150,
            rating: 4.6,
            image: "./Image/Hyatt Regency, Ahmedabad.jpg",
            badge: "Popular",
            amenities: ["wifi", "pool", "restaurant"]
        }
    ];
    
    // Apply filters from request body
    const { maxPrice, minRating, amenities } = req.body;
    let filteredHotels = [...hotels];
    
    if (maxPrice) {
        filteredHotels = filteredHotels.filter(hotel => hotel.price <= maxPrice);
    }
    
    if (minRating) {
        filteredHotels = filteredHotels.filter(hotel => hotel.rating >= minRating);
    }
    
    if (amenities && amenities.length > 0) {
        filteredHotels = filteredHotels.filter(hotel => 
            amenities.every(amenity => hotel.amenities.includes(amenity)));
    }
    
    res.json(filteredHotels);
});

app.post('/api/process-payment', (req, res) => {
    const { paymentData, bookingData } = req.body;
    
    setTimeout(() => {
        const confirmationNumber = 'BK-' + Math.random().toString(36).substr(2, 8).toUpperCase();
        
        res.json({
            success: true,
            confirmationNumber,
            bookingData
        });
    }, 1500);
});

// Signup API - Consider adding password hashing
app.post('/signup', (req, res) => {
    const { fullname, email, password } = req.body;
    console.log("Signup request received:", { fullname, email });

    if (!fullname || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = 'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)';
    db.query(query, [fullname, email, password], (err, result) => {
        if (err) {
            console.error('DB Error:', err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'Email already exists' });
            }
            return res.status(500).json({ message: 'Signup failed', error: err.message });
        }
        console.log('Signup successful:', result);
        res.status(200).json({ message: 'Signup successful' });
    });
});

// Login API - Consider adding password verification
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt for:", email);

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Login error:', err);
            return res.status(500).json({ message: 'Login failed', error: err.message });
        }

        if (results.length > 0) {
            console.log('Login successful for:', email);
            const user = { ...results[0] };
            delete user.password;
            res.status(200).json({ message: 'Login successful', user });
        } else {
            console.log('Invalid login attempt for:', email);
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});