import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAdminStats } from "../services/adminServices";
import Navbar from "./navbar";

const AdminHome= ()=>{
  const [stats, setStats]= useState({
    total:0,
    pending:0,
    approved:0,
    rejected:0,
    totalRooms:0,
    availableRooms:0,
  })
  const [error, setError] = useState("");
  const [recent,setRecent]=useState([])

  useEffect(()=>{
    const fetchStats= async()=>{
      const data= await getAdminStats(setError);
      if(data){
        setStats(data);
        setRecent(data.recentRequests)
      }
    }

    fetchStats();
  },[])
  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-gray-200 p-6">
      <h1 className="text-4xl font-bold text-white">
        Admin Dashboard
      </h1>

      {/* stats */}
      <h2 className="text-3xl mt-5 font-bold text-indigo-400">
            Requests:
          </h2>
      <div className="grid md:grid-cols-4 gap-6 mt-5">
        
        <div className="bg-gray-800 border border-gray-700 rounded-3xl p-6 text-center">
          <h2 className="text-4xl font-bold text-indigo-400">
            {stats.total}
          </h2>
          <p>Total Requests</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-3xl p-6 text-center">
          <h2 className="text-4xl font-bold text-yellow-400">
            {stats.pending}
          </h2>
          <p>Pending</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-3xl p-6 text-center">
          <h2 className="text-4xl font-bold text-green-400">
            {stats.approved}
          </h2>
          <p>Approved</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-3xl p-6 text-center">
          <h2 className="text-4xl font-bold text-red-400">
            {stats.rejected}
          </h2>
          <p>Rejected</p>
        </div>
      </div>

      <h2 className="text-3xl mt-5 font-bold text-indigo-400">
            Rooms:
          </h2>
      <div className="grid md:grid-cols-4 gap-6 mt-4">
        <div className="bg-gray-800 border border-gray-700 rounded-3xl p-6 text-center">
          <h2 className="text-4xl font-bold text-indigo-400">
            {stats.totalRooms}
          </h2>
          <p>Total Rooms</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-3xl p-6 text-center">
          <h2 className="text-4xl font-bold text-yellow-400">
            {stats.availableRooms}
          </h2>
          <p>Available Rooms</p>
        </div>
        
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">

        <div className="bg-gray-800 border border-gray-700 rounded-3xl p-6">
          <Link to='/admin/requests'>
          <h2 className="text-xl cursor-pointer font-semibold">
            📋 View Requests
          </h2>

          <p className="mt-3 cursor-pointer text-gray-400">
            Check accommodation requests.
          </p>
          </Link>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-3xl p-6">
          <Link to='/admin/get-rooms'>
          <h2 className="text-xl font-semibold">
            🏠 Manage Rooms
          </h2>

          <p className="mt-3 text-gray-400">
            Add and manage hostel rooms.
          </p>
          </Link>
        </div>

      </div>

      {/* Recent Requests */}
      <div className="bg-gray-800 border border-gray-700 rounded-3xl p-6 mt-10">

        <h2 className="text-2xl font-bold">
          Recent Requests
        </h2>

        <table className="w-full mt-6">

          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">College</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>

            {
              recent.map(req=>(
                <tr key={req._id}>
                  <td className="p-3">
                    {req.userId.name}
                  </td>
                  <td className="p-3">
                    {req.collegeName}
                  </td>
                  <td className="p-3">
                    <span className={req.status==="approved"? "text-green-400":
                      req.status==="rejected"? "text-red-400":
                      "text-yellow-400"
                    }>{req.status}</span>
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default AdminHome