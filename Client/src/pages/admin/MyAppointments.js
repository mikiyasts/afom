import React, { useEffect, useState } from "react";
import AppointmentCard from "../../Components/AppointmentCard";
import Pagination from "../../Components/Pagination";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
import Calendar from "../../Components/Calendar.js"

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filterDate,setFilterDate]=useState("")
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(15);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = appointments.filter(el=>{
    if(!filterDate){
      return el
    }else{
      return el.appointment_date.includes(filterDate)
    }
  }).slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(appointments.length / recordsPerPage);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/api/appointment/`,{
      headers:{
        "Authorization":`API_KEY ${process.env.REACT_APP_API_KEY}`
      }
    }).then((res) => { 
    return  setAppointments(res.data);
    });
  }, []);

  const cards = currentRecords.map((el,index) => {
    return (
      <AppointmentCard
      key={index}
        cat={el.category}
        name={el.client_name}
        num={el.client_phone}
        dt={el.appointment_date}
        notes={el.notes}
      />
    );
  });

  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      navigate("/adminauth");
    }
  });

 

const filterByDate=(e)=>{
  setFilterDate(e.target.value)
}



  return (
    <div className="appointment-page">
      <div className="set-fitdate">
      <div className="filter-bydate">Filter By Date <form><input type="date" name="filter-date" id="filter-date" onChange={(e)=>filterByDate(e)}/></form></div>
      <div className="filter-bydate-mbl" title="Filter by Date">FBD <form><input type="date" name="filter-date" id="filter-date-mbl" onChange={(e)=>filterByDate(e)}/></form></div>
      
       <Link to="/fitdate"><button className="set-fitdate_btn">Set Fitting Date</button><button className="set-fitdate_btn-mbl">SFD</button></Link> 
      </div>
      {cards?
      <div className="appointments-container">{cards}</div>:<div className="appointments-container"><h1>No Appointments on this Date</h1></div>
      }
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default MyAppointments;
