const express = require('express');
const validator = require('validator'); // For Input Sanitization & Validation
const bcrypt = require('bcrypt');        // For Password Hashing
const jwt = require('jsonwebtoken');      // For Token-based Authentication
const helmet = require('helmet');        // For Securing HTTP Headers
const winston = require('winston');       // Step 2: Advanced Logging (Week 3)

const app = express();

// --- STEP 2: CONFIGURE WINSTON LOGGER (WEEK 3) ---
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(), // Outputs logs to the terminal
    new winston.transports.File({ filename: 'security.log' }) // Saves logs to security.log
  ]
});

// Middleware
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());                         
app.use(helmet()); // Step 3: Secure HTTP Headers implemented

const SECRET_KEY = 'your-developershub-secret-key'; 

// Home Route
app.get('/', (req, res) => {
  res.send('<h1>Secure Lab</h1><a href="/search?q=test">Search</a> | <a href="/login">Login</a>');
});

// Step 1: Fixed Search Route (Fixed Reflected XSS)[cite: 1]
app.get('/search', (req, res) => {
  const query = req.query.q || '';
  // FIX: validator.escape() cleans the input to prevent XSS[cite: 1]
  const sanitizedQuery = validator.escape(query); 
  
  // Log the search activity (Week 3)[cite: 1]
  logger.info(`Search performed with query: ${sanitizedQuery}`);
  
  res.send(`<h1>Search Results</h1><p>You searched for: ${sanitizedQuery}</p>`);
});

// Login Page UI
app.get('/login', (req, res) => {
  res.send(`
    <h1>Login Page</h1>
    <form method="POST" action="/login">
      Email: <input name="email" type="text" placeholder="user@example.com"><br>
      Password: <input name="pass" type="password"><br>
      <button type="submit">Login</button>
    </form>
  `);
});

// Step 1 & 2: Fixed Login Handler (Input Validation, Hashing, & JWT)[cite: 1]
app.post('/login', async (req, res) => {
  const { email, pass } = req.body;

  // 1. Sanitize & Validate Email[cite: 1]
  if (!email || !validator.isEmail(email)) {
    // Log failed validation attempt (Week 3)[cite: 1]
    logger.warn(`Invalid email format attempt: ${email}`);
    return res.status(400).send('Invalid email format');
  }

  try {
    // 2. Password Hashing (Week 2 Measure)[cite: 1]
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(pass, saltRounds);

    // 3. Enhance Authentication with JWT (Week 2 Measure)[cite: 1]
    const token = jwt.sign({ userEmail: email }, SECRET_KEY, { expiresIn: '1h' });

    // Log successful login (Week 3)[cite: 1]
    logger.info(`Successful login for user: ${email}`);

    res.json({
      message: 'Login Securely Processed',
      hashedPasswordExample: hashedPassword, // Shown for demonstration
      token: token
    });
  } catch (err) {
    // Log server errors (Week 3)[cite: 1]
    logger.error(`Server error during login for ${email}: ${err.message}`);
    res.status(500).send('Server error during processing');
  }
});

// Start Server and Log Initialization (Week 3)[cite: 1]
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Secure lab running on http://localhost:${PORT}`);
  logger.info('Application started successfully');
});