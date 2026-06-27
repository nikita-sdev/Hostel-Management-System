import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLatestRequest } from "../services/studentServices";
import Navbar from "./navbar";

const StudentHome= ()=>{
  const [request, setRequest]= useState(null);
  useEffect(()=>{
    const fetchRequest= async()=>{
      const data= await getLatestRequest();
      if(data){
        setRequest(data.request);
      }
    }

    fetchRequest();
  },[])

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-gray-200 p-6">
      {/* Welcome section */}
      <div className="bg-gray-800/80 border border-gray-700 rounded-3xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white">
          Welcome Back {request?.userId?.name}
        </h1>

        <p className="mt-3 text-gray-400">
          Manage your accommodation requests and room details here.
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-gray-800 border border-gray-700 rounded-3xl p-6 hover:scale-105 transition">
          <h2 className="text-xl font-semibold text-indigo-400">
            📝 Apply
          </h2>

          <p className="mt-3 text-gray-400 cursor-pointer">
            <Link to='/student/request' >
            Submit a hostel accommodation request.
            </Link>
          </p>
        </div>
        
        <Link to="/my-requests">
        <div className="bg-gray-800 border border-gray-700 rounded-3xl p-6 hover:scale-105 transition">
          <h2 className="text-xl font-semibold text-indigo-400">
            📋 Status
          </h2>

          <p className="mt-3 text-gray-400">
            Track your application status.
          </p>
        </div>
        </Link>

        {/* <Link to='/student/rooms'>
        <div className="bg-gray-800 border border-gray-700 rounded-3xl p-6 hover:scale-105 transition">
          <h2 className="text-xl font-semibold text-indigo-400">
            🏠 Room
          </h2>

          <p className="mt-3 text-gray-400">
            View your assigned room details.
          </p>
        </div>
        </Link> */}
      </div>

      {/* Current Apllication */}
      <div className="bg-gray-800/80 border border-gray-700 rounded-3xl p-8 mt-10">

        <h2 className="text-2xl font-bold text-white">
          Current Request
        </h2>

        <div className="mt-6 space-y-2">

          {
            request? (
              <>
              <p>
            <span className="text-indigo-400">
              Event:
            </span>{" "}
            {request.eventName}
          </p>

          <p>
            <span className="text-indigo-400">
              Status:
            </span>{" "}
            {request.status}
          </p>

          <p>
            <span className="text-indigo-400">
              Arrival:
            </span>{" "}
            {new Date(request.arrivalDate).toLocaleDateString()}
          </p>

          <p>
            <span className="text-indigo-400">
              Departure:
            </span>{" "}
            {new Date(request.departureDate).toLocaleDateString()}
          </p>
          </>
            ):(
              <p>
            <span className="text-indigo-400">
              No request found
            </span>{" "}
          </p>
            )
          }

        </div>
      </div>

    </div>
    </>
  );
}

export default StudentHome;