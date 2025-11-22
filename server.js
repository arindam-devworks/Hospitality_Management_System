const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db"); // Your db module
const hotelRoutes = require("./routes/hotels");
const bookingRoutes = require("./routes/bookings");
const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/orders");
const roomServiceRoutes = require("./routes/roomService");
const reservationRoutes = require("./routes/reservations");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const session = require("express-session");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*", // Allow all origins, adjust for production
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  })
);

// Session middleware (required for passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET",
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Upsert user in DB
      const email = profile.emails[0].value;
      const fullname = profile.displayName;
      const googleId = profile.id;
      const query =
        "INSERT INTO users (fullname, email, googleId) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE fullname=VALUES(fullname), googleId=VALUES(googleId)";
      db.query(query, [fullname, email, googleId], (err) => {
        if (err) return done(err);
        done(null, { fullname, email, googleId });
      });
    }
  )
);

// Facebook OAuth Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID || "FACEBOOK_CLIENT_ID",
      clientSecret:
        process.env.FACEBOOK_CLIENT_SECRET || "FACEBOOK_CLIENT_SECRET",
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails"],
    },
    (accessToken, refreshToken, profile, done) => {
      const email =
        profile.emails && profile.emails[0]
          ? profile.emails[0].value
          : `${profile.id}@facebook.com`;
      const fullname = profile.displayName;
      const facebookId = profile.id;
      const query =
        "INSERT INTO users (fullname, email, facebookId) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE fullname=VALUES(fullname), facebookId=VALUES(facebookId)";
      db.query(query, [fullname, email, facebookId], (err) => {
        if (err) return done(err);
        done(null, { fullname, email, facebookId });
      });
    }
  )
);

// Routes for HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "homepage.html"));
});

app.get("/hotels", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "hotels.html"));
});

app.get("/food&beverage", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "food&beverage.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

app.get("/checkin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "checkin.html"));
});

// API Routes
app.use("/api/hotels", hotelRoutes); // Dynamic hotel routes
app.use("/api/bookings", bookingRoutes); // Booking routes
app.use("/api/menu", menuRoutes); // Menu routes
app.use("/api/orders", orderRoutes); // Order routes
app.use("/api/room-service", roomServiceRoutes); // Room service routes
app.use("/api/reservations", reservationRoutes); // Reservation routes

// Existing payment endpoint (unchanged)
app.post("/api/process-payment", (req, res) => {
  const { paymentData, bookingData } = req.body;

  setTimeout(() => {
    const confirmationNumber =
      "BK-" + Math.random().toString(36).substr(2, 8).toUpperCase();

    res.json({
      success: true,
      confirmationNumber,
      bookingData,
    });
  }, 1500);
});

// Signup API (unchanged)
app.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
    db.query(query, [fullname, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Email already exists" });
        }
        return res
          .status(500)
          .json({ message: "Signup failed", error: err.message });
      }
      res.status(200).json({ message: "Signup successful" });
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// Login API (unchanged)
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Login failed", error: err.message });
    }
    if (results.length > 0) {
      const user = { ...results[0] };
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        delete user.password;
        return res.status(200).json({ message: "Login successful", user });
      }
    }
    res.status(401).json({ message: "Invalid email or password" });
  });
});

// Get bookings for a user
app.post("/api/user/bookings", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });
  const query = "SELECT * FROM bookings WHERE user_email = ?";
  db.query(query, [email], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching bookings", error: err.message });
    res.json(results);
  });
});

// Check-in for a booking
app.post("/api/user/checkin", (req, res) => {
  const { bookingId, email } = req.body;
  if (!bookingId || !email)
    return res.status(400).json({ message: "Booking ID and email required" });
  const query =
    "UPDATE bookings SET status = ? WHERE id = ? AND user_email = ?";
  db.query(query, ["Checked In", bookingId, email], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error during check-in", error: err.message });
    res.json({ success: true });
  });
});

// Check-out for a booking
app.post("/api/user/checkout", (req, res) => {
  const { bookingId, email } = req.body;
  if (!bookingId || !email)
    return res.status(400).json({ message: "Booking ID and email required" });
  const query =
    "UPDATE bookings SET status = ? WHERE id = ? AND user_email = ?";
  db.query(query, ["Checked Out", bookingId, email], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error during check-out", error: err.message });
    res.json({ success: true });
  });
});

// Forgot password endpoint (demo)
app.post("/api/forgot-password", (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.json({ success: false, message: "Email is required." });
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.json({ success: false, message: "Server error." });
    if (results.length === 0)
      return res.json({ success: false, message: "Email not found." });
    // In production, send email with reset link here
    return res.json({
      success: true,
      message: "Reset link sent to your email.",
    });
  });
});

// Google OAuth routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // In production, redirect to frontend with session/JWT
    res.redirect(
      `/auth-success?user=${encodeURIComponent(JSON.stringify(req.user))}`
    );
  }
);

// Facebook OAuth routes
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(
      `/auth-success?user=${encodeURIComponent(JSON.stringify(req.user))}`
    );
  }
);

// Auth success endpoint (for frontend to grab user info)
app.get("/auth-success", (req, res) => {
  if (req.user) {
    res.send(
      `<script>window.opener && window.opener.postMessage({ user: ${JSON.stringify(
        JSON.stringify(req.user)
      )} }, '*'); window.close();</script>`
    );
  } else {
    res.redirect("/login");
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
