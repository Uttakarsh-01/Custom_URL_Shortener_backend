// // const express = require('express');
// // const {handleGenerateNewShortUrl} = require("../controllers/url");
// // const router = express.Router();

// // router.post('/')

// // module.export = router;


// const express = require('express');
// const { handleGenerateNewShortUrl,handleGetAnalytics } = require("../controllers/url");
// const router = express.Router();

// router.post('/', handleGenerateNewShortUrl,handleGetAnalytics); // Added path and handler

// router.get('/analytics/:shortId',)

// module.exports = router; // Corrected export syntax

// const express = require('express');
// const { handleGenerateNewShortUrl, handleGetAnalytics } = require("../controllers/url");
// const router = express.Router();

// // POST route to generate a new short URL
// router.post('/', handleGenerateNewShortUrl);

// // GET route for analytics
// router.get('/analytics/:shortId', handleGetAnalytics);

// module.exports = router;


const express = require('express');
const URL = require("../models/url");
const router = express.Router();

// GET route to redirect based on shortId
router.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } }
        );

        if (!entry) {
            return res.status(404).send("Short URL not found");
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error fetching URL:", error);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
