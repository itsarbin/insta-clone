const jwt = require('jsonwebtoken');

async function identifyUser(req, res, next){
 const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:'Invalid token or Unauthorized access'
        })
    }

    let decoded = null;

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch(err){
        return res.status(401).json({
            message:'Unauthorized access'
        })
    }

     req.user = decoded;

    next();


}

module.exports = identifyUser;