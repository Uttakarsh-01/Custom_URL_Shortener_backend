// const User = require('../models/user');
// const user = require('../models/user');

// async function handleUserSignup(req,res) {
//     const {name,email,password} = req.body

//     await User.create({
//         name,
//         email,
//         password,
//     });
//     return res.render("home");

// }


// async function handleUserLogin(req,res) {
//     const {email,password} = req.body;
//     const user = await User.findOne({email,password});
//     if(!user)
//         return res.render("login",{
//     error:"Invalid Username or Password",
// });
//     return res.redirect("/");
// }
// module.exports = {
//     handleUserSignup,
//     handleUserLogin,
// };
const {v4: uuidv4} = require('uuid')
const User = require('../models/user');
const {setuser} = require("../service/auth")

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    try {
        await User.create({
            name,
            email,
            password,
        });
        return res.render("home");
    } catch (error) {
        if (error.code === 11000) { // Duplicate email error
            return res.render("signup", {
                error: "Email already exists",
            });
        }
        return res.render("signup", {
            error: "An error occurred while signing up",
        });
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user)
        return res.render("login", {
            error: "Invalid Username or Password",
        });

    const sessionId = uuidv4;
    const token = setuser(user);
    res.cookie("uid",token);
    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};
