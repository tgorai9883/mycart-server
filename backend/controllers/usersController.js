const User = require("../models/UserModel");
const generateToken = require("../utils/generateToken");

const registeredUser = async(req, res)=>{
    const {name, email, password} = req.body;
    const userExist = await User.findOne({email});
    if(userExist) {
        res.status(400);
        throw new Error("User already Exist");
    }

    const user = await User.create({name, email, password});
    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(404);
        throw new Error("User not found");
    }
}

const authController =  async(req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
    }
};

const getUserProfile = async (req,res) =>{
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
};

// const updateUserProfile = async(req,res) => {
//     const user = await User.findById(req.user._id);
//     if(user){
//         user.name = req.body.name || user.name;
//         user.email = req.body.email || user.email;

//     } else {
        
//     }
// }

module.exports = { authController,getUserProfile,registeredUser };