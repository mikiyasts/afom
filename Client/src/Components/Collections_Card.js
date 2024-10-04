import React from 'react'
import img2 from "../assets/ladymodel3.jpg";
import { useNavigate } from 'react-router-dom';
const Collections_Card = (props) => {

  const navigate=useNavigate();

  const detail=()=>{
    navigate(`/collections/${props.id}`)
  }
  return (
    <div className="collection_card" onClick={detail}>
      <img src={`${process.env.REACT_APP_URL}/Server${props.banner}`} alt={`${props.category}`} className="collection_img"/>

      <div className="collection_des">
          <div className='collection_name'>
            <p className='collection-name-head'>{props.category}</p>
             <p className='collection-name-type'>{props.title}</p>
            </div>

            {/* <div className='collection_year'>
              <h3>2018</h3>
              </div> */}
            


      </div>


      
    </div>
  )
}

export default Collections_Card