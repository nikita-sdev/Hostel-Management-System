const express= require('express');
const {authMiddleware}= require('../middleware/authMiddleware');

const router=express.Router();

const requestController = require('../contoller/studentController')

router.post('/student/request',authMiddleware, requestController.createRequest);
router.get("/my-requests", authMiddleware, requestController.getRequest);
router.get("/student/home", authMiddleware, requestController.getLatestReuquests)
router.delete("/my-requests/:id", authMiddleware, requestController.cancelRequest)

module.exports= router;