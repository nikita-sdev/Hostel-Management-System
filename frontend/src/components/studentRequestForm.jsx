import {motion} from 'framer-motion'
import { useState} from 'react'
import { addStudentRequest } from '../services/studentServices';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import toast from "react-hot-toast";

const StudentRequestFome=()=>{
  const [formData,setFormData]= useState({
    collegeName:"",
    eventName:"",
    gender:"male",
    arrivalDate:"",
    departureDate:"",
    phoneNumber:"",
  })

  const [error, setError]= useState("");
  const navigate= useNavigate();

  const handleChange= (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit= async()=>{
    const res= await addStudentRequest(formData.collegeName,formData.eventName, formData.gender, formData.arrivalDate, formData.departureDate, formData.phoneNumber,setError);

    if(res){
      console.log(res);
      navigate("/my-requests");
      toast.success("Request submitted successfully")
    }
  }
  return(
    <>
    <Navbar></Navbar>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black px-4 text-gray-200">
    
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-10 w-full max-w-md bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-3xl shadow-2xl p-8"
    >
      
      {/* HEADER */}
      <h2 className="text-3xl font-bold text-white text-center">
        Hostel Accomodation Request Form
      </h2>
      <p className="text-center text-gray-400 mt-2">
        Fill the form below and submit
      </p>

      {/* FORM */}
      <div className="mt-6 space-y-5">

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium text-gray-400">
            College Name
          </label>
          <input
            type="text"
            placeholder='eg: NIT Silchar'
            name="collegeName"
            onChange={handleChange}
            className="mt-2 w-full rounded-xl bg-gray-900 border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {/* NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Event Name
          </label>
          <input
            type="text"
            placeholder='eg: Neurathon'
            name='eventName'
            onChange={handleChange}
            className="mt-2 w-full rounded-xl bg-gray-900 border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {/* role */}
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl bg-gray-900 border border-gray-700 px-4 py-2 pr-10 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* arrival date */}
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Arrival Date
          </label>
          <input
            type="date"
            name="arrivalDate"
            onChange={handleChange}
            className="mt-2 w-full rounded-xl bg-gray-900 border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {/* departure date */}
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Departure Name
          </label>
          <input
            type="date"
            name="departureDate"
            onChange={handleChange}
            className="mt-2 w-full rounded-xl bg-gray-900 border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {/* phone number */}
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            onChange={handleChange}
            className="mt-2 w-full rounded-xl bg-gray-900 border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        {/* BUTTON */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleSubmit}
          className="w-full mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/30 transition"
        >
          Submit Request
        </motion.button>
      </motion.div>
    </div>
    </>
  )
}

export default StudentRequestFome;