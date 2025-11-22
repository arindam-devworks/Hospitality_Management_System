const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Arindam2002",
  database: process.env.DB_NAME || "hospitality_system",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");

  // Create the users table
  const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            fullname VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

  db.query(createUsersTable, (err) => {
    if (err) {
      console.error("Error creating users table:", err);
      return;
    }
    console.log("Users table check completed");
  });

  // Create the hotels table
  const createHotelsTable = `
        CREATE TABLE IF NOT EXISTS hotels (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            rating DECIMAL(3, 1) NOT NULL,
            image VARCHAR(255) NOT NULL,
            badge VARCHAR(50),
            amenities JSON
        )`;

  db.query(createHotelsTable, (err) => {
    if (err) {
      console.error("Error creating hotels table:", err);
      return;
    }
    console.log("Hotels table check completed");
    db.query("DESCRIBE hotels", (err, results) => {
      if (err) {
        console.error("Error describing hotels table:", err);
        return;
      }
      console.log("Hotels table schema:", results);
    });
  });

  // Create the bookings table
  const createBookingsTable = `
        CREATE TABLE IF NOT EXISTS bookings (
            id BIGINT PRIMARY KEY,
            hotel_id INT NOT NULL,
            checkin DATE NOT NULL,
            checkout DATE NOT NULL,
            guests INT NOT NULL,
            total DECIMAL(10, 2) NOT NULL,
            status ENUM('confirmed', 'cancelled') DEFAULT 'confirmed',
            payment_method ENUM('card', 'cash') NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (hotel_id) REFERENCES hotels(id)
        )`;

  db.query(createBookingsTable, (err) => {
    if (err) {
      console.error("Error creating bookings table:", err);
      return;
    }
    console.log("Bookings table check completed");
    db.query("DESCRIBE bookings", (err, results) => {
      if (err) {
        console.error("Error describing bookings table:", err);
        return;
      }
      console.log("Bookings table schema:", results);
    });
  });

  // Create the menu_items table
  const createMenuItemsTable = `
        CREATE TABLE IF NOT EXISTS menu_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            price DECIMAL(10, 2) NOT NULL,
            image VARCHAR(255),
            category VARCHAR(50),
            veg BOOLEAN
        )`;

  db.query(createMenuItemsTable, (err) => {
    if (err) {
      console.error("Error creating menu_items table:", err);
      return;
    }
    console.log("Menu_items table check completed");
  });

  // Create the orders table
  const createOrdersTable = `
        CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            total DECIMAL(10, 2) NOT NULL,
            payment_method VARCHAR(50) NOT NULL,
            status VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

  db.query(createOrdersTable, (err) => {
    if (err) {
      console.error("Error creating orders table:", err);
      return;
    }
    console.log("Orders table check completed");
  });

  // Create the order_items table
  const createOrderItemsTable = `
        CREATE TABLE IF NOT EXISTS order_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            order_id INT,
            menu_item_id INT,
            quantity INT,
            subtotal DECIMAL(10, 2),
            FOREIGN KEY (order_id) REFERENCES orders(id),
            FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
        )`;

  db.query(createOrderItemsTable, (err) => {
    if (err) {
      console.error("Error creating order_items table:", err);
      return;
    }
    console.log("Order_items table check completed");
  });

  // Create the room_service_requests table
  const createRoomServiceRequestsTable = `
        CREATE TABLE IF NOT EXISTS room_service_requests (
            id INT AUTO_INCREMENT PRIMARY KEY,
            room_number VARCHAR(50) NOT NULL,
            guest_name VARCHAR(255) NOT NULL,
            service_type VARCHAR(50) NOT NULL,
            special_requests TEXT,
            status VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

  db.query(createRoomServiceRequestsTable, (err) => {
    if (err) {
      console.error("Error creating room_service_requests table:", err);
      return;
    }
    console.log("Room_service_requests table check completed");
  });

  // Create the reservations table
  const createReservationsTable = `
        CREATE TABLE IF NOT EXISTS reservations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            party_size INT NOT NULL,
            contact VARCHAR(50) NOT NULL,
            special_requests TEXT,
            status VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

  db.query(createReservationsTable, (err) => {
    if (err) {
      console.error("Error creating reservations table:", err);
      return;
    }
    console.log("Reservations table check completed");
  });
});

module.exports = db;
