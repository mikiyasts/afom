import React, { useEffect, useState } from 'react'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import Calendar from "../../Components/Calendar.js"
import axios from 'axios';
import Loader from '../../Components/Loader';
import CloseIcon from '@mui/icons-material/Close';
import Success from "../../assets/Success.gif"
import Error from "../../assets/Error.gif"

function Fitdate() {
  const [loadingStatus,setLoadingStatus]=useState("Done")

  const [success,setSuccess]=useState(false)
  const [error,setError]=useState(false)
  const [sendstatus,setSendStatus]=useState("Submit")
  const [warning,setWarning]=useState(false)
  const [checkday,setCheckday]=useState(0)
  const [date,setDate]=useState({scdate:""})
  const [busy,setBusy]=useState([])
  const [schedule,SetSchedule]=useState({
    client_name:"",
    client_phone:"",
    category:"",
    notes:"",
    appointment_date:"",
    time:""
  })

 
    const handleSubmit=(e)=>{
      setLoadingStatus("Loading")

      e.preventDefault()
      if(checkday===0){
        setWarning(true)
        setTimeout(()=>{
          setWarning(false)
        },5000)

        return console.log("not");

      }
      axios.post(`${process.env.REACT_APP_URL}/api/appointment-create/`,{
        client_name:schedule.client_name,
        client_phone:schedule.client_phone,
        category:schedule.category,
        notes:schedule.notes,
        appointment_date:`${date.scdate}T${schedule.time&&schedule.time}:00Z`
      },{
        headers:{
          "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
        }
      }).then((res)=>{    
        // setLoadingStatus("Done")
        setSuccess(true)
        
        // window.location.reload()
      }).catch(err=>{
        // setLoadingStatus("Done")
        setError(true)

        console.log("err",err);
        
      })
     
    }


    //Getting busy Date

    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_URL}/api/reserved_dates/`,{
        headers:{
          "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
        }
      }).then((res)=>{
        setBusy(res.data.reserved_dates);
        
      }).catch(err=>{
        console.log(err);
        
      })
    },[])
    console.log("bs",busy);
    
    const handleForm=(e)=>{
      SetSchedule(prev=>{
        return{
          ...prev,
          [e.target.name]:e.target.value
        }
      })
    }
    const getDate=(year,month,day)=>{
      
      if(day!==0){
         setDate(prev=>{
        return {
          ...prev,
          scdate:`${year}-${month}-${day}`
              }
      })
      setCheckday(day)
      }
     
      
    }

    
    
  return (
    <div className='appointment-page'>
      <form onSubmit={handleSubmit} onChange={handleForm} style={{width:"50%",margin:"auto",minWidth:"350px",backgroundColor:"#010101",padding:"1rem"}}>
            <div className="form_field">
              <div className="contact_info">
               
                <input className="input" required type="text" placeholder="Name" name="client_name"style={{backgroundColor:"transparent"}} />
                <hr className="hr" />
              </div>
              <div className="contact_info">
             
                <input className="input" type="text" required  placeholder="Phone Number" name="client_phone"/>
                <hr className="hr" />
              </div>
              <div className="contact_info">
             
              <select name="category" id="category" required style={{color:"white",padding:".5rem",width:"100%",backgroundColor:"transparent",border:"none",borderBottom:"2px solid #f2f2f299"}}>
                <option style={{color:"black"}} value="">Select Appointment Category</option>
                <option style={{color:"black"}} value="fitting">Fitting</option>
              </select>
              
            
             <hr className="hr" />
           </div>
           <div className="contact_info">
             
              <textarea className="input" required name="notes" id="notes" cols="30" rows="4" placeholder="Note" ></textarea>
             <hr className="hr" />
           </div>
           <div className="contact_info">
                <label htmlFor='schedule-time'>Time</label>
                <input className="input" id="schedule-time" type="time" min="13:00" max="16:00" required name="time" />
                <p htmlFor='schedule-time' style={{opacity:".5",marginTop:".5rem",display:"flex",alignItems:"center",gap:".5rem"}}><ReportGmailerrorredIcon sx={{width:20}}/> Please pick a time b/n 1PM to 4PM</p>
                <hr className="hr" />
            </div>
           <Calendar
           passDate={getDate}
           busy={busy}
           />
           <span><p className={`warning ${warning&&"active"} `} style={{color:"red"}}>Please Select Date</p></span>
           {loadingStatus==="Done"?<input type="submit" value={sendstatus} className='watch_more send_mail' style={{display:"flex",alignItems:"center",paddingTop:".5rem"}}/>:<button disabled type="submit" className="watch_more send_mail"><Loader/></button>}
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

export default Fitdate
