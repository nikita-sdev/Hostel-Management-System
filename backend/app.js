const express= require('express');
const cors= require('cors');
const mongoose= require('mongoose');
require('dotenv').config();
require("./jobs/releaseRooms");

//local modules
const authRouter = require('./route/authRouter');
const requestRouter= require('./route/requestRouter');
const adminRouter= require('./route/adminRouter');

const app= express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/auth", authRouter);
app.use(adminRouter);
app.use(requestRouter);
const PORT= 3000;

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT, (req,res)=>{
    console.log(`Server is running on port ${PORT}`);
  })
})
.catch(err=>{
  console.log(err);
})