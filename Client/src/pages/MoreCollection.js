import React, { useState, useEffect } from 'react'
import Collections_Card from '../Components/Collections_Card';
import axios from 'axios';
import Pagination from '../Components/Pagination';
const MoreCollection = () => {
  window.scrollTo(0, 0)

  
 
  const [currentPage, setCurrentPage] = useState(1);
const [recordsPerPage] = useState(12);

const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;







  const [cat,setCat]=useState("All");
  const [collection,setCollection]=useState([])
const currentRecords = collection.slice(indexOfFirstRecord, 
    indexOfLastRecord);
    const nPages = Math.ceil(collection.length / recordsPerPage)
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}/api/collection/`,{
          headers:{
            "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
          }
        }).then((res)=>setCollection(res.data))
     },[])
   
     const collectionCard=currentRecords.filter(el=>{
    if(el.category===cat){
      return el
    }
    else if(cat==="All"){
      return el
    }
  }).map(el=>{
    return <Collections_Card
    key={el.id}
    id={el.id}
    category={el.category}
    title={el.title}
    description={el.description}
    banner={el.banner}
    />
  })

  return (
    <section className="collections" id="Collection">
      <h1 className="Collections_heading">
          Our Latest Collections
        </h1>
      <div className="collection-content">
        {/* collection tabs */}
      <div className="tabs">
        <form action="route" method="post"  onChange={(e)=>{
           setCat(e.target.value);
          }}>
            <label htmlFor="All" className="div">
          <div>
            All
            
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
      {collectionCard}
      </div>
      <Pagination
    nPages={nPages}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
/>
      </div>
      
    </section>
  )

}


export default MoreCollection