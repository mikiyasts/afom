import React from 'react'
import { useNavigate } from 'react-router-dom';

function Card(props) {
    const navigate=useNavigate()
     const detail=()=>{
    navigate(`/blogs/${props.id}`)
  }
  return (
    <div className={`image-card index-${props.count}`} id={`index-${props.count}`} onClick={detail}>
            <div className="card-front">
                <div className="collection-detail">
                    <h2 className="collection-title">{props.title}</h2>
                    <p className="collection-description">
                         {props.title}
                    </p>
                </div>
            </div>
            <div className="card-background"><img src={`${process.env.REACT_APP_URL}/Server${props.image}`} alt="bride1" width="100%" height="100%"/></div>
        </div>  
  )
}

export default Card
