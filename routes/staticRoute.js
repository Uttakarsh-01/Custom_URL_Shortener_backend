// const express = require('express');
// const router = express.Router();

// router.get('/',(req,res)=>{
//     return res.render("home");
// })

// module.exports = router;

const express = require('express');
const router = express.Router();
const URL = require('../models/url'); // To interact with the database

// The route for rendering the home page
router.get('/', (req, res) => {
    res.render("home", { error: null, shortId: null }); // No error by default
});

// The route to handle the POST request from the form
router.post('/', async (req, res) => {
    const { url } = req.body; // Get the URL from the form

    if (!url) {
        return res.render("home", { error: "URL is required", shortId: null });
    }

    try {
        const shortId = await handleGenerateNewShortUrl(url);
        res.render("home", { error: null, shortId });
    } catch (error) {
        res.render("home", { error: "Internal server error", shortId: null });
    }
});

async function handleGenerateNewShortUrl(url) {
    const shortid = require("shortid");
    const newShortId = shortid.generate(); // Generate a new short ID

    // Save the URL with the generated short ID
    await URL.create({
        shortId: newShortId,
        redirectURL: url,
        visitHistory: [],
    });

    return newShortId; // Return the generated short ID
}

module.exports = router;
