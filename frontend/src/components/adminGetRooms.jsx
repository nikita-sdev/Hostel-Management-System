// import {useEffect,useState} from "react";
// import {getAllRooms} from "../services/adminServices";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./navbar";
// const AdminGetRooms=()=>{
// const navigate= useNavigate();
// const [rooms,setRooms]=useState([]);
// const [error,setError]=useState("");

// useEffect(()=>{
// const fetchRooms=async()=>{
// const data= await getAllRooms(setError);
// if(data){
//   console.log(data.rooms);
// setRooms(data.rooms);
// }
// }
// fetchRooms();
// },[])



// return(
// <>
// <Navbar></Navbar>
// <div className="min-h-screen bg-gray-900 p-8">
// <h1 className="text-4xl text-white font-bold mb-8">
// Manage Rooms
// </h1>
// <div className="bg-gray-800 rounded-2xl p-6">
// <table className="w-full text-gray-300">
// <thead>

// <tr className="border-b border-gray-700">
// <th className="p-4 text-left">
// Hostel
// </th>
// <th className="p-4 text-left">
// Room
// </th>
// <th className="p-4 text-left">
// Capacity
// </th>
// <th>
// Gender
// </th>
// <th className="p-4 text-left">
// Occupied
// </th>
// <th className="p-4 text-left">
// Status
// </th>
// </tr>
// </thead>
// <tbody>
// {
// rooms.map(room=>(
// <tr key={room._id}
// className="border-b border-gray-700"
// >
// <td className="p-4">
// {room.hostelName}
// </td>
// <td className="p-4">
// {room.roomNumber}
// </td>
// <td className="p-4">
// {room.capacity}
// </td>
// <td>
// {room.gender}
// </td>
// <td className="p-4">
// {room.occupied}
// </td>
// <td className="p-4">
// {
// room.available?
// <span className="text-green-400">
// Available
// </span>
// :
// <span className="text-red-400">
// Full
// </span>
// }
// </td>
// </tr>
// ))
// }
// </tbody>
// </table>
// </div>
// <div className="flex justify-center mt-6">

//   <button
//     onClick={()=>navigate("/admin/rooms")}
//     className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
//   >
//     Add Room
//   </button>

// </div>
// </div>
// </>
// )
// }


// export default AdminGetRooms;

import { useEffect, useState } from "react";
import { deleteRoom, getAllRooms } from "../services/adminServices";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const AdminGetRooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading]= useState(false);
  
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await getAllRooms(setError);
      if (data) {
        setRooms(data.rooms);
      }
    } catch (error) {
      
    }finally{
      setLoading(false);
    }
    };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (roomId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this room?");
    if (!confirmDelete) return;

    try {
      const data= await deleteRoom(roomId);
      setRooms(prevRooms=> prevRooms.filter((room)=> room._id!==roomId));
      fetchRooms();
      toast.success("Room deleted..")
    } catch (err) {
      setError("Failed to delete the room.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl text-white font-bold">Manage Rooms</h1>
          <button
            onClick={() => navigate("/admin/rooms")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
          >
            + Add Room
          </button>
        </div>

        {/* Error Alert if any */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 text-red-200 rounded-xl">
            {error}
          </div>
        )}

        {/* Cards Grid Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
        {loading && 
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[50vh]"
            >
              <div className="w-10 h-10 border-4 border-gray-700 border-t-gray-100 rounded-full animate-spin"></div>
              <p className="text-gray-500 mt-5 font-medium">Fetching Requests...</p>
            </motion.div>
          }
          {rooms.map((room) => (
            <div
              key={room._id}
              className="bg-gray-800 rounded-2xl p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-colors duration-300 flex flex-col justify-between shadow-xl"
            >
              {/* Card Header */}
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                      Room {room.roomNumber}
                    </h2>
                    <p className="text-indigo-400 font-medium text-sm">
                      {room.hostelName}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      room.available
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                  >
                    {room.available ? "Available" : "Full"}
                  </span>
                </div>

                <hr className="border-gray-700 mb-4" />

                {/* Room Statistics */}
                <div className="grid grid-cols-3 gap-2 text-center mb-4 bg-gray-900/50 p-3 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-400 uppercase">Gender</p>
                    <p className="text-sm font-semibold text-gray-200 capitalize">{room.gender || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase">Occupied</p>
                    <p className="text-sm font-semibold text-gray-200">{room.occupied}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase">Capacity</p>
                    <p className="text-sm font-semibold text-gray-200">{room.capacity}</p>
                  </div>
                </div>

                {/* Warden Details */}
                <div className="space-y-2 mt-4 text-sm text-gray-300 bg-gray-700/30 p-3 rounded-xl">
                  <p className="flex justify-between">
                    <span className="text-gray-400">Warden:</span>
                    <span className="font-medium text-white">{room.wardenName || "Not Assigned"}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Contact:</span>
                    <span className="text-gray-200">{room.contact || "N/A"}</span>
                  </p>
                  <p className="flex justify-between overflow-hidden">
                    <span className="text-gray-400 mr-2">Email:</span>
                    <span className="text-gray-200 truncate" title={room.email}>
                      {room.email || "N/A"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Actions Section */}
              <div className="mt-6 pt-4 border-t border-gray-700/50 flex justify-end">
                <button
                  onClick={() => handleDelete(room._id)}
                  className="px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                >
                  Delete Room
                </button>
              </div>
            </div>
          ))}
        </div>
        {rooms.length===0 && 
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 text-xl text-white bg-slate-900 mt-10"><p>No rooms available, add a room</p></div>}
      </div>
    </>
  );
};

export default AdminGetRooms;