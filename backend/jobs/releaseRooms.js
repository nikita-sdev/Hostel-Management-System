const cron=require("node-cron");
const Student=require("../model/student");
const Room=require("../model/room");


cron.schedule("0 0 * * *",async()=>{

try{

const today=new Date();


const students=await Student.find({
assignedRoom:{$ne:null},
departureDate:{$lt:today}
});


for(let student of students){


const room=await Room.findOne({
roomNumber:student.assignedRoom
});


if(room){

room.occupied-=1;


if(room.occupied < room.capacity){
room.available=true;
}


await room.save();


student.assignedRoom=null;
await student.save();

}


}


console.log("Expired rooms released");


}catch(error){

console.log(error.message);

}

});