import React , { useRef, useState } from "react";
import { NavHashLink } from "react-router-hash-link";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
function Contact() {
const [sendstatus,setSendStatus]=useState("Submit")

  const nameRef= useRef(null);
  const emailRef= useRef(null);
  const commentRef= useRef(null);

  const handleSubmit =(e)=> {
    e.preventDefault();

    const data={
      name:nameRef.current.value,
      email:emailRef.current.value,
      comment:commentRef.current.value,
    }
  setSendStatus("Sending...")
    fetch(`${process.env.REACT_APP_URL}/blog/form/`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      credentials:"include",
      body: JSON.stringify(data),
    })
    .then(checkStatus)
    .then((response) => response.json())
    .then((data)=>{
      setTimeout(()=>{

        nameRef.current.value=""
        emailRef.current.value=""
        commentRef.current.value=""
        setSendStatus("Submit")

      },3000)
    })

    .catch((error) => {

    })
    
    }
  function checkStatus(response){
    if(response.ok){
        setSendStatus("Sent")
      
      return response;
    }else{
      throw new Error(response.statusText);

    }
  }


  return (
    <section className="contacts" id="Contact-Us">
      <div className="contact_container">
        <div className="form_main">
          <div className="contact_form">
            <p className="contact_ti">Let us know how we can help</p>
            <form onSubmit={handleSubmit}>
            <div className="form_field">
              <div className="contact_info">
               
                <input className="input" required type="text" ref={nameRef} placeholder="Name" />
                <hr className="hr" />
              </div>
              <div className="contact_info">
             
                <input className="input" type="email" required ref={emailRef}  placeholder="Email"/>
                <hr className="hr" />
              </div>
              <div className="contact_info">
             
              <textarea className="input" required name="" ref={commentRef}  id="" cols="30" rows="4" placeholder="Comment" ></textarea>
             <hr className="hr" />
           </div>
           <input type="submit" value={sendstatus} className='watch_more send_mail'/>
          </div>
          </form>
        </div>
        
      </div>
      <div className="contact_back">
        <h3 className="contact_title"> Find us here </h3>
        <div className="contact_adress contact_location">
          <FaLocationDot />
          <div>Ethiopia,Addis Ababa Zambia avenu</div>
        </div>
        <div className="contact_adress contact_phone">
          <FaPhone />
          <div>+251920550240</div>
        </div>
        <div className="contact_adress contact_email">
          <BiLogoGmail />
          <div className="email-adress">afomdesign@gmail.com</div>
        </div>

        <div className="contact_social">
          <NavHashLink to="https://www.instagram.com/_afom/?hl=en">
            {" "}
            <AiFillInstagram className="contact_socials" />{" "}
          </NavHashLink>
          <NavHashLink to="#">
            {" "}
            <BsFacebook className="contact_socials" />{" "}
          </NavHashLink>
          <NavHashLink to="#">
            {" "}
            <FaSquareXTwitter className="contact_socials" />{" "}
          </NavHashLink>
        </div>
      </div>
      </div>
    </section>
  );
}

export default Contact;
