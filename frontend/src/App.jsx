import { useState } from "react"
import { BrowserRouter, Route, Routes, Navigate, useLocation} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./components/home";
import StudentHome from "./components/studenthome";
import AdminHome from "./components/adminhome";
import StudentRequestFome from "./components/studentRequestForm";
import StudentStatus from "./components/studentStaus";
import AdminRequest from "./components/adminRequest";
import AdminRooms from "./components/adminRoom";
import AdminGetRooms from "./components/adminGetRooms";
import Navbar from "./components/navbar";
import ProtectedRoute from "./components/protectedRoute";


function App() {
  const [token, setToken]= useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>
    <Toaster position="top-right"></Toaster>
    <Routes>
      {/* landing page */}
      <Route path='/' element={<Home></Home>}></Route>
      {/* login link */}
      <Route path='/login' element={<Login setToken={setToken}/>}></Route>
      {/* signup link */}
      <Route path='/signup' element={<Signup></Signup>}></Route>
      {/* nav bar */}
      {/* student home page */}
      <Route path='/student/home' element={<ProtectedRoute role="student"><StudentHome></StudentHome></ProtectedRoute>}></Route>
      {/* student request form page */}
      <Route path='/student/request' element={<ProtectedRoute role="student"><StudentRequestFome/></ProtectedRoute>}></Route>
      {/* student status page */}
      <Route path="/my-requests" element={<ProtectedRoute role="student"><StudentStatus/></ProtectedRoute>}></Route>
      {/* admin home page */}
      <Route path='/admin/home' element={<ProtectedRoute role="admin"><AdminHome/></ProtectedRoute>}></Route>
      {/* admin request page */}
      <Route path='/admin/requests' element={<ProtectedRoute role="admin"><AdminRequest/></ProtectedRoute>}></Route>
      {/* admin get rooms */}
      <Route path="/admin/get-rooms" element={<ProtectedRoute role="admin"><AdminGetRooms/></ProtectedRoute>}></Route>
      {/* admin add rooms */}
      <Route path="/admin/rooms" element={<ProtectedRoute role="admin"><AdminRooms/></ProtectedRoute>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
