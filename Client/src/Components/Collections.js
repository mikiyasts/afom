import React from 'react'
import Collections_Card from './Collections_Card'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Collections = () => {
  let collectionCounter=0
  const [cat,setCat]=useState("All");
  const [collection,setCollection]=useState([])
  
  useEffect(()=>{
     axios.get(`${process.env.REACT_APP_URL}/api/collection/`,{
      headers:{
        "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
      }
    }).then((res)=>setCollection(res.data))
  },[])

  const collectionCard=collection.filter(el=>{
    if(el.category===cat){
      return el
    }
    else if(cat==="All"){
      return el
    }
  }).map(el=>{
    collectionCounter++;
    if (collectionCounter>2){
      return null;
    }else{
       return <Collections_Card
    key={el.id}
    id={el.id}
    category={el.category}
    title={el.title}
    description={el.description}
    banner={el.banner}
    />
    }
   
  })

  return (
    <section className="collections" id="Collection">
      <h1 className="Collections_heading">
          Latest Collections
        </h1>
      <div className="collection-content">
        {/* collection tabs */}
      <div className="tabs">
        <form action="route" method="post"  onChange={(e)=>{
           setCat(e.target.value);
          }}>
            <label htmlFor="All" className="div">
          <div>
            Recent
            
            <input type="radio" hidden name="tab" value="All" id="All" />
          </div>
          </label>
            <label htmlFor="graduation" className="div">
           <div>
            graduation
            <input type="radio" hidden name="tab" value="graduation" id="graduation" />
          </div>
            </label>

            <label htmlFor="wedding" className="div">
          <div>
              wedding
            <input type="radio" hidden name="tab" value="wedding" id="wedding" />
          </div>
            </label>
            <label htmlFor="dinner" className="div">
          <div>
              dinner
            <input type="radio" hidden name="tab" value="dinner" id="dinner" />
          </div>
            </label>
       
        </form>      
      </div>
      {/* collection tabs */}
      <div className="collection_card_container">
        {collection?collectionCard:<h1 style={{width:"100%", height:"100%"}}>Loading</h1>}
        <div className='collection_card'> 
            <h1>DISCOVER OUR LATEST COLLECTIONS</h1>
          <p>Created to bring your bridal dreams to life. All our gowns are designed in London, and brought to life by our experienced team of artisans. Take a look at our most recent collections</p>
        <Link className="watch_more" to="/morecollections"> <div className='unlink'>Watch More</div></Link>
          </div>
      </div>
     
      </div>
      

    </section>
  )
}

export default Collections
