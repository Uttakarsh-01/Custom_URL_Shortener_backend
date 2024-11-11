// //user related kam hoga jaise lgoin logout auth
// const express = require('express')
// const router = express.Router();
// const {handleUserSignup,handleUserLogin} = require("../controllers/user");
// //signup route
// router.post('/',handleUserSignup);
// router.post("/login",handleUserSignup);
// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { handleUserSignup, handleUserLogin } = require('../controllers/user');

// router.post('/user', handleUserSignup); // Signup form submission
// router.get('/signup', (req, res) => res.render('signup')); // Render signup page
// router.get('/login', (req, res) => res.render('login')); // Render login page

// module.exports = router;

//modified
// const express = require('express');
// const router = express.Router();
// const { handleUserSignup, handleUserLogin } = require('../controllers/user');

// // Render the signup and login pages
// router.get('/signup', (req, res) => res.render('signup', { error: null })); // Render signup page with default error
// router.get('/login', (req, res) => res.render('login', { error: null }));   // Render login page with default error

// // Handle form submissions for signup and login
// router.post('/signup', handleUserSignup); // Signup form submission
// router.post('/login', handleUserLogin);   // Login form submission

// module.exports = router;

//modified2
const express = require('express');
const router = express.Router();
const { handleUserSignup, handleUserLogin } = require('../controllers/user');

// Signup POST route
router.post('/', handleUserSignup);

// Login POST route
router.post('/login', handleUserLogin);

// Optional: GET routes to render signup and login pages
router.get('/signup', (req, res) => res.render('signup', { error: null }));
router.get('/login', (req, res) => res.render('login', { error: null }));

module.exports = router;
