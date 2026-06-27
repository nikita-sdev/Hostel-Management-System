import {motion} from 'framer-motion'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { addSignupToServer, sendOTP } from "../services/authServices";
import toast from "react-hot-toast";

const Signup = ()=>{
  const navigate= useNavigate();
  const [email, setEmail]= useState("");
  const [name, setName]= useState("");
  const [password, setPassword]= useState("");
  const [error, setError]= useState("");
  const [role,setRole]= useState("student");
  const [otp, setOtp]= useState("");
  const [showOtp,setShowOtp]= useState(false);
  const [text, setText]= useState(false);
  const [timeLeft, setTimeLeft]= useState(0);

  const handleSignup = async()=>{
    console.log(otp);
    const res= await addSignupToServer(email, password, name,role,otp, setError);
    if(res){
      navigate("/login");
    
      toast.success("Sign-Up successfull")
    }
  }

  useEffect(()=>{
    if(timeLeft<=0){
      setShowOtp(false);
      return;
    }

    const timer= setInterval(()=>{
      setTimeLeft(prev=>prev-1);
    },1000);

    return ()=>clearInterval(timer);
  }, [timeLeft]);

  const formatTime= ()=>{
    const min= Math.floor(timeLeft/60);
    const sec= timeLeft%60;

    return `${min}:${sec<10? "0"+sec:sec}`;
  }

  const handleOtp= async()=>{
    if(email)setText(true);
    setError("");
    const res= await sendOTP(email, setError);
    if(res){
      setShowOtp(true);
      setTimeLeft(300);
    }
    setText(false);
  }

  const [show, setShow] = useState(false);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black px-4 text-gray-200">
    
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-3xl shadow-2xl p-8"
    >
      
      {/* HEADER */}
      <h2 className="text-3xl font-bold text-white text-center">
        Create Account ✨
      </h2>
      <p className="text-center text-gray-400 mt-2">
        Join and start using Lost & Found
      </p>

      {/* FORM */}
      <div className="mt-6 space-y-5">

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Email
          </label>
          <input
            type="email"
            placeholder="e.g. john@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl bg-gray-900 border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {/* NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Name
          </label>
          <input
            type="text"
            placeholder="e.g. John Doe"
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl bg-gray-900 border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {/* role */}
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Role
          </label>
          <select
            name="role"
            onChange={(e)=>setRole(e.target.value)}
            className="mt-2 w-full rounded-xl bg-gray-900 border border-gray-700 px-4 py-2 pr-10 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Password
          </label>

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl bg-gray-900 border border-gray-700 px-4 py-2 pr-10 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3 text-gray-400 text-sm"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>

      <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.01 }}
          className="mt-5 bg-gradient-to-r from-green-500 to-purple-600 text-white py-1 px-3 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/30 transition"
          onClick={()=>{
            setError("");
            handleOtp();
          }}
        >
          {text ? "Generating OTP.." : "Get OTP"}
        </motion.button>

        {showOtp && 
        <div className='flex flex-col justify-center'>
          <input
            type="email"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            className="mt-2 w-100 rounded-xl bg-gray-900 border border-gray-700 px-4 py-2 text-white  placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
          <p className='text-gray-400 mt-3'>
            OTP expires in:
            <span className='text-indigo-400 ml-1'>
              {formatTime()}
            </span>
          </p>
        </div>
        }
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        {/* BUTTON */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={()=>{handleSignup(), setError("")}}
          className="w-full mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/30 transition"
        >
          Sign Up
        </motion.button>

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 font-medium hover:text-indigo-300 transition"
          >
            Login
          </Link>
        </p>

      </div>
    </motion.div>
  </div>
  )
}

export default Signup;