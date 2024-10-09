import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom"
import LogoutIcon from '@mui/icons-material/Logout';
import DressIcon from '../../assets/wedding-dress-icon.png'
import DressIcon2 from '../../assets/wedding-dress2-icon.png'
import BlogIcon from '../../assets/blog-icon.png'
import Managepost from '../../assets/manage-post.png'
import PostBlogIcon from '../../assets/blogger-icon.png'
import CalendarIcon from '../../assets/calendar.png'
import BookIcon from '@mui/icons-material/Book';
function Dashboard() {
  const [data, setData] = useState({
    collection: 0,
    blog: 0,
  });
  let reftoken
//   const getReftoken = () => {
//     reftoken = document.cookie
//         .split('; ')
//         .find(row => row.startsWith('refresh_token='))
//         ?.split('=')[1];
//     return reftoken || '';
// };
const getCsrfToken = () => {
  const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1];
  return cookieValue || '';
};

useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/collection/`,{
        headers:{
          "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
        }
      })
      .then((res) => {
        setData((prev) => {
          return {
            ...prev,
            collection: res.data && res.data.length,
          };
        });
      })
      .catch((err) => console.log(err));
    axios
      .get(`${process.env.REACT_APP_URL}/api/blog/`,{
        headers:{
          "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
        }
      })
      .then((res) => {
        setData((prev) => {
          return {
            ...prev,
            blog: res.data && res.data.length,
          };
        });
      })
      .catch((err) => console.log(err));
  }, []);
  const navigate = useNavigate();
  // const handleLogout = () => {
  
  //   sessionStorage.removeItem('user');
  //   navigate('/adminauth')

  // };

  useEffect(()=>{

    const reftoken = document.cookie
        .split('; ')
        .find(row => row.startsWith('refresh_token='))
        ?.split('=')[1];
    const acstoken = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];
// console.log(reftoken);
// console.log(acstoken);

    const authUser=async ()=>{

      await axios.post(`${process.env.REACT_APP_URL}/api/token/refresh/`,{refresh:reftoken},{headers:{
        'X-CSRFToken': getCsrfToken(),
        "Authorization":`Bearer ${acstoken}`
      }}).then(res=>{
        document.cookie=`access_token=${res.data.access}`
        document.cookie=`refresh_token=${res.data.refresh}`
        return console.log(res);
      }).catch(err=>{
        if(err.response.status===401 || err.response.status===400){
          navigate("/adminauth")
        }
      })
    }

    authUser()
  },[])
  return (
    <div className="dashboard-body">
      <div className="dashboard-top">

      <Link to="/morecollections" className="dash-card">
        <img src={DressIcon} alt="wedding dress" style={{width:"10%",minWidth:"60px", filter:"invert(1)"}} />
        <h1>Collections</h1>
        <h3>{data.collection}</h3>
      </Link>
      <Link to="/moreblogs" className="dash-card">
      <img src={BlogIcon} alt="Blog icon" style={{width:"10%",minWidth:"60px", filter:"invert(1)"}} />
        <h1>Blogs</h1>
        <h3>{data.blog}</h3>
      </Link>
      </div>
      <Link to="/postcollection" className="dash-card">
      <img src={DressIcon2} alt="wedding dress" style={{width:"10%",minWidth:"60px", filter:"invert(1)"}} />
        <h1>Post Collection</h1>
      </Link>
      <Link to="/postblog" className="dash-card">
      <img src={PostBlogIcon} alt="Blog icon" style={{width:"10%",minWidth:"60px", filter:"invert(1)"}} />
        <h1>Post Blog</h1>
      </Link>
      <Link to="/myappointments" className="dash-card">
      <img src={CalendarIcon} alt="Blog icon" style={{width:"10%",minWidth:"60px", filter:"invert(1)"}} />
        <h1>My Appointment</h1>
      </Link>
      <Link to="/managepost" className="dash-card">
      <img src={Managepost} alt="Blog icon" style={{width:"10%",minWidth:"60px", filter:"invert(1)"}} />

        <h1>Manage Posts</h1>
      </Link>
      
      </div>
    
  );
}

export default Dashboard;
