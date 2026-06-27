const jwt= require('jsonwebtoken');
require('dotenv').config();

exports.authMiddleware = async(req,res,next) =>{
  const authToken = req.headers.authorization;
  if(!authToken){
    return res.status(401).json({msg:"No token"});
  }

  const token= authToken.split(" ")[1];
  try{
    const decoded= jwt.verify(token, process.env.JWT_KEY);

    req.user= decoded;
    return next();
  }
  catch(error){
    return res.status(401).json({
      msg:error.msg,
    })
  }
}