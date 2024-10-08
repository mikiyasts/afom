import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import logo from '../assets/Logo.png'
import { NavHashLink } from 'react-router-hash-link';
import { AdminContext } from '../Context/AuthContext';
import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';




function Navbar() {
  const navigate = useNavigate()
  const { isAuth, setIsAuth } = useContext(AdminContext)


  const handleLogout = () => {
    setIsAuth(false)
    document.cookie=`access_token=""`
    document.cookie=`refresh_token=""`
    navigate('/adminauth')
  };

  const toggleHum = () => {
    const humburger = document.getElementById('humburger')
    const navbar = document.getElementById('nav_bar')
    const navicon = document.getElementById('navicon')
    navbar.classList.toggle("navactive")
    humburger.classList.toggle("humactive");
    navicon.classList.toggle("naviconactive");

  }

  const navClick = () => {
    const humburger = document.getElementById('humburger')
    const navbar = document.getElementById('nav_bar')
    if (window.innerWidth <= 1040) {
      navbar.classList.remove("navactive")
      humburger.classList.remove("humactive");
    }
  }



  // const getCsrfToken = () => {
  //   const cookieValue = document.cookie
  //     .split('; ')
  //     .find(row => row.startsWith('csrftoken='))
  //     ?.split('=')[1];
  //   return cookieValue || '';
  // };
  // useEffect(() => {

  //   const reftoken = document.cookie
  //     .split('; ')
  //     .find(row => row.startsWith('refresh_token='))
  //     ?.split('=')[1];
  //   const acstoken = document.cookie
  //     .split('; ')
  //     .find(row => row.startsWith('access_token='))
  //     ?.split('=')[1];
  //   // console.log(reftoken);
  //   // console.log(acstoken);

  //   const authUser = async () => {

  //     await axios.post(`${process.env.REACT_APP_URL}/api/token/refresh/`, { refresh: reftoken }, {
  //       headers: {
  //         'X-CSRFToken': getCsrfToken(),
  //         "Authorization": `Bearer ${acstoken}`
  //       }
  //     }).then(res => {
  //       setIsAuth(true)
  //       return console.log(res);
  //     }).catch(err => {
  //       console.log(err);
        
  //       if (err.response && err.response.status === 401 || err.response && err.response.status === 400) {
  //         setIsAuth(false)
  //       }
  //     })
  //   }

  //   authUser()
  // }, [])


  return (
    <section className='nav_bar' id="nav_bar">
      <div className="humburger" id="humburger" onClick={toggleHum}>
        <KeyboardArrowRightIcon id="navicon" fill="white" sx={{ color: "white", fontSize: "40px" }} />
      </div>
      <div className='nav' >
        <div>
          <a href="/"><img className='logo' src={logo} alt="afom-logo" /></a>
        </div>

        <div className='navigation' >
          {!isAuth &&
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
      {!isAuth &&

        <div className='social_links'>


          <div className="circle-social">
            <div className="circleback">
            </div>
            <div className="circlefront">
              <NavHashLink to="https://www.instagram.com/_afom/?hl=en" target='_blank'> <AiFillInstagram className='social_link contact_socials' /> </NavHashLink>
            </div>
          </div>

          <div className="circle-social">
            <div className="circleback">
            </div>
            <div className="circlefront">
              <NavHashLink to="#"><BsFacebook className='social_link contact_socials' /> </NavHashLink>
            </div>
          </div>

          <div className="circle-social">
            <div className="circleback">
            </div>
            <div className="circlefront">
              <NavHashLink to="#" > <FaSquareXTwitter className='social_link contact_socials' /> </NavHashLink>
            </div>

          </div>






        </div>
      }
      {isAuth && <button onClick={handleLogout} className="logout-btn"><LogoutIcon /> Logout</button>}

    </section>

  )
}

export default Navbar
