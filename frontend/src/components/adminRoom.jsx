import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { addRoomsToServer } from "../services/adminServices";
import Navbar from "./navbar";
import toast from "react-hot-toast";

const AdminRooms = () => {

  const navigate= useNavigate();
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [gender, setGender]= useState("male");
  const [error, setError]= useState("");
  const [hostelName, setHostelName]= useState("");
  const [wing, setWing]= useState("");
  const [wardenName,setWardenName]=useState("");
  const [wardenPhone,setWardenPhone]=useState("");
  const [wardenEmail, setWardenEmail]= useState("");

  const handleAddRoom = async() => {
    const res= await addRoomsToServer(hostelName,wing,roomNumber,capacity,gender,wardenName,wardenPhone,wardenEmail, setError);
    if(res){
      navigate("/admin/get-rooms");
      toast.success("Room added..")
    }
  };

  return (
    <><Navbar></Navbar>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6">

      <div className="max-w-2xl mx-auto bg-gray-800 border border-gray-700 rounded-3xl p-8">

        <h1 className="text-3xl font-bold text-white">
          Manage Rooms
        </h1>

        <div className="mt-6 space-y-4">

          <input
            type="text"
            placeholder="Hostel name"
            onChange={(e) => setHostelName(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white"
          />

          <input
            type="string"
            placeholder="wing"
            onChange={(e) => setWing(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white"
          />

          <input
            type="text"
            placeholder="Room Number"
            onChange={(e) => setRoomNumber(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white"
          />

          <input
            type="number"
            placeholder="Capacity"
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white"
          />

          <select
          value={gender}
          onChange={(e)=>setGender(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-900 text-white"
          >

          <option value="male">
          Male
          </option>

          <option value="female">
          Female
          </option>

          </select>
          <input
            placeholder="Warden Name"
            onChange={(e)=>setWardenName(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-900 text-white"
            />


            <input
            placeholder="Warden Contact number"
            onChange={(e)=>setWardenPhone(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-900 text-white"
            />

            <input
            placeholder="Warden email"
            onChange={(e)=>setWardenEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-900 text-white"
            />

          <button
            onClick={handleAddRoom}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
          >
            Add Room
          </button>

        </div>

      </div>

    </div>
    </>
  );
};

export default AdminRooms;