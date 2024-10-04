import React, { useState, useEffect } from "react";
import axios from "axios";
import Blog_Card from "../Components/Blog_Card"
import { CiSearch } from "react-icons/ci";
import Pagination from "../Components/Pagination";
function MoreBlog() {
    window.scrollTo(0, 0)
  const [moreBlog, setMoreBlog] = useState([]);
  const [searchTerm,setSearchTerm]=useState("")
  const [currentPage, setCurrentPage] = useState(1);
const [recordsPerPage] = useState(9);

const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/api/blog/`,{
      headers:{
        "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
      }
    }).then((res) => setMoreBlog(res.data));
  }, []);

  const currentRecords = moreBlog.slice(indexOfFirstRecord, 
    indexOfLastRecord);
    const nPages = Math.ceil(moreBlog.length / recordsPerPage)

  const card=currentRecords.filter(el=>{
    if(searchTerm){
      return el.category.toLowerCase().includes(searchTerm.toLowerCase())
    }
    else if(searchTerm=="" || null){
      return el
    }
  }).map(el=><Blog_Card
          key={el.id}
          id={el.id}
          cat={el.category}
          tit={el.title}
          auth={el.author}
          date={el.date_updated}
          img={el.banner}
        />)
//   const blogCard = Blog.map((el) => (
//     <Blog_Card
//       key={el.id}
//       id={el.id}
//       cat={el.category}
//       tit={el.title}
//       auth={el.author}
//       date={el.date_updated}
//       img={el.banner}
//     />
//   ));
const Search=(e)=>{
  setSearchTerm(e.target.value)
}
  return (
    <div className="more-blog-main">
      <from className="search">
        <div className="input-ctrl">
          <div className="input-search-ctrl">
            <input type="text" className="search" id="search" value={searchTerm} onChange={Search} placeholder="Search"/>
            <div className="search-icon"><CiSearch Fill="white" style={{color:"white", fontSize:"25px"}}/></div>
          </div>
        </div>
      </from>
      <h1 className="more-blog-header">Our Blogs & News</h1>
      <div className="more-blog-container">
        {/* {blogCard} */}
        {card.length===0?<h1 className="no-items">No Items Were Found</h1>:card}
        
      </div>
      <Pagination
    nPages={nPages}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
/>
    </div>
  );
}

export default MoreBlog;
