import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './Card'
import { Link } from 'react-router-dom'

function Blog() {

  const [blogs,setBlogs]=useState([])
  let index_1
  let index_2
  let index_3
  let count=0
  const loadDom=()=>{
    index_1=document.querySelector(".index-1")
    index_2=document.querySelector(".index-2")
    index_3=document.querySelector(".index-3")
  }

  const fetchBlog=async ()=>{
    await axios.get(`${process.env.REACT_APP_URL}/api/blog/`,{
      headers:{
        "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
      }
    }).then((res)=>setBlogs(res.data)).catch(err=>console.log("err",err))
  }
  
  useEffect(()=>{
      fetchBlog()
  },[])

//loading the Dom after Blog data is populated

useEffect(()=>{
  loadDom()
  if(blogs.length>0){

    const timer=setInterval(()=>{
      if(count===0){
        index_1.style.left="50%"
        index_1.style.zIndex="3"
        index_1.style.height="450px"
        index_1.style.width="20%"
        index_1.style.minWidth="250px"
        
        index_2.style.left="65%"
        index_2.style.zIndex="1"
        index_2.style.height="250px"
        index_2.style.minWidth="250px"
        index_2.style.width="15%"

        index_3.style.left="35%"
        index_3.style.zIndex="1"
        index_3.style.height="250px"
        index_3.style.minWidth="250px"
        index_3.style.width="15%"
        
    }
    if(count===1){
      index_1.style.left="65%"
        index_1.style.zIndex="1"
        index_1.style.height="250px"
        index_1.style.minWidth="250px"
        index_1.style.width="15%"
        
        index_2.style.left="35%"
        index_2.style.zIndex="1"
        index_2.style.height="250px"
        index_2.style.minWidth="250px"
        index_2.style.width="15%"
        
        index_3.style.left="50%"
        index_3.style.zIndex="3"
        index_3.style.height="450px"
        index_3.style.width="20%"
        index_3.style.minWidth="250px"
        
    }
    if(count===2){
      index_1.style.left="35%"
        index_1.style.zIndex="1"
        index_1.style.height="250px"
        index_1.style.minWidth="250px"
        index_1.style.width="15%"
        
        index_2.style.zIndex="3"
        index_2.style.left="50%"
        index_2.style.height="450px"
        index_2.style.width="20%"
        index_2.style.minWidth="250px"
        
        index_3.style.left="65%"
        index_3.style.zIndex="1"
        index_3.style.height="250px"
        index_3.style.minWidth="250px"
        index_3.style.width="15%"
        
        return count=0
        
      }
      count++;
    },3000)
  }

// return clearInterval(timer)
},[blogs])


let blogCounter=0



// mapping the Blog Cards
const cards=blogs.map(el=>{
  blogCounter++
  if (blogCounter>3){
    return null
  }
  else
  return(
    <Card
    key={el.id}
    id={el.id}
    image={el.banner}
    category={el.category}
    title={el.title}
    count={blogCounter}

    />
  )
})
  return (
    <div className='blog-section' id="Blog">
       <div className="blogs_header">
        <h1 className="blog_heading">
          latest Blog & news
        </h1>
      </div>
      {cards}

      {blogCounter>3?<Link to="/moreblogs" className='watch' style={{paddingInline:"1rem",position:"absolute",left:"50%",bottom:"1rem",transform:"translate3d(-50%,0,0)",color:"white",zIndex:"100",backgroundColor:"#000000",color:"#f2f2f2"}}><div className="watch_more" style={{color:"#f2f2f2"}}>Watch More</div></Link>:null}

    </div>
  )
}

export default Blog
