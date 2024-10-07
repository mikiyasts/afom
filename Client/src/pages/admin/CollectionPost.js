import axios from "axios";
import React, { useEffect, useState } from "react";
import Success from "../../assets/Success.gif"
import Error from "../../assets/Error.gif"
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom"
import Loader from "../../Components/Loader";

function CollectionPost() {
  const [loadingStatus,setLoadingStatus]=useState("Done")
  const [success,setSucces]=useState(false)
  const navigate=useNavigate()
  const [error,setError]=useState(false)
  const [collection,setCollection]=useState({
    category:"",
    title:"",
    description:"",
    banner:"",
    right:"",
    left:"",
    back:"",
    material:""
  })

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
  

  const updatePost=(e)=>{
    setCollection(prev=>{
      return {
        ...prev,
        [e.target.name]:e.target.type!=="file"?e.target.value:e.target.files[0]
      }
    })
  }
  const postCollection=async (e)=>{
    e.preventDefault();
    setLoadingStatus("Loading")
    await axios.post(`${process.env.REACT_APP_URL}/api/collection-create/`,collection,{
      headers:{
        'Content-Type': 'multipart/form-data',
        "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
      }
    }).then(res=>{
      setSucces(true)
    }
    ).catch(err=>{
      setError(true)
      return console.log("err",err);
    }
    )
  }

 ;

  return (
    <div className="collection-post-body">
      <form className="collection-post-form" onChange={updatePost} onSubmit={postCollection}>
      <h1 className="collection-post-header">Post a collection</h1>
        <div className="form_field">
            <div className="contact_info">
          {/* <label htmlFor="category">Category:</label> */}
          <select name="category" id="category" className="input" value={collection.category}>
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
              name="title"
              id="title"
              placeholder="Title"
              value={collection.title}
            />
            <hr className="hr" />
          </div>

          <div className="contact_info">
            <textarea
              className="input"
              name="description"
              id=""
              cols="20"
              rows="3"
              value={collection.description}
              placeholder="Description"
            ></textarea>
            <hr className="hr" />
          </div>
          <div className="contact_info">
          <textarea
              className="input"
              name="material"
              id=""
              cols="20"
              rows="3"
              placeholder="Material"
              value={collection.material}
            ></textarea>
            <hr className="hr" />
          </div>
          <div className="contact_info" style={{width:"100%",overflow:"hidden"}}>
            <label htmlFor="banner" className="input" style={{width:"100%", display:"block"}}>{collection.banner?collection.banner.name && collection.banner.name:<p>Select Cover Photo</p>}</label>
             <input type="file" name="banner" id="banner"  hidden/>
             <hr className="hr" />
          </div>
          <div className="contact_info select-image" style={{width:"100%", overflow:"hidden"}}>
          <label htmlFor="back" className="input" style={{width:"100%", display:"block"}} value={collection.back}>{collection.back?collection.back.name && collection.back.name:<p>Select Back Photo</p>}</label>
          <input type="file" name="back" id="back"  hidden/>
             <hr className="hr" />
          </div>
          <div className="contact_info" style={{width:"100%",overflow:"hidden"}}>
          <label htmlFor="right" className="input" style={{width:"100%", display:"block"}}>{collection.right?collection.right.name && collection.right.name:<p>Select Right Photo</p>}</label>
          <input type="file" name="right" id="right" hidden/>
             <hr className="hr" />
          </div>
          <div className="contact_info" style={{width:"100%",overflow:"hidden"}}>
          <label htmlFor="left" className="input" style={{width:"100%", display:"block"}}>{collection.left?collection.left.name && collection.left.name :<p>Select Left Photo</p>}</label>
          <input type="file" name="left" id="left"  hidden/>
             <hr className="hr" />
          </div>
          {loadingStatus==="Loading"?<button type="submit" disabled className="watch_more send_mail"><Loader/></button>:<input type="submit"  className="watch_more send_mail" />}
          
        </div>
      </form>
      {
        success &&
        <dialog id="pop-success"  className={`post-dialog ${success && "dialog-active"}`}>
          <div className="close-dialog" onClick={()=>{
            window.location.reload()
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
    </div>
  );
}

export default CollectionPost;
