const BASE_URL= "http://localhost:3000";

export const getAdminStats= async()=>{
  const token= localStorage.getItem("token");
  const res= await fetch(`${BASE_URL}/admin/home`,
    {
      method:"GET",
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  )
  const data= await res.json();
  if(res.ok){
    return data;
  }else{
    setError(data.msg);
  }
}

export const getAllRequests= async(setError)=>{
  const token= localStorage.getItem("token");
  const res= await fetch(`${BASE_URL}/admin/requests`, 
    {
      method:"GET",

      headers:{
        Authorization: `Bearer ${token}`,
      }
    }
  )

  const data= await res.json();
  if(data){
    return data;
  }
  else{
    setError(data.msg);
  }
}

export const updateRequestStatus= async(id,status,  setError)=>{
  const token= localStorage.getItem("token");

  const res= await fetch(`${BASE_URL}/admin/${status}/${id}`,
    {
      method:"PUT",
      headers:{
        Authorization:`Bearer ${token}`
      },
      body: JSON.stringify({
      status
      })
    }
  )
  const data= await res.json();

  if(res.ok){
    return data
  }else{
    setError(data.msg);
  }
}

export const addRoomsToServer= async(hostelName,wing,roomNumber,capacity, gender,wardenName, wardenPhone, wardenEmail, setError)=>{
  const token= localStorage.getItem("token");
  const res= await fetch(`${BASE_URL}/admin/rooms`,
    {
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({hostelName,wing,roomNumber,capacity, gender, warden:{name: wardenName, phone:wardenPhone, email:wardenEmail}}),
    }
  )

  const data= await res.json();
  if(res.ok){

    return data;
  }else{
    setError(res.msg);
  }
}

export const getAllRooms= async(setError)=>{
  const token= localStorage.getItem("token");
  const res= await fetch(`${BASE_URL}/admin/get-rooms`, 
    {
      method:"GET",

      headers:{
        Authorization: `Bearer ${token}`,
      }
    }
  )

  const data= await res.json();
  if(res.ok){
    return data;
  }
  else{
    setError(data.msg);
  }
}

export const assignRoom= async(id, roomNumber,setError)=>{
  const token= localStorage.getItem("token");
  const res= await fetch(`${BASE_URL}/admin/assign-room/${id}`, 
    {
      method:"PUT",

      headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({roomNumber : roomNumber})
    }
  )

  const data= await res.json();
  if(res.ok){
    return data;
  }
  else{
    console.log(data.msg)
    setError(data.msg);
  }
}

export const autoAssignRoom = async(id,setError)=>{

const token=localStorage.getItem("token");
const res=await fetch(
`${BASE_URL}/admin/auto-room/${id}`,
{
method:"PUT",
headers:{
Authorization:`Bearer ${token}`
}
}
)
const data=await res.json();
console.log("auto response", data);

if(res.ok){
return data;
}
else{
setError(data.msg);
}

}

export const deleteRoom= async(id)=>{
  const token= localStorage.getItem("token");
  const res= await fetch(`${BASE_URL}/admin/get-rooms/${id}`,{
    method:"DELETE",
    headers:{
      Authorization: `Bearer ${token}`,
    }
  })
  if(res.ok){
    return data;
  }else{
    console.log(data.msg);
  }
}