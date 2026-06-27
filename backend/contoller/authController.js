const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const redis= require('../utils/redis');

const User= require('../model/user');
const sendMail= require('../utils/sendEmail');

exports.postLogin= async(req,res)=>{
  try{
    const {email, password}= req.body;
    // if(!email || !password){
    //   return res.status(400).json({
    //     msg: "All fields are required"
    //   });
    // }

    const user= await User.findOne({email});

    if(!user){
      return res.status(400).json({msg: "Invalid email"});
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
      return res.status(400).json({msg:"Incorrect password, please retry"});
    }

    const token= jwt.sign(
      {id:user._id, role: user.role},
      process.env.JWT_KEY,
      {expiresIn: "10d"}
    )

    res.json({role:user.role, token, user});
  }
  catch(err){
    console.log(err);
  }
}


exports.sendSignupOtp= async(req,res)=>{
  try {
    const {email}= req.body;

    if(!email){
      return res.status(404).json({
        msg:"Email is required"
      })
    }

    if(!email.endsWith("@gmail.com")){
      return res.status(400).json({
        msg:"Invalid email format"
      })
    }

    const otp= Math.floor(100000+Math.random()*900000);

    await redis.set(`otp:${email}`, otp, {EX:300});

    await sendMail(email, 'signup otp', `Your otp is ${otp}`);

    return res.status(200).json({msg:'OTP sent'});
  } catch (error) {
    return res.status(500).json({msg:error.message});
  }
}

exports.postSignUp = async(req,res)=>{
  try{
    const {email,password, name, role, otp}= req.body;

    if(!email || !password || !name || !otp){
      return res.status(400).json({
        msg: "All fields are required"
      });
    }

    if(!email.endsWith("@gmail.com")){
      return res.status(400).json({
        msg:"Invalid email format"
      })
    }

    const existingUser= await User.findOne({email});
    if(existingUser){
      return res.status(400).json({msg: "User already exists"});
    }

    const savedOTP= await redis.get(`otp:${email}`);

    if(!savedOTP){
      return res.status(400).json({
        msg:"OTP expired"
      })
    }

    if(savedOTP!==otp){
      return res.status(500).json({
        msg:"Invalid OTP",
      })
    }

    const hashedPass= await bcrypt.hash(password, 10);

    const user= new User({email, password:hashedPass, name, role});

    await user.save();
    res.status(201).json({ msg:"User created successfully"});
  }
  catch(err){
    console.log(err);
  }
}