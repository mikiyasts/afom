import React from 'react'
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Components/Loader';
import { AdminContext } from '../../Context/AuthContext';


function AdminAuth() {

  const {setIsAuth}=useContext(AdminContext);
  const [username, setUsername] = useState('');
  const navigate=useNavigate()
  const [loginStatus,setLoginStatus]=useState("Login")

  const [password, setPassword] = useState('');
  // const [loginform, Setloginform] = useState({ username: "", password: "" })
  const getCsrfToken = () => {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    return cookieValue || '';
};

  
  // const [authStatus,setAuthstatus]=useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginStatus("Logingin")
    return await axios.post(`${process.env.REACT_APP_URL}/api/token/`,{username,password},{ withCredentials: true ,headers: {
      'X-CSRFToken': getCsrfToken(),
  }})
    .then(res => {
      document.cookie=`access_token=${res.data.access}`
      document.cookie=`refresh_token=${res.data.refresh}`
      setIsAuth(true)
      navigate("/dashboard")
    }).catch(err => {
      setLoginStatus("Login")
      setIsAuth(false)
      console.log(err.response.status)
      if(Number(err.response.status)===401){
        toast.error("Wrong Cridential")
      }
    })
    // console.log(loginform);

  }
  return (
    <div className='admin-body'>
      <div className="toast-conatiner">

          <ToastContainer toastStyle={{color:"black !important"}}/>
      </div>
      <div className="login-card">
        <div className="login-card-header"><h1>Login</h1></div>
        <form className="login-card-body" onSubmit={handleLogin}>
            <div className="username-container">
            
                <label htmlFor="username">Username:</label>
                <input type="text" onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="password-container">
                <label htmlFor="password">Password:</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} required name="password" id="password" value={password} />
            </div>
            <div className="forgot-pas">Forgot Password?</div>
            {loginStatus==="Login"?<button className='login-btn' type="submit" style={{border:"1px solid #f2f2f2"}}>Login</button>:<button className='login-btn' disabled style={{border:"1px solid #f2f2f2",display:"grid",placeItems:"center"}}><Loader/></button>}
            
        </form>
      </div>
    </div>
  )
}

export default AdminAuth
