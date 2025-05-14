document.addEventListener('DOMContentLoaded', function() {
    // Get booking data from sessionStorage
    const bookingData = JSON.parse(sessionStorage.getItem('bookingData'));
    
    if (!bookingData) {
        // Redirect back if no booking data
        window.location.href = '/hotel';
        return;
    }
    
    // DOM Elements
    const hotelImage = document.getElementById('payment-hotel-image');
    const hotelName = document.getElementById('payment-hotel-name');
    const hotelLocation = document.getElementById('payment-hotel-location');
    const checkinDate = document.getElementById('payment-checkin');
    const checkoutDate = document.getElementById('payment-checkout');
    const guests = document.getElementById('payment-guests');
    const totalAmount = document.getElementById('payment-total');
    const paymentMethods = document.querySelectorAll('.method');
    const paymentForm = document.getElementById('credit-card-form');
    
    // Populate booking details
    function populateBookingDetails() {
        const { hotel, checkin, checkout, guests: guestCount, total } = bookingData;
        
        hotelImage.style.backgroundImage = `url('${hotel.image}')`;
        hotelName.textContent = hotel.name;
        hotelLocation.textContent = hotel.location;
        checkinDate.textContent = formatDate(checkin);
        checkoutDate.textContent = formatDate(checkout);
        guests.textContent = `${guestCount} ${guestCount === '1' ? 'Guest' : 'Guests'}`;
        totalAmount.textContent = `$${total}`;
    }
    
    // Format date as MM/DD/YYYY
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
    
    // Set up payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide payment forms based on selection
            // In a complete implementation, you would show different forms for different methods
        });
    });
    
    // Handle form submission
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;
        const cardName = document.getElementById('card-name').value;
        
        // Simple validation
        if (!cardNumber || !expiryDate || !cvv || !cardName) {
            alert('Please fill in all payment details');
            return;
        }
        
        // In a real app, you would send this to your server for processing
        console.log('Processing payment with:', {
            cardNumber,
            expiryDate,
            cvv,
            cardName,
            bookingData
        });
        
        // Simulate payment processing
        simulatePaymentProcessing();
    });
    
    // Simulate payment processing (in real app would use actual payment API)
    function simulatePaymentProcessing() {
        // Show loading state
        const payButton = document.querySelector('.pay-now');
        const originalText = payButton.textContent;
        payButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        payButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // For demo purposes, we'll assume payment was successful
            // In a real app, you would handle success/failure responses
            
            // Store booking confirmation
            const confirmationNumber = 'BK-' + Math.random().toString(36).substr(2, 8).toUpperCase();
            sessionStorage.setItem('confirmation', JSON.stringify({
                ...bookingData,
                confirmationNumber,
                paymentDate: new Date().toISOString()
            }));
            
            // Redirect to confirmation page
            window.location.href = '/confirmation';
        }, 2000);
    }
    
    // Initialize the page
    populateBookingDetails();
});