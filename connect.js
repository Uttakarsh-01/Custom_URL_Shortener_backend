// // const mongoose = require("mongoose")

// // async function ConnectToMongoDb(url) {
// //     return mongoose.connect(url);    
// // }

// // module.export = {
// //     ConnectToMongoDb,
// // };

// const mongoose = require('mongoose');

// const ConnectToMongoDb = async (url) => {
//     return mongoose.connect(url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
// };

// module.exports = { ConnectToMongoDb };


const mongoose = require("mongoose");

async function ConnectToMongoDb(url) {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = { ConnectToMongoDb }; // Corrected export syntax
