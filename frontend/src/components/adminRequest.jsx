import { useEffect } from "react";
import { useState } from "react";
import { assignRoom, autoAssignRoom, getAllRequests, updateRequestStatus } from "../services/adminServices";
import Navbar from "./navbar";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const AdminRequest =()=>{
  let [requests, setRequests]= useState([]);
  const [error, setError]= useState("");
  const [room,setRoom]= useState({})
  const [filter, setFilter] = useState("all");
  const [loading, setLoading]= useState(false);
  useEffect(()=>{
    const fetchRequests= async()=>{
      try {
        setLoading(true);
        const res= await getAllRequests(setError);
        if(res){
        setRequests(res.requests);
      }
      } catch (error) {
        
      } finally{
        setLoading(false);
      }
    }

    fetchRequests();
  },[]);

  const handleStatus= async(id, status)=>{
    console.log("sending",status);
    const data= await updateRequestStatus(id,status, setError);
    console.log("response",data);

    if(data){
      setRequests(prev=>
        prev.map(req=>
          req._id===id?{
            ...req,
            status: data.request.status
          }:
          req
        )
      )
      toast.success("Status updated..")
    }
  }

  requests= requests.filter((req)=>{
    const matched= filter==="all" || req.status===filter;
    return matched;
  })

  const handleAssign= async(id)=>{
    const data= await assignRoom(id, room[id], setError);

    console.log("asssign response", data);
    if(data){
      setRequests(prev=>
        prev.map(req=>
          req._id===id?{
            ...req,
            assignedRoom: data.request?.assignedRoom
          }:
          req
        )
      )
      toast.success("Room assigned..")
    }else{
      toast.error("No room available");
    }
  }

  const handleAutoAssign= async(id)=>{
    const data= await autoAssignRoom(id, setError);

    if(data){
      setRequests(prev=>
        prev.map(req=>
          req._id===id?{
            assignedRoom: data.request.assignedRoom,
          }:req
        )
      )
      toast.success("Room assigned..")
    }else{
      toast.error("No room available");
    }
  }

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6">
      <div className="flex justify-end">
        <select
          value={filter}
          onChange={(e)=>setFilter(e.target.value)}
          className="bg-slate-300 rounded-lg px-2 py-1"
          >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <h1 className="text-4xl font-bold text-white mb-8">
        Accomodation Requests
      </h1>
      {loading? (
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
  ):
          requests.length===0? (
            <div className="bg-gray-800 p-6 rounded-xl text-center">

            <p className="text-gray-400">
            No requests found. Apply for an event accommodation.
            </p>

            </div>

          ):(

      <div className="bg-gray-800 border border-gray-700 rounded-3xl p-6 overflow-x-auto">
        <table className="w-full text-gray-300">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">College</th>
              <th className="p-4 text-left">Gender</th>
              <th className="p-4 text-left">Event</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            { requests.map((req)=>(

            <tr>

              <td className="p-4">{req.userId?.name}</td>
              <td className="p-4">{req.collegeName}</td>
              <td className="p-4">{req.gender}</td>
              <td className="p-4">{req.eventName}</td>

              <td className="p-4 text-yellow-400">
                {req.status}
              </td>

              <td className="p-4 flex gap-2">
                {
                req.status==="pending" &&
                <>
                <button 
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700" 
                onClick={()=>handleStatus(req._id,"approved")}
                >
                Approve
                </button>
                <button
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-800"
                onClick={()=>handleStatus(req._id,"rejected")}
                >
                Reject
                </button>
                </>
                }

                {
                req.status==="approved" && !req.assignedRoom && 
                <>
                <input
                placeholder="Room No"
                value={room[req._id] || ""}
                onChange={(e)=>setRoom({...room,
                  [req._id]:e.target.value
                })}
                className="bg-gray-700 px-3 py-2 rounded-lg"
                />
                <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                onClick={()=>handleAssign(req._id)}
                >

                Manual Assign
                </button>
                <button
                onClick={()=>handleAutoAssign(req._id)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                >
                Auto Assign
                </button>
                </>
                }
                {
                req.status==="rejected" &&
                (
                <span className="text-red-400">
                Rejected
                </span>
                )
                }
                {
                req.status==="approved" && req.assignedRoom&& 
                (
                <span className="text-green-400 bold">
                Assigned Room:- {req.assignedRoom}
                </span>
                )
                }
                </td>

            </tr>
            ))}

          </tbody>
        </table>
      </div>
          )}
    </div>
    </>
  )
}

export default AdminRequest;