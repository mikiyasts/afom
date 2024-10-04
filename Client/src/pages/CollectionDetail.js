import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Collections_Card from "../Components/Collections_Card";
import axios from "axios";
import '../CollectionDetail.css'
import Pagination from "../Components/Pagination";

function CollectionDetail() {
  window.scrollTo(0, 0)


  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(6);
  
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const [collection, setCollection] = useState({});
  const [related,setRelated]=useState([])
  const { id } = useParams();
  const fetchcollection = async () => {
    await axios
    .get(`${process.env.REACT_APP_URL}/api/collection/${id}/`,{
      headers:{
        "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
      }
    })
    .then((res) => setCollection(res.data))
    .catch((err) => console.log(err));
    
  };
  useEffect(() => {
    fetchcollection();
    // setActiveImage(collection && collection.banner && collection.banner);
    
       
  }, []);

  useEffect(()=>{
    setActiveImage(collection && collection.banner && collection.banner)
  },[collection])

  // const fetchactive= async ()=>{
    
  //   await collection && collection.banner && setActiveImage(collection.banner);
  // }
  const fetchRelated=async ()=>{
    await axios.get(`${process.env.REACT_APP_URL}/api/collection/`,{
      headers:{
        "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
      }
    }).then(res=>{
      const data=res.data;
      const filtered=data.filter(el=>el.category===collection.category? el:null)
      return setRelated(filtered)
      
    } 
    ).catch(err=>console.log(err))

}
useEffect(()=>{
  fetchRelated()
},[collection])

const [activeImage,setActiveImage]=useState(collection && collection.banner && collection.banner)
  const currentRecords = related.slice(indexOfFirstRecord, 
    indexOfLastRecord);
    const nPages = Math.ceil(related.length / recordsPerPage)

  const relatedcard=currentRecords.map(el=>{
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
    <div className="collection_detail_body">
      <section className="collection-detail-header"><h1>{collection.category}.</h1></section>
      <section className="collection-detail-main">
        <div className="collection-detail-main_left">
          {collection.banner && <img src={`${process.env.REACT_APP_URL}/Server${collection.banner}`}  onClick={()=>setActiveImage(collection.banner)}alt="right" className="collection-main-detail_img-side" /> }
          {collection.left && <img src={`${process.env.REACT_APP_URL}/Server${collection.left}`}  onClick={()=>setActiveImage(collection.left)}alt="right" className="collection-main-detail_img-side" /> }
          {collection.right && <img src={`${process.env.REACT_APP_URL}/Server${collection.right}`}  onClick={()=>setActiveImage(collection.right)}alt="right" className="collection-main-detail_img-side" /> }
          {collection.back && <img src={`${process.env.REACT_APP_URL}/Server${collection.back}`}  onClick={()=>setActiveImage(collection.back)}alt="right" className="collection-main-detail_img-side" /> }
           
           {/* <img src={`${process.env.REACT_APP_URL}/Server${collection.banner}`} alt="left" className="collection-main-detail_img-side" /> 
           <img src={`${process.env.REACT_APP_URL}/Server${collection.banner}`} alt="front" className="collection-main-detail_img-side" />  */}
           </div>
        <div className="collection-detail-main_middle">
          {activeImage && <img src={`${process.env.REACT_APP_URL}/Server${activeImage}`} alt="full-view" className="collection-main-detail_image_full"/>}
          
          
        </div>
        <div className="collection-detail-main_right">
          <div className="collection-detail-main_right_header"><h1>{collection.title}</h1></div>
          
          <div className="material">
            <p>Material</p>
          </div>
          <div className="material_Desc">
            <p>{collection.material}</p>
          </div>
        </div>
      </section>
      <section className="collection-detail-description">
        <div className="detail-desc-head">Description</div>
        <p className="description">
          {collection.description}
        </p>
      </section>
      <section className="related-collection">
        <h3 className="related-collection-head">Related Collections</h3>
        <div className="related-cards">
          {relatedcard}
        </div>
        <div className="related-pagination">

        <Pagination
    nPages={nPages}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
/>
        </div>
      </section>
    </div>
  );
}

export default CollectionDetail;
