import React, { useState,useEffect } from 'react'
import Manage_card from '../../Components/Manage_card'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import { useNavigate } from "react-router-dom"

function Managepost() {
    const [blogs,setBlogs]=useState([])
    const navigate=useNavigate()
    const [collections,setcollections]=useState([])
    const [activeBoard,setActiveboard]=useState("collections")
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}/api/blog/`,{
            headers:{
              "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
            }
          }).then(res=>setBlogs(res.data)).catch(err=>console.log(err))
    },[])
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}/api/collection/`,{
            headers:{
              "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
            }
          }).then(res=>setcollections(res.data)).catch(err=>console.log(err))
    },[])

    const updatePost=(id)=>{
        if(activeBoard==='blogs'){
            navigate(`/managepost/editblog/${id}`)
        }else if(activeBoard==='collections'){
            navigate(`/managepost/editcollection/${id}`)
        }
    }
    const deletePost=(id)=>{
        if(activeBoard==='blogs'){
            axios.delete(`${process.env.REACT_APP_URL}/api/blog-delete/${Number(id)}/`,{
                headers:{
                  "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
                }
              }).then(res=>{
                toast(res.data)
                return axios.get(`${process.env.REACT_APP_URL}/api/blog/`,{
                    headers:{
                      "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
                    }
                  }).then(res=>setBlogs(res.data)).catch(err=>console.log(err))
        }).catch(err=>console.log("err",err))
        }else if(activeBoard==='collections'){
            axios.delete(`${process.env.REACT_APP_URL}/api/collection-delete/${Number(id)}/`,{
                headers:{
                  "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
                }
              }).then(res=>{
                toast(res.data)
                return axios.get(`${process.env.REACT_APP_URL}/api/collection/`,{
                    headers:{
                      "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
                    }
                  }).then(res=>setcollections(res.data)).catch(err=>console.log(err))
        }).catch(err=>console.log("err",err))
        }
    }
    const blogCard=blogs.map(el=><Manage_card
    key={el.id}
    id={el.id}
    category={el.category}
    banner={el.banner}
    title={el.title}
    deletePost={deletePost}
    updatePost={updatePost}
    />)
    const collectionCard=collections.map(el=><Manage_card
    key={el.id}
    id={el.id}
    category={el.category}
    banner={el.banner}
    title={el.title}
    deletePost={deletePost}
    updatePost={updatePost}
    />)


    useEffect(()=>{
        if(!sessionStorage.getItem('user')) {
    
        navigate('/adminauth');
    
      }
      })
    // console.log(blogs);
  return (
    <div className='managepost-body'>
        <div className="toast-conatiner">
        <ToastContainer toastStyle={{color:"black"}}/>
        </div>

        <div className="managepost-header">
            <div className={`toggle toggle-collection ${activeBoard==='collections'&& 'active-board'}`} onClick={()=>setActiveboard("collections")}><h3>Collections</h3></div>
            <div className="spliter"></div>
            <div className={`toggle toggle-blog ${activeBoard==='blogs'&& 'active-board'}`} onClick={()=>setActiveboard("blogs")}><h3>Blogs</h3></div>
        </div>
      {activeBoard==='blogs'?blogCard:collectionCard}
      <Outlet/>
    </div>
  )
}

export default Managepost
