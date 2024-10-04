import React from "react";


function Manage_card(props) {

  return (
    <div className="manage_card" style={{backgroundColor:"#000000"}}>
      <div className="option-dots">
        <button className="dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="option">
            <p onClick={()=>props.updatePost(props.id)} style={{color:"#f2f2f2"}}>Edit</p>
            <hr style={{ width: "100%" }} />
            <p onClick={()=>props.deletePost(props.id)} style={{color:"#f2f2f2"}}>Delete</p>
          </div>
        </button>
      </div>
      <img className="banner-image" src={`${process.env.REACT_APP_URL}/Server${props.banner}`} alt="banner" />
      <div className="manage-card-category">
        <p style={{color:"black"}}>{props.category}</p>
      </div>
      <div className="manage-card-title">
        <p style={{color:"black"}}>{props.title}</p>
      </div>
    </div>
  );
}

export default Manage_card;
