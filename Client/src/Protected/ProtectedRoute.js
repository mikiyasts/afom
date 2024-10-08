import React, { useState,useEffect} from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AdminContext } from '../Context/AuthContext'
import axios from 'axios'

function ProtectedRoute() {

    const {isAuth,setIsAuth}=useContext(AdminContext)
    const [Loading,setLoading]=useState(true)
    const navigate=useNavigate()
    console.log(isAuth)




    const getCsrfToken = () => {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    return cookieValue || '';
  };
  useEffect(()=>{

    const reftoken = document.cookie
        .split('; ')
        .find(row => row.startsWith('refresh_token='))
        ?.split('=')[1];
    const acstoken = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];

    const authUser=async ()=>{

      await axios.post(`${process.env.REACT_APP_URL}/api/token/refresh/`,{refresh:reftoken},{headers:{
        'X-CSRFToken': getCsrfToken(),
        "Authorization":`Bearer ${acstoken}`
      }}).then(res=>{
        document.cookie=`access_token=${res.data.access}`
        document.cookie=`refresh_token=${res.data.refresh}`
        setIsAuth(true)
        return console.log(res);
      }).catch(err=>{
        if(err.response.status===401 || err.response.status===400){
          navigate("/adminauth")
        }
      })
    }

    authUser()
  },[])

    setTimeout(()=>{
        setLoading(false)
    },3000)

    if(Loading){
        return <h1>loading</h1>
    }else{

        return isAuth? <Outlet/> : <Navigate to="/adminauth"/>
    }
    
  
}

export default ProtectedRoute
