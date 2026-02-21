 const userModel = require('../model/user.model');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');

async function registerController(req,res){
    const {username,email,password,bio,profileImg} = req.body;


    const exsistingUser = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    });
  

   if(exsistingUser){
    return res.status(409).json({
        message:"user already exists" + (exsistingUser.email === email ? ' with this email' : ' with this username')
    })
   }

   const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
        bio,
        profileImg
    })

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'1d'})
    res.cookie('token',token)
    res.status(201).json({
        message:'User registered successfully',
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImg:user.profileImg
        }
         
    })
} 


 
 async function loginController (req, res){
    const {username,email,password} = req.body;

    const user = await userModel.findOne({
        $or:[
            {email:email},
            {username:username}
        ]
    })

    if(!user){
        return res.status(401).json({
            message:'user not found'
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid ){
        return res.status(401).json({
            message:'invalid password '
        })
    }

    const token = jwt.sign({
        id:user._id
    }, process.env.JWT_SECRET, {expiresIn:'1d'})

    res.cookie("token", token)

    res.status(200).json({
        message:'Login successful',
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImg:user.profileImg
        }

})}

module.exports = {
    registerController,
    loginController
}