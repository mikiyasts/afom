import React from 'react'
import "../App.css"
// import Bride from "../assets/bride.jpg"
function Carousel_Card(props) {


  return (
    <div className={`image-card index-${props.count}`} id={`index-${props.count}`}>
    <div className="card-front">
        <div className="collection-detail">
            <h3 className="collection-carousel-title">Bride Night 1</h3>
            <p className="collection-carousel-description">
                 alias sequi! Perspiciatis quasi soluta laborum!
            </p>
        </div>
    </div>
    <div class="card-background"><img src={`${process.env.REACT_APP_URL}/Server${props.img}`} alt="bride1" width="100%" height="100%"/></div>
</div>
)
}

export default Carousel_Card
