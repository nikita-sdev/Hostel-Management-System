const Room = require('../model/room');
const Student= require('../model/student');
const User= require("../model/user");
const sendEmail= require("../utils/sendEmail");

exports.getDashboardStats= async(req,res)=>{
  try{
    const total= await Student.countDocuments();
    const pending= await Student.countDocuments({status: "pending"});

    const approved= await Student.countDocuments({status:"approved"});

    const rejected= await Student.countDocuments({status:"rejected"});

    const totalRooms = await Room.countDocuments();

    const availableRooms = await Room.countDocuments({
        available:true
    })

    const recentRequests = await Student
    .find()
    .populate("userId")
    .sort({
    createdAt:-1
    })
    .limit(5);

    return res.status(200).json({
      msg:"Stats done",
      total, pending, approved, rejected, totalRooms, availableRooms, recentRequests
    })
  }catch(error){
    res.status(500).json({msg:error.message});
  }
}

exports.getAllRequests= async(req,res)=>{
  try {
    const requests= await Student.find().populate("userId");
    
    return res.status(200).json({
      requests,
    })
  } catch (error) {
    return res.status(500).json({msg:error.msg})
  }
}

exports.approveRequest= async(req,res)=>{
  try{
    const userId= req.params.id;
    const request= await Student.findByIdAndUpdate(userId, {status: "approved"}, {new:true});

    const user=await User.findById(request.userId);

    await sendEmail(user.email, 
      "Accomodation Request Update",
      `Your hostel accomodation request for ${request.eventName} at ${request.collegeName} has been approved. Kindly view your profile for warden details `
    )
    return res.status(200).json({
      msg:"Request approved",
      request,
    })
  }
  catch(error){
    console.log(error.message);
    return res.status(500).json({
      msg: error.message,
    })
  }
}

exports.rejectRequest= async(req,res)=>{
  try{
    const userId= req.params.id;
    const request= await Student.findByIdAndUpdate(userId, {status: "rejected"}, {new:true});

    const user=await User.findById(request.userId);

    await sendEmail(user.email, 
      "Accomodation Request Update",
      `We regret to inform you that your hostel accomodation request for ${request.eventName} at ${request.collegeName} has been rejected.`
    )

    return res.status(200).json({
      msg:"Request rejected",
      request,
    })
  }
  catch(error){
    console.log(error.message)
    return res.status(500).json({
      msg: error.message,
    })
  }
}

exports.addRooms= async(req,res)=>{
  try {
    const {hostelName,wing,roomNumber, capacity, gender,warden} = req.body;
    const room= new Room({hostelName,wing,roomNumber,capacity, gender,warden});
    await room.save();

    return res.status(201).json({
      msg:"Room created succesfully",
    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      msg:error.message,
    })
  }
}

exports.getRooms= async(req,res)=>{
  try {
    const rooms= await Room.find();
    return res.status(200).json({
      msg:"All rooms",
      rooms
    })
  } catch (error) {
    return res.status(500).json({
      msg:error.message,
    })
  }
}

exports.assignRoom= async(req,res)=>{
  try{
    const {roomNumber} =req.body;
    console.log(roomNumber);

    const room= await Room.findOne({roomNumber});
    console.log(room);

    if(!room){
      return res.status(404).json({
        msg:"Room not found",
      })
    }

    if(room.occupied>= room.capacity){
      return res.status(400).json({
        msg:"Room is full"
      })
    }

    const request= await Student.findByIdAndUpdate(
      req.params.id, 
      {
        assignedRoom: roomNumber,
        assignedHostel: room.hostelName
      },
      {
        new:true
      }
    )
    if(!request){
      return res.status(404).json({
        msg:"Request not found"
      })
    }
    room.occupied+=1;

    if(room.occupied === room.capacity){
      room.available= false;
    }

    await room.save();

    return res.status(200).json({
      msg:"Room assigned successfully",
      request
    })
  }
  catch(error){
    return res.status(500).json({
      msg:error.message
    })
  }
}

exports.autoAssignRoom= async(req,res)=>{
  try{
    const request= await Student.findById(req.params.id);
    if(!request){
      return res.status(404).json({
        msg:"Request not found"
      })
    }
    const room= await Room.findOne({
      gender: request.gender,
      available : true
    })

    if(!room){
      return res.status(400).json({
        msg:"No room available"
      })
    }

    request.assignedRoom= room.roomNumber;
    await request.save();

    room.occupied+=1;
    if(room.occupied >= room.capacity){
      room.available= false;
    }
    await room.save();

    return res.status(200).json({
      msg:"Room assigned",
      request
    })
  }
  catch(error){
    return res.status(500).json({
      msg:error.message,
    })
  }
}

exports.deleteRoom= async(req,res)=>{
  try {
    const room= await Room.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      msg:"room deleted "
    })
  } catch (error) {
    return res.status(500).json({
      msg:error.message
    })
  }

}