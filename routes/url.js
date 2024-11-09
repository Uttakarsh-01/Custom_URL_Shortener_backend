// const express = require('express');
// const {handleGenerateNewShortUrl} = require("../controllers/url");
// const router = express.Router();

// router.post('/')

// module.export = router;


const express = require('express');
const { handleGenerateNewShortUrl,handleGetAnalytics } = require("../controllers/url");
const router = express.Router();

router.post('/', handleGenerateNewShortUrl,handleGetAnalytics); // Added path and handler

router.get('/analytics/:shortId',)

module.exports = router; // Corrected export syntax
