const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true,'Username already exists']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:[true,'Email already exists']
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    bio: String,
    profileImg:{
        type:String,
        default:"https://ik.imagekit.io/flu09zc7k/Tiktok%20Default%20Profile%20Picture%20Sticker%20Sticker.jpg"

    }
})

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;