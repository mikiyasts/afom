import React, {  useState,useEffect } from 'react'
import { Quill } from 'react-quill';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios"
import Success from "../../assets/Success.gif"
import Error from "../../assets/Error.gif"
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom"
import Loader from '../../Components/Loader';
function BlogPost() {
  const date=new Date()
  const [loadingStatus,setLoadingStatus]=useState("Done")
  const navigate=useNavigate()
  const [success,setSuccess]=useState(false)
  const [error,setError]=useState(false)
  Quill.register('modules/imageResize', ImageResize);


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





const updateform=(e)=>{
  setBlog(prev=>{
    return {
      ...prev,
      [e.target.name]:e.target.type!=="file"?e.target.value:e.target.files[0]
    }
  })
}

const setQuill=(e)=>{
  setBlog(prev=>{
    return {
      ...prev,
      "blog_post":e
    }
  })
}


const submitForm=async (e)=>{
  e.preventDefault();
  setLoadingStatus("Loading")
  setBlog(prev=>{
    return {
      ...prev,
      id:uuidv4()
    }
  })

  await axios.post(`${process.env.REACT_APP_URL}/api/blog-create/`,blog, {
    headers:{
    'Content-Type': 'multipart/form-data', // Important!
    "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
  }}).then(res=>{
    setSuccess(true)
  }).catch(err=>{
    setError(true)
    return console.log("err",err);
  }
  )
}
  return (
    <div className="collection-post-body">
      <form className="collection-post-form" onChange={updateform} onSubmit={submitForm}>
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

        <ReactQuill style={{minHeight:"fit-content",height:"100%"}}  modules={modules} theme="snow" type='text' name='blog_post' onChange={setQuill} />
          </div>

          {loadingStatus==="Loading"?<button type="submit" disabled className="watch_more send_mail"><Loader/></button>:<input type="submit"  className="watch_more send_mail" />}
        </div>
        

        {
        success &&
        <dialog id="pop-success"  className={`post-dialog ${success && "dialog-active"}`}>
          <div className="close-dialog" onClick={()=>{
            window.location.reload()
          }}><CloseIcon /></div>
          <img src={Success} alt="Success" style={{width:"50%"}} />
          <p style={{color:"#5cb85c", fontSize:"22px"}}>Success : &#41;</p>
        </dialog>

      }

  
      {
         error &&
         <dialog id="pop-error" className={`post-dialog ${error && "dialog-active"}`}>
           <div className="close-dialog" onClick={()=>setError(false)}><CloseIcon /></div>
           <img src={Error} alt="Error" style={{width:"50%"}} />
           <p style={{color:"red", fontSize:"22px"}}>Error Please Try Again !!</p>
       </dialog>
      }
      </form>
    </div>
  )
}





export default BlogPost
