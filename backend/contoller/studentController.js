const Student= require('../model/student');
const Room= require("../model/room")
const User= require('../model/room');


exports.createRequest= async(req,res)=>{
  try {
    const {collegeName,eventName, gender, arrivalDate, departureDate, phoneNumber} = req.body;

    const userId= req.user.id;

    const request= new Student({
      userId,
      collegeName,eventName, gender, arrivalDate, departureDate, phoneNumber
    })

    await request.save();

    return res.status(201).json({
      msg:"Request saved successfully"
    });
  } catch (error) {
    return res.status(500).json({
      msg:error.message,
    })
  }
}

// student status api

exports.getRequest = async(req,res)=>{
  try {
    
    const requests= await Student.find({
      userId: req.user.id
    })

    if(requests.length===0){
      return res.status(404).json({
        msg:"No requests found"
      })
    }

    const updatedRequests= await Promise.all(
      requests.map(async(request)=>{
        let room=null;

        if(request.assignedRoom){
          room = await Room.findOne({
            roomNumber:request.assignedRoom
          })
        }
        return {
          ...request._doc,
          room
        }
      })
    )

    return res.status(200).json({
      msg:"Success getting request",
      requests:updatedRequests,
    })
  } catch (error) {
    return res.status(500).json({
      msg:error.message,
    })
  }
}

exports.getLatestReuquests= async(req,res)=>{
  try {
    const userId= req.user.id;
    const request= await Student.findOne({userId}).sort({createdAt:-1}).populate("userId");
    if(!request){
      return res.status(404).json({
        msg:"Request not found"
      });
    }
    
    return res.status(200).json({
      msg:"Request found",
      request,
    })
  } catch (error) {
    return res.status(500).json({
      msg: error.message
    });
  }
}


exports.cancelRequest=async(req,res)=>{
 try{

 const request=await Student.findById(req.params.id);

 if(!request){
  return res.status(404).json({
   msg:"Request not found"
  })
 }

 request.status="cancelled";

 await request.save();

 return res.status(200).json({
  msg:"Request cancelled",
  request
 })

 }catch(error){
 return res.status(500).json({
  msg:error.message
 })
 }
}