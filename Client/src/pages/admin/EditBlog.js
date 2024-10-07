import React, {  useState, useEffect } from 'react'
import { Quill } from 'react-quill';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios"
import Success from "../../assets/Success.gif"
import Error from "../../assets/Error.gif"
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import Loader from '../../Components/Loader';



function EditBlog() {


  const [loadingStatus,setLoadingStatus]=useState("Done")

    const {id}=useParams()
  const navigate=useNavigate()
    

    const [blog, setBlog] = useState({
        id: '',
        category: '',
        title: '',
        author: 1,
        blog_post: '',
        banner: '',
        status: 0, // Assuming status is a number
        date_added: new Date(), // Assuming date_added is a Date object
        date_updated: new Date(), // Assuming date_updated is a Date object
      });

      const [updatedBlog,setUpdatedBlog]=useState({})

       /*getting collection with id*/

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}/api/blog/${id}/`,{
          headers:{
            "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
          }
        }).then(res=>setBlog(res.data)).catch(err=>console.log("err",err))
    },[])
    useEffect(()=>{

        setTimeout(()=>{
            setBlog(prev=>{
                return {
                    ...prev,
                }
            })
        },500)
    },[])
    

  const date=new Date()
  const [success,setSuccess]=useState(false)
  const [error,setError]=useState(false)
  Quill.register('modules/imageResize', ImageResize);

  const  modules  = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
    ],
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize']
   }
};



const getCsrfToken = () => {
  const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1];
  return cookieValue || '';
};
useEffect(()=>{

  const reftoken = document.cookie
      .split('; ')
      .find(row => row.startsWith('refresh_token='))
      ?.split('=')[1];
  const acstoken = document.cookie
      .split('; ')
      .find(row => row.startsWith('access_token='))
      ?.split('=')[1];
// console.log(reftoken);
// console.log(acstoken);

  const authUser=async ()=>{

    await axios.post(`${process.env.REACT_APP_URL}/api/token/refresh/`,{refresh:reftoken},{headers:{
      'X-CSRFToken': getCsrfToken(),
      "Authorization":`Bearer ${acstoken}`
    }}).then(res=>{
      document.cookie=`access_token=${res.data.access}`
      document.cookie=`refresh_token=${res.data.refresh}`
      return console.log(res);
    }).catch(err=>{
      if(err.response.status===401 || err.response.status===400){
        navigate("/adminauth")
      }
    })
  }

  authUser()
},[])




const setQuill=(e)=>{
  setBlog(prev=>{
    return {
      ...prev,
      "blog_post":e
    }
  })
  setUpdatedBlog (prev=>{
    return {
        ...prev,
        category:blog.category,
        title:blog.title,
        author:blog.author,
        blog_post:blog.blog_post
    }
  })
}



const updatePost=(e)=>{
    setBlog (prev=>{
      return {
        ...prev,
        [e.target.name]:e.target.type!=="file"?e.target.value:e.target.files[0]
      }
    })
    setUpdatedBlog (prev=>{
      return {
          ...prev,
          category:blog.category,
          title:blog.title,
          author:blog.author,
          blog_post:blog.blog_post,
        [e.target.name]:e.target.type!=="file"?e.target.value:e.target.files[0],
        date_added: new Date(), // Assuming date_added is a Date object
        date_updated: new Date() // Assuming date_updated is a Date object
      }
    })
  }

const postBlog=async (e)=>{
    e.preventDefault();
  setLoadingStatus("Loading")

    await axios.post(`${process.env.REACT_APP_URL}/api/blog-update/${id}/`,updatedBlog,{
      headers:{
        'Content-Type': 'multipart/form-data',
        "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
      }
    }).then(res=>{
      setSuccess(true)
    }
    ).catch(err=>{
      console.log(err) 
     return setError(true)
    }
    )
  }






  return (
    <div className='collection-post-body'>
      <form className="collection-post-form" onChange={updatePost} onSubmit={postBlog}>
      <h1 className="collection-post-header">Post a Blog</h1>
        <div className="form_field">
            <div className="contact_info">
          {/* <label htmlFor="category">Category:</label> */}
          <select name="category" id="category" className="input" value={blog.category}>
            <option value="">Select Category</option>
            <option value="wedding">Wedding</option>
            <option value="dinner">Dinner</option>
            <option value="graduation">Graduation</option>
          </select>
        </div>
        
          <div className="contact_info">
            <input
              className="input"
              type="text"
              id="title"
              name='title'
              placeholder="Title"
              value={blog.title}
            />
            <hr className="hr" />
          </div>
          
        <div className="contact_info" style={{width:"100%"}}>
          <label htmlFor="banner" className="input" style={{width:"100%", display:"block"}}>{blog.banner && blog.banner.name ? blog.banner.name:<p>Select Banner Photo</p>}</label>
          <input type="file" name="banner" id="banner"  hidden/>
             <hr className="hr" />
          </div>
          <div className="text-editor" style={{minHeight:"fit-content",height:"300px",marginBlock:"2rem"}}>

        <ReactQuill style={{minHeight:"fit-content",height:"100%"}}  modules={modules} theme="snow" type='text' name='blog_post' onChange={setQuill} readOnly={false} value={blog.blog_post} />
          </div>

          {loadingStatus==="Loading"?<button type="submit" disabled className="watch_more send_mail"><Loader/></button>:<input type="submit"  className="watch_more send_mail" />}
        </div>
        

        {
        success &&
        <dialog id="pop-success"  className={`post-dialog ${success && "dialog-active"}`}>
          <div className="close-dialog" onClick={()=>{
            window.location.replace('/managepost')
          }}><CloseIcon/></div>
          <img src={Success} alt="Success" style={{width:"50%"}} />
          <p style={{color:"#5cb85c", fontSize:"22px"}}>Success : &#41;</p>
        </dialog>

      }

  
      {
         error &&
         <dialog id="pop-error" className={`post-dialog ${error && "dialog-active"}`}>
           <div className="close-dialog" onClick={()=>setError(false)}><CloseIcon/></div>
           <img src={Error} alt="Error" style={{width:"50%"}} />
           <p style={{color:"red", fontSize:"22px"}}>Error Please Try Again !!</p>
       </dialog>
      }
      </form>
    </div>
  )
}

export default EditBlog
