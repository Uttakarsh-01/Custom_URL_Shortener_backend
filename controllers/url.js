// // const shortid = require("shortid");
// // const URL = require('../models/url');

// // // Function to generate a new short URL
// // async function handleGenerateNewShortUrl(req, res) {
// //     const body = req.body; // Fixing this line to access req.body
// //     if (!body.url) {
// //         return res.status(400).json({ error: "url is required" }); // Checking if the URL is provided
// //     }

// //     const shortId = shortid.generate(); // Use shortid.generate() to create a unique ID

// //     await URL.create({
// //         shortId: shortId,
// //         redirectURL: body.url,
// //         visitHistory: [],
// //     });

// //     return res.json({ id: shortId }); // Return the new short ID
// // }

// // // Export the function correctly
// // module.exports = {
// //     handleGenerateNewShortUrl,
// // };

// const shortid = require("shortid");
// const URL = require('../models/url');

// // Function to generate a new short URL
// async function handleGenerateNewShortUrl(req, res) {
//     const body = req.body;
//     if (!body.url) {
//         return res.status(400).json({ error: "URL is required" });
//     }

//     const shortId = shortid.generate(); // Generates a unique short ID

//     await URL.create({
//         shortId: shortId,
//         redirectURL: body.url,
//         visitHistory: [],
//     });

//     return res.json({ id: shortId });
// }

// async function  handleGetAnalytics(req,res) {
//     const shortId = req.params.shortId;
//     await URL.findOne({shortId});
//     return res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory});
// }

// module.exports = {
//     handleGenerateNewShortUrl,
//     handleGetAnalytics,
// };

//corrected code
const shortid = require("shortid");
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    const { url } = req.body; // Use destructuring to access the url property

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortId = shortid.generate();

    try {
        await URL.create({
            shortId,
            redirectURL: url,
            visitHistory: [],
        });

        return res.json({ id: shortId });
    } catch (error) {
        console.error("Error creating short URL:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;

    try {
        const result = await URL.findOne({ shortId });
        if (!result) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
    } catch (error) {
        console.error("Error fetching analytics:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
};
