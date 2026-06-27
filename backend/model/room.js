const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
  hostelName:{
  type:String,
  required:true
  },
  wing:{
  type:String,
  },
  roomNumber:{
    type:String,
    required:true,
    unique:true
  },
  capacity:{
    type:Number,
    required:true
  },
  gender:{
    type:String,
    enum:["male","female"],
    required:true
  },
  occupied:{
    type:Number,
    default:0
  },
  available:{
    type:Boolean,
    default:true,
  },
  warden:{
    name:{
      type:String,
      required:true
    },
    phone:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true
    }
  }
})

module.exports = mongoose.model("Room", roomSchema);