const jwt = require('jsonwebtoken');

async function identifyUser(req, res, next){
  

    const token = req.cookies.token;
    

    if(!token){
       
        return res.status(401).json({
            message:'Invalid token or Unauthorized access'
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id || decoded._id;

        req.user = {
            ...decoded,
            id: userId,
            _id: userId
        };
        next();
    } catch(err){
        console.log("JWT Error:", err.message);
        return res.status(401).json({
            message:'Unauthorized access'
        })
    }
}

module.exports = identifyUser;
