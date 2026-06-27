

import { useEffect, useState } from "react";
import { cancleRequest, getStudentRequest } from "../services/studentServices";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./navbar";

const StudentStatus = () => {
  const [error, setError] = useState("");
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequest = async () => {
      try {
        setIsLoading(true);
        const data = await getStudentRequest(setError);
        if (data) {
          setRequests(data.requests);
        }
      } catch (err) {
        setError("Failed to fetch accommodation data.");
      } finally {
        setIsLoading(false);
      }
    };

  useEffect(() => {
    fetchRequest();
  }, []);

  const deleteReq= async(id)=>{
    const dlt= await cancleRequest(id);
    if(dlt){
        setRequests(prev=>
          prev.filter(req=>id!==req._id)
        )

        fetchRequest();
    }
  }

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-950/50 text-green-400 border border-green-700/50";
      case "rejected":
        return "bg-red-950/50 text-red-400 border border-red-700/50";
      case "canceled":
        return "bg-orange-950/50 text-red-400 border border-red-700/50";
      default:
        return "bg-yellow-950/50 text-yellow-400 border border-yellow-700/50";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", duration: 0.3 }
    },
  };

  return (
    <>
    <Navbar></Navbar>
    {/* // Base container uses dark gradient and full viewport height */}
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-gray-100 selection:bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        {/* Header Section - Uses fluid typography and responsive margins */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-50 to-gray-400">
            Accommodation Status
          </h1>
          <p className="text-gray-400 mt-3 text-base md:text-lg max-w-2xl mx-auto md:mx-0">
            View the latest update and room assignments for your submitted requests.
          </p>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 p-4 bg-red-950/50 border border-red-800 text-red-300 rounded-xl text-sm font-medium"
          >
            {error}
          </motion.div>
        )}

        {/* State Management View */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            /* Enhanced Loading State compatible with dark theme */
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[50vh]"
            >
              <div className="w-10 h-10 border-4 border-gray-700 border-t-gray-100 rounded-full animate-spin"></div>
              <p className="text-gray-500 mt-5 font-medium">Fetching details...</p>
            </motion.div>
          ) : requests.length === 0 ? (
            /* Dark-themed Empty State */
            <motion.div 
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-gray-900 border border-gray-800 p-10 md:p-16 rounded-3xl text-center shadow-2xl max-w-lg mx-auto mt-16"
            >
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-700 shadow-inner">
                <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-2">No active requests</h3>
              <p className="text-gray-400 text-base max-w-xs mx-auto">
                Submit an accommodation application to track its progress here.
              </p>
            </motion.div>
          ) : (
            /* Mobile-first Cards Grid. Adapts column count based on breakpoint. */
            <motion.div 
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
            >
              {requests.map((req) => (
                <motion.div
                  key={req._id}
                  variants={cardVariants}
                  whileHover={{ y: -5, borderColor: "#374151" }} 
                  className="relative bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-lg overflow-hidden transition-colors"
                >{req.status !=="approved" &&
                  <>
                  <button
                  onClick={()=>deleteReq(req._id)}
                  className="absolute top-4 right-4 px-2 rounded-xl h-8 flex items-center justify-center  bg-red-950 text-red-400 hover:bg-red-600 hover:text-white transition"
                  >
                  Cancel
                  </button>
                  </>
                  
                  }
                  <div className="overflow-hidden">
                    {/* Event & College Header */}
                    <div className="flex flex-col gap-1 mb-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white truncate" title={req.eventName}>
                        {req.eventName}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-400">
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-sm font-medium truncate" title={req.collegeName}>{req.collegeName}</span>
                      </div>
                    </div>

                    {/* Timeline section with dark background box */}
                    <div className="bg-black/30 border border-gray-800 rounded-xl p-4 mb-6">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-gray-500 font-semibold tracking-wider uppercase">
                        <div>Arrival</div>
                        <div>Departure</div>
                        {/* Date values. Used fluid font size and word wrapping fix */}
                        <div className="text-sm md:text-base text-gray-100 font-bold col-span-1 truncate">
                           {new Date(req.arrivalDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm md:text-base text-gray-100 font-bold col-span-1 truncate">
                           {new Date(req.departureDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer containing Status and Room assignment */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-gray-800/80 mt-auto">
                    {/* Pill Status */}
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${getStatusStyles(req.status)}`}>
                      {req.status}
                    </span>
                    
                    {/* Room Info */}
                    {(req.status === "approved" || req.status==="pending") &&
                    
                    <div className="text-sm text-gray-400">
                      Hostel: <span className={`font-semibold ml-1 ${req.hostelName ? 'text-white' : 'text-gray-600'}`}>
                        {req.hostelName || "Pending"}
                      </span>
                      <br/>
                      Room: <span className={`font-semibold ml-1 ${req.assignedRoom ? 'text-white' : 'text-gray-600'}`}>
                        {req.assignedRoom || "Pending"}
                      </span>
                    </div>
                    }

                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-gray-800/80 mt-auto">
                    {/* Pill Status */}
                    
                    
                    {/* Room Info */}
                    {req.status === "approved" &&
                    
                    <div className="text-sm text-gray-400">
                      Warden details : <br/>
                      <div className="text-sm text-gray-400">
                      Name : <span>{req.room?.warden?.name || "not assigned"}</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Phone Number : <span>{req.room?.warden?.phone || "not assigned"}</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Email : <span>{req.room?.warden?.email || "not assigned"}</span>
                    </div>
                    </div>
                    }

                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    </>
  );
};

export default StudentStatus;