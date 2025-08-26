# Smart Hospitality Management System (HMS)

A comprehensive Node.js/Express application for managing hotel operations including bookings, food & beverage services, room service, and user management.

## Features

- 🏨 **Hotel Management**: Browse and book hotels with detailed information
- 🍽️ **Food & Beverage**: Order food items with menu management
- 🛎️ **Room Service**: Request various room services
- 👥 **User Management**: User registration, login, and authentication
- 🔐 **OAuth Integration**: Google and Facebook login support
- 💳 **Payment Processing**: Integrated payment system for bookings
- 📱 **Responsive Design**: Modern UI for all devices

## Project Structure

```
SMART_HOSPITALITY_HUB/
├── config/
│   └── db.js              # Database configuration and setup
├── public/                 # Frontend static files
│   ├── *.html             # HTML pages
│   ├── *.css              # Stylesheets
│   ├── *.js               # Frontend JavaScript
│   ├── Image/             # Hotel images
│   └── FoodImage/         # Food item images
├── routes/                 # API route handlers
│   ├── hotels.js          # Hotel-related routes
│   ├── bookings.js        # Booking management
│   ├── menu.js            # Food menu routes
│   ├── orders.js          # Order processing
│   ├── roomService.js     # Room service routes
│   └── reservations.js    # Reservation management
├── server.js              # Main Express server
├── package.json           # Dependencies and scripts
└── .gitignore            # Git ignore rules
```

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd SMART_HOSPITALITY_HUB
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

1. **Start MySQL Server**
2. **Create Database**:
   ```sql
   CREATE DATABASE hospitality_system;
   ```
3. **Update Database Credentials** in `config/db.js` or use environment variables

### 4. Environment Configuration

1. **Copy the config file**:
   ```bash
   cp config.env .env
   ```
2. **Edit `.env` file** with your actual values:
   - Database credentials
   - OAuth app credentials (Google, Facebook)
   - Session secret
   - Other configuration values

### 5. Run the Application

#### Development Mode (with auto-reload):

```bash
npm run dev
```

#### Production Mode:

```bash
node server.js
```

The application will be available at: `http://localhost:3000`
