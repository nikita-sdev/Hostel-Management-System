const BASE_URL= "https://hostel-management-system-dyi4.onrender.com";

// accomodation request

export const addStudentRequest= async(collegeName,eventName, gender, arrivalDate, departureDate, phoneNumber,setError)=>{
  const token= localStorage.getItem("token");

  const res= await fetch(`${BASE_URL}/student/request`,
    {
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`
      },
      body: JSON.stringify({collegeName,eventName, gender, arrivalDate, departureDate, phoneNumber})
    }
  );

  const data= await res.json();

  if(res.ok){
    return data;
  }else{
    console.log(data.msg);
    setError(data.msg);
  }
}

// get student request status

export const getStudentRequest=async(setError)=>{
  const token= localStorage.getItem("token");

  const res= await fetch(`${BASE_URL}/my-requests`,
    {
      method:"GET",
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
  )
  const data= await res.json();
  if(res.ok){
    console.log(data.requests);
    return data;
  }else{
    setError(data.msg);
  }
}


export const getLatestRequest= async()=>{
  const token= localStorage.getItem("token");

  const res= await fetch(`${BASE_URL}/student/home`,
    {
      method:"GET",
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
  )
  const data= await res.json();
  if(res.ok){
    return data;
  }else{
    console.log(data.msg);
  } 
}

export const cancleRequest= async(id)=>{
  const token= localStorage.getItem("token");

  const res= await fetch(`${BASE_URL}/my-requests/${id}`,
    {
      method:"DELETE",
      headers:{
        Authorization: `Bearer ${token}`
      },
    }
  )
  const data= await res.json();
  if(res.ok){
    return true;
  }else{
    console.log(data.msg);
    return false;
  } 
}