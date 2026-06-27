const express= require('express');
const {adminMiddleware}= require('../middleware/adminMiddleWare');
const {authMiddleware}= require('../middleware/authMiddleware');

const router=express.Router();

const adminController= require('../contoller/adminController');

router.get("/admin/home", authMiddleware, adminMiddleware, adminController.getDashboardStats);

router.get('/admin/requests', authMiddleware, adminMiddleware, adminController.getAllRequests);

router.put('/admin/approved/:id', authMiddleware ,adminMiddleware, adminController.approveRequest);

router.put('/admin/rejected/:id', authMiddleware ,adminMiddleware, adminController.rejectRequest);

router.post('/admin/rooms', authMiddleware ,adminMiddleware, adminController.addRooms);

router.get('/admin/get-rooms', authMiddleware ,adminMiddleware , adminController.getRooms);

router.delete('/admin/get-rooms/:id', authMiddleware ,adminMiddleware , adminController.deleteRoom);

router.put("/admin/assign-room/:id",
  authMiddleware, adminController.assignRoom
);

router.put("/admin/auto-room/:id", authMiddleware, adminMiddleware, adminController.autoAssignRoom)

module.exports= router;