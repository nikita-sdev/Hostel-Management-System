import { Link,useNavigate } from "react-router-dom";

const Navbar=()=>{

const navigate=useNavigate();

const user=JSON.parse(localStorage.getItem("user"));

const logout=()=>{
localStorage.removeItem("token");
localStorage.removeItem("user");
navigate("/login");
}

return(
<nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">

<h1 className="text-xl font-bold text-white">
Hostel Portal
</h1>


<div className="flex gap-6 items-center text-gray-300">

{
user?.role==="student" && 
<>
<Link 
className="hover:text-white"
to="/student/home">
Home
</Link>

<Link 
className="hover:text-white"
to="/student/request">
Apply
</Link>

<Link 
className="hover:text-white"
to="/my-requests">
Requests
</Link>
</>
}


{
user?.role==="admin" &&
<>
<Link
className="hover:text-white"
to="/admin/home">
Dashboard
</Link>

<Link
className="hover:text-white"
to="/admin/requests">
Requests
</Link>

<Link
className="hover:text-white"
to="/admin/get-rooms">
Rooms
</Link>
</>
}


<button
onClick={logout}
className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
>
Logout
</button>


</div>

</nav>
)

}

export default Navbar;