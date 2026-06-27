const BASE_URL = "http://localhost:3000";

export const sendOTP= async(email,setError)=>{
  const res= await fetch(`${BASE_URL}/api/auth/get-otp`, 
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({email}),
    }
  )

  const data= await res.json();
  if(res.ok){
    return true;
  }else{
    console.log(res.msg)
    setError(data.msg);
  }
}

export const addLoginToServer= async(email, password, setError, setToken)=>{
  const res= await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email,password})
  })

  const data= await res.json();
  if(res.ok){
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    return data;
  }else{
    setError(data.msg);
  }
}

export const addSignupToServer= async(email,password, name,role,otp, setError)=>{
  const res= await fetch(`${BASE_URL}/api/auth/signup`,{
    method:"POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password,name,role,otp}),
  })

  const data= await res.json();
  if(res.ok){
    return data;
  }else{
    setError(data.msg);
  }
}