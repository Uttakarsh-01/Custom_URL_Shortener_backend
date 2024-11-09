// const mongoosse = require('mongoose');

// const urlSchema = new mongoosse.Schema({
//     shortId:{
//         type:String,
//         required:true,
//         unique:true,
//     },
//     redirectURL: {
//         type:String,
//         required: true,
//     },
//     visitHistory: [{timestamp: {type:Number}}],
// },
// { timestamps:true }
// );

// const URL = mongoosse.model('url',urlSchema);
// module.exports = URL;


const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({ // Fixed typo here
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
}, { timestamps: true });

const URL = mongoose.model('url', urlSchema);
module.exports = URL;
