// // const express = require("express");
// // const { ConnectToMongoDb} = require('./connect');  
// // const urlRoute = require('./routes/url');
// // const app = express();
// // const PORT = 8001;

// // ConnectToMongoDb('mongodb://localhost:27017/short-url')
// // .then(()=>{
// //     console.log("mongodb connected")
// // })
// // .catch(()=>{
// //     console.log("not connected",error);
// // });

// // app.use("/url",urlRoute);

// // app.listen(PORT,() => console.log(`server started at PORT : ${PORT}`))


// const express = require("express");
// const { ConnectToMongoDb } = require('./connect');  
// const urlRoute = require('./routes/url');
// const URL = require('./models/url');
// const path = require('path');
// const app = express();
// const PORT = 8001;
// const staticRoute = require('./routes/staticRoute')

// ConnectToMongoDb('mongodb://localhost:27017/short-url')
//     .then(() => {
//         console.log("MongoDB connected");
//     })
//     .catch((error) => {
//         console.log("Not connected", error);
//     });

//     app.set("view engine","ejs");
//     app.set('views',path.resolve("./views"));
// app.use(express.json()); // Parse JSON request bodies
// app.use("/url", urlRoute);
// app.use(express.urlencoded({extended:false}))//json data and form data both supported

// app.use('/',"staticRoute")

// // app.get("/test", async (req, res) => {//for ssr manual
// //     const allUrls = await URL.find({});
// //     return res.render('home',{
// //         urls: allUrls,
// //     });
//     // return res.send(`
//     //     // <html>
//     //     //     <head></head>
//     //     //     <body>
//     //     //         <ol>
//     //     //            ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`).join("")}
//     //     //         </ol>
//     //     //     </body>
//     //     // </html>
//     // `);
// // });

// // Corrected GET route
// app.get('/url/:shortId', async (req, res) => {  
//     const shortId = req.params.shortId;

//     try {
//         const entry = await URL.findOneAndUpdate(
//             { shortId },
//             { $push: { visitHistory: { timestamp: Date.now() } } }
//         );

//         if (!entry) {
//             return res.status(404).json({ error: "Short URL not found" });
//         }

//         res.redirect(entry.redirectURL);
//     } catch (error) {
//         console.error("Error fetching URL:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));


//corrected code 
const express = require("express");
const { ConnectToMongoDb } = require('./connect');
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRoute');
const path = require('path');
const app = express();
const PORT = 8001;

// Connect to MongoDB
ConnectToMongoDb('mongodb://localhost:27017/short-url')
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("Not connected", error);
    });

// Set up EJS view engine
app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", staticRoute);
app.use("/url", urlRoute); // Handle both POST and GET requests

// Start server
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
