import React from "react";
import Logo from "../assets/Logo.png";
import { NavHashLink } from "react-router-hash-link";
import Powered from "../assets/bit2.png"
import { CiInstagram } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="footer">
     
      <div className="footer-content">
        <img className="footer-logo" src={Logo} alt="logo" />
        <div className="footer-social_media">
          <div className="footer-icon">
            <NavHashLink to="https://www.instagram.com/_afom/?hl=en"  className="iconn">
              <CiInstagram
                style={{ color: "whiteSmoke", fontSize: "28px" }}
                className="social_link"
              />
            </NavHashLink>
          </div>
          <div className="footer-icon">
            <NavHashLink to=""  className="iconn">
              <CiFacebook
                style={{ color: "whiteSmoke", fontSize: "40px" }}
                className="social_link"
              />
            </NavHashLink>
          </div>
          <div className="footer-icon">
            <NavHashLink to="" className="iconn">
              <FaXTwitter
                style={{ color: "whiteSmoke", fontSize: "28px" }}
                className="social_link"
              />
            </NavHashLink>
          </div>
        </div>
        <div className="footer-nav">
          <ul>
            <NavHashLink to="/#Home" className="fli">
              HOME
            </NavHashLink>
            <NavHashLink to="/#About-Us" className="fli">
              ABOUT US
            </NavHashLink>
            <NavHashLink to="/#Collection" className="fli">
              COLLECTION
            </NavHashLink>
            <NavHashLink to="/#Blog" className="fli">
              BLOG
            </NavHashLink>
            <NavHashLink to="/#Faq" className="fli">
              FAQ
            </NavHashLink>
            <NavHashLink to="/#Contact-Us" className="fli">
              CONTACT US
            </NavHashLink>
          </ul>
          <div className="copy-right">
       <div className="copy-right-year"> &copy; 2024 AFOM BRIDAL COLLECTION</div>
        
      </div>
        </div>
      </div>
      
    </footer>
  );
}

export default Footer;
