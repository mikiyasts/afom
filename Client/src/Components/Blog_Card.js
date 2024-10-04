import React from 'react'
import img2 from "../assets/bride-BW.jpg"
import { useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { BiCalendarAlt } from "react-icons/bi";

function Blog_Card(props) {
  const navigate=useNavigate()
  const detail=()=>{
    navigate(`/blogs/${props.id}`)
  }

  const date= props.date
  const splitdate=date.split('T');
  

  return (
    
    <div className='blog_card' onClick={detail}>
       <img src={`${process.env.REACT_APP_URL}/Server${props.img}`}  alt={`${props.cat}`} className='blog_img' />
       <div className='blog_cont'>
        <div className='blog_cat'><p style={{color:"black"}}>{props.cat}</p></div>
        <div className='blog_des'><p style={{color:"black",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}> {props.tit}</p></div>
        <div className='blog_info'>
            <div className='blog_host' style={{color:"black"}}><BiUser className='blog_icon' fill='black'/>{props.auth}</div>
            <div className='blog_date' style={{color:"black"}}><BiCalendarAlt className='blog_icon' fill='black'/>{splitdate[0]}</div>
        </div>
       
   </div>
      
    </div>
  )
}

export default Blog_Card
