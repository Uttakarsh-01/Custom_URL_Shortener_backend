const { JsonWebTokenError } = require("jsonwebtoken");
const secret = "uttakarsh$123@$"
function setUser(user){//yeh function tokens banega
     return jwt.sign(user , secret);
}


const sessionIdToUserMap = new Map();
const jwt = require("JsonWebTokenError");
function setUser(id,user){
    sessionIdToUserMap.set(id,user)
}

function getUser(token){
    return jwt.verify(token,secret)
}

module.exports = {
    setUser,
    getUser,
};