import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../App.css"
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
function BlogDetail() {
  const [detail,setDetail]=useState({__html: ""})
  // const [detail,setDetail]=useState({})
  // const [detailbody,setDetailBody]=useState({__html: ""})
  // const det=
  const {id}=useParams()
  useEffect(() => {
    async function createMarkup() {
      let response;
      response = await fetch(`${process.env.REACT_APP_URL}/view_post/${id}`,{
        headers:{
          "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
        }
      })
      
       const backendHtmlString = await response.text()

      
        return {__html: backendHtmlString};
     }
     createMarkup().then(result => setDetail(result));
  }, []);


  // const fetchDetail=async ()=>{
  //  await axios.get(`${process.env.REACT_APP_URL}/view_post/1`).then(res=>console.log(res)).catch(err=>console.log(err))
  // }
  // useEffect(()=>{
  //   fetchDetail();
   
  // },[])


  return (
    <div class="blog-main">
    <div className="blog-detail-heigt  pages_body " style={{padding:0}} dangerouslySetInnerHTML={detail}/>
    </div>
  )
}

export default BlogDetail

