document.addEventListener('DOMContentLoaded', function() {
    // Sample hotel data
    const hotels=[
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

    // DOM Elements
    const hotelsContainer = document.getElementById('hotels-container');
    const priceSlider = document.getElementById('price-slider');
    const priceValue = document.getElementById('price-value');
    const stars = document.querySelectorAll('.star');
    const wifiCheckbox = document.getElementById('wifi');
    const poolCheckbox = document.getElementById('pool');
    const gymCheckbox = document.getElementById('gym');
    const sortSelect = document.getElementById('sort-by');
    const searchBtn = document.getElementById('search-btn');
    const loadMoreBtn = document.getElementById('load-more');

    // Initial variables
    let displayedHotels = 4;
    let filteredHotels = [...hotels];
    let selectedRating = 0;

    // Initialize the page
    function init() {
        renderHotels(hotels.slice(0, displayedHotels));
        setupEventListeners();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Price range slider
        priceSlider.addEventListener('input', function() {
            priceValue.textContent = `$0 - $${this.value}`;
            filterHotels();
        });

        // Star rating
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                selectedRating = rating;
                
                // Update star display
                stars.forEach((s, index) => {
                    if (index < rating) {
                        s.innerHTML = '<i class="fas fa-star"></i>';
                    } else {
                        s.innerHTML = '<i class="far fa-star"></i>';
                    }
                });
                
                filterHotels();
            });
        });

        // Amenities checkboxes
        [wifiCheckbox, poolCheckbox, gymCheckbox].forEach(checkbox => {
            checkbox.addEventListener('change', filterHotels);
        });

        // Sort select
        sortSelect.addEventListener('change', filterHotels);

        // Search button
        searchBtn.addEventListener('click', function() {
            const location = document.getElementById('location').value.toLowerCase();
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            
            // In a real app, you would send this data to the server
            console.log('Searching for:', { location, checkin, checkout });
            
            filterHotels();
        });

        // Load more button
        loadMoreBtn.addEventListener('click', function() {
            displayedHotels += 4;
            renderHotels(filteredHotels.slice(0, displayedHotels));
            
            if (displayedHotels >= filteredHotels.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }

    // Filter hotels based on selected criteria
    function filterHotels() {
        const maxPrice = parseInt(priceSlider.value);
        const selectedAmenities = [];
        
        if (wifiCheckbox.checked) selectedAmenities.push('wifi');
        if (poolCheckbox.checked) selectedAmenities.push('pool');
        if (gymCheckbox.checked) selectedAmenities.push('gym');
        
        // Filter by price and rating
        filteredHotels = hotels.filter(hotel => {
            return hotel.price <= maxPrice && 
                   (selectedRating === 0 || Math.floor(hotel.rating) === selectedRating) &&
                   (selectedAmenities.length === 0 || 
                    selectedAmenities.every(amenity => hotel.amenities.includes(amenity)));
        });
        
        // Sort hotels
        const sortBy = sortSelect.value;
        switch(sortBy) {
            case 'price-low':
                filteredHotels.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredHotels.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filteredHotels.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Recommended (default sorting)
                break;
        }
        
        // Reset displayed hotels
        displayedHotels = 4;
        renderHotels(filteredHotels.slice(0, displayedHotels));
        
        // Show/hide load more button
        loadMoreBtn.style.display = filteredHotels.length > displayedHotels ? 'block' : 'none';
    }

    // Render hotels to the page
    function renderHotels(hotelsToRender) {
        if (hotelsToRender.length === 0) {
            hotelsContainer.innerHTML = '<p class="no-results">No hotels match your criteria. Please try different filters.</p>';
            loadMoreBtn.style.display = 'none';
            return;
        }
        
        hotelsContainer.innerHTML = hotelsToRender.map(hotel => `
            <div class="hotel-card" data-id="${hotel.id}">
                <div class="hotel-image" style="background-image: url('${hotel.image}')"></div>
                <div class="hotel-details">
                    <h3>${hotel.name}</h3>
                    <div class="hotel-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${hotel.location}</span>
                    </div>
                    <div class="hotel-rating">
                        <div class="stars">
                            ${renderStars(hotel.rating)}
                        </div>
                        <span class="reviews">(${hotel.reviews} reviews)</span>
                    </div>
                    <div class="hotel-price">
                        $${hotel.price} <span>per night</span>
                    </div>
                    <button class="book-btn">Book Now</button>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to book buttons
        document.querySelectorAll('.book-btn').forEach(button => {
            button.addEventListener('click', function() {
                const hotelCard = this.closest('.hotel-card');
                const hotelId = parseInt(hotelCard.getAttribute('data-id'));
                const hotel = hotels.find(h => h.id === hotelId);
                
                // Get booking details
                const checkin = document.getElementById('checkin').value || new Date().toISOString().split('T')[0];
                const checkout = document.getElementById('checkout').value || 
                    new Date(new Date().getTime() + 86400000).toISOString().split('T')[0];
                const guests = document.getElementById('guests').value || '2';
                
                // Calculate total price (simple calculation - in real app would use actual dates)
                const nights = 3; // Default 3 nights
                const total = hotel.price * nights;
                
                // Store booking data in sessionStorage to pass to payment page
                sessionStorage.setItem('bookingData', JSON.stringify({
                    hotel,
                    checkin,
                    checkout,
                    guests,
                    total
                }));
                
                // Redirect to payment page
                window.location.href = '/securepayment.html';
            });
        });
    }

    // Helper function to render star ratings
    function renderStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        return stars;
    }

    // Initialize the page
    init();
});