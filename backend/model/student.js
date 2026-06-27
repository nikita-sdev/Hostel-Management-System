const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  collegeName:{
    type:String,
    required:true
  },
  eventName:{
    type:String,
    required:true,
  },
  gender:{
    type:String,
    enum: ["male","female"],
    required:true,
  },
  arrivalDate:{
    type:Date,
    required:true,
  },
  departureDate:{
    type:Date,
    required:true,
  },
  phoneNumber:{
    type:String,
    required:true,
  },
  status:{
    type:String,
    enum:["pending","approved","rejected","cancelled"],
    default: "pending"
  },
  assignedRoom:{
    type:String,
    default:null
  },
  assignedHostel:{
    type:String,
    default:null
  }
},{
  timestamps:true,
})

module.exports = mongoose.model("AccomodationRequest", studentSchema);