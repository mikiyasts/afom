import React from 'react'
import logo from '../assets/Logo.png'
import { NavHashLink } from 'react-router-hash-link';

import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
  



function Navbar() {
  const navigate=useNavigate()
  const handleLogout = () => {
    
    sessionStorage.removeItem('user');
    navigate('/adminauth')
  
  };
  const toggleHum=()=>{
    const humburger=document.getElementById('humburger')
    const navbar=document.getElementById('nav_bar')
    const navicon=document.getElementById('navicon')
    navbar.classList.toggle("navactive")
   humburger.classList.toggle("humactive");
   navicon.classList.toggle("naviconactive");
  
  }
  
  const navClick=()=>{
    const humburger=document.getElementById('humburger')
    const navbar=document.getElementById('nav_bar')
    if(window.innerWidth<=1040){
      navbar.classList.remove("navactive")
      humburger.classList.remove("humactive");
    } 
  }

  return (
    <section className='nav_bar' id="nav_bar">
      <div className="humburger" id="humburger" onClick={toggleHum}>
        <KeyboardArrowRightIcon id="navicon" fill="white" sx={{color:"white", fontSize:"40px"}}/>
      </div>
      <div className='nav' >
        <div>
             <a href="/"><img className='logo' src={logo} alt="afom-logo" /></a>
         </div>

         <div className='navigation' >
          {!sessionStorage.getItem("user") &&
           <ul>
            
            <NavHashLink className="li" to="/#Home" onClick={navClick}><div className="nav-front"> <div className="nav-frontfront"> HOME</div></div></NavHashLink>
            <NavHashLink className="li" to="/#About-Us" onClick={navClick}><div className="nav-front"> <div className="nav-frontfront"> ABOUT US</div></div></NavHashLink>
            <NavHashLink className="li" to="/#Collection" onClick={navClick}><div className="nav-front"> <div className="nav-frontfront"> COLLECTION</div></div></NavHashLink>
            <NavHashLink className="li" to="/#Blog" onClick={navClick}><div className="nav-front"> <div className="nav-frontfront"> BLOG</div></div></NavHashLink>
            <NavHashLink className="li" to="/#Faq" onClick={navClick}><div className="nav-front"> <div className="nav-frontfront"> FAQ</div></div></NavHashLink>
            <NavHashLink className="li" to="/#Contact-Us" onClick={navClick}><div className="nav-front"> <div className="nav-frontfront"> CONTACT US</div></div></NavHashLink>
           </ul>
           }
         </div>

      </div>
      {!sessionStorage.getItem("user") &&
      
      <div className='social_links'>
        

      <div className="circle-social">
          <div className="circleback">
          </div>
          <div className="circlefront">
            <NavHashLink to="https://www.instagram.com/_afom/?hl=en" target='_blank'> <AiFillInstagram   className='social_link contact_socials'/> </NavHashLink>
          </div>
        </div>
        
          <div className="circle-social">
          <div className="circleback">
          </div>
          <div className="circlefront">
            <NavHashLink to="#"><BsFacebook  className='social_link contact_socials'/> </NavHashLink>
          </div>
          </div>
        
        <div className="circle-social">
          <div className="circleback">
          </div>
          <div className="circlefront">
              <NavHashLink to="#" > <FaSquareXTwitter   className='social_link contact_socials'/> </NavHashLink>
          </div>
          
        </div>
          
        
           
          
           
           
         </div>
}
         {sessionStorage.getItem('user') && <button onClick={handleLogout} className="logout-btn"><LogoutIcon/> Logout</button>}
      
    </section>
    
  )
}

export default Navbar
