// const express = require("express");
// const { ConnectToMongoDb} = require('./connect');  
// const urlRoute = require('./routes/url');
// const app = express();
// const PORT = 8001;

// ConnectToMongoDb('mongodb://localhost:27017/short-url')
// .then(()=>{
//     console.log("mongodb connected")
// })
// .catch(()=>{
//     console.log("not connected",error);
// });

// app.use("/url",urlRoute);

// app.listen(PORT,() => console.log(`server started at PORT : ${PORT}`))


const express = require("express");
const { ConnectToMongoDb } = require('./connect');  
const urlRoute = require('./routes/url');
const app = express();
const PORT = 8001;
const URL = require('./models/url');

ConnectToMongoDb('mongodb://localhost:27017/short-url')
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("Not connected", error);
    });

app.use(express.json()); // Parse JSON request bodies
app.use("/url", urlRoute);

// Corrected GET route
app.get('/:shortId', async (req, res) => {  // Use camelCase for route parameter
    const shortId = req.params.shortId; // Access shortId correctly here
    
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } }
        );

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error fetching URL:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
