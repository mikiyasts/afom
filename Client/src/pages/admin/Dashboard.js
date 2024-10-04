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
  const handleLogout = () => {
  
    sessionStorage.removeItem('user');
    navigate('/adminauth')

  };

  useEffect(()=>{
    if(!sessionStorage.getItem('user')) {

    navigate('/adminauth');

  }
  })
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
