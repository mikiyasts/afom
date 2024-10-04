import React, { useEffect } from "react";
import { useState } from "react";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Link } from "react-router-dom";
function Hero() {
    let hero_image1
    let hero_image2
    let hero_image3
    let hero_image1m
    let hero_image2m
    let hero_image3m
    const loadDom=()=>{
         hero_image1= document.getElementById("hero-image1") && document.getElementById("hero-image1");
  hero_image2 = document.getElementById("hero-image2") && document.getElementById("hero-image2");
   hero_image3= document.getElementById("hero-image3") && document.getElementById("hero-image3");

         hero_image1m= document.getElementById("hero-mobile-bg1") && document.getElementById("hero-mobile-bg1");
  hero_image2m = document.getElementById("hero-mobile-bg2") && document.getElementById("hero-mobile-bg2");
   hero_image3m= document.getElementById("hero-mobile-bg3") && document.getElementById("hero-mobile-bg3");

   
    }
    
    useEffect(()=>{
        loadDom()
    },[])
  
  let status = 0;
  const timer = () => {
    
      status++;
    if (status === 1) {
        if(hero_image1){
            hero_image2.style.zIndex=1;
            hero_image3.style.zIndex=5;
            hero_image1.style.zIndex=-1;
            hero_image1m.style.zIndex=1
            hero_image2m.style.zIndex=3
            hero_image3m.style.zIndex=2
            hero_image1.style.left="96%";
            hero_image2.style.left="30%";
            hero_image3.style.left="63%";
            
        }
    }else if (status === 2) {
        if(hero_image1){
            hero_image1.style.zIndex=1;
            hero_image2.style.zIndex=-3;
            hero_image3.style.zIndex=1;
            hero_image1m.style.zIndex=2
            hero_image2m.style.zIndex=1
            hero_image3m.style.zIndex=3
            hero_image1.style.left="63%";
            hero_image2.style.left="96%";
            hero_image3.style.left="30%";
        }
    }else if (status === 3) {
        if(hero_image1){
            hero_image1.style.zIndex=1;
            hero_image2.style.zIndex=1;
            hero_image3.style.zIndex=-4;
            hero_image1m.style.zIndex=3
            hero_image2m.style.zIndex=2
            hero_image3m.style.zIndex=1
            hero_image1.style.left="30%";
            hero_image2.style.left="63%";
            hero_image3.style.left="96%";
        }
      status = 0;
  }
  };
  setInterval(timer,3000)
  const date=new Date().toDateString()
  const year=date.split(" ");
  
  return (
    <section className="hero" id="Home">
      <div className="hero-left">
        <div className="hero-left_content">
          <p className="collection-year">Best {year[3]}  collection</p>
          <h1 className="slogan">
            elegance is the beauty that never fades
          </h1>
          <p className="company-description">
            Discover the allure of timeless fashion and the embodiment of elegance. Join us in redefining the beauty of individual expression.<br />
            <b>Explore our collection now!</b>
            <br/>
           <Link to="appointment"><button className="book-btn">Book Appointment <LocalMallIcon sx={{fill:"black"}}/></button></Link>
          </p>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-image1" id="hero-image1">
          <div className="hero-image1-background"></div>
        </div>
        <div className="hero-image2" id="hero-image2">
          <div className="hero-image2-background"></div>
        </div>
        <div className="hero-image3" id="hero-image3">
          <div className="hero-image3-background"></div>
          
        </div>
      </div>
      <div className="hero-mobile-bg">
        <div className="hero-mobile-bg1" id="hero-mobile-bg1"></div>
        <div className="hero-mobile-bg2" id="hero-mobile-bg2"></div>
        <div className="hero-mobile-bg3" id="hero-mobile-bg3"></div>
      </div>
    </section>
  );
}

export default Hero;
