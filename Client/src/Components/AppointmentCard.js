import {React, useState} from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
function AppointmentCard(props) {


    
    const date=props.dt && props.dt

    const splitdate=date.split("T")
    const dated=String(new Date(Date.parse(splitdate[0])))
    const splitdated=dated.split(" ")
    const splittime=splitdate[1].split(":")
    
    return (
    <div className='appointment-card'>
      <div className="notes">
      <EditNoteOutlinedIcon/>
      <div className="notes-container">
        {props.notes}
      </div>
      </div>

      
      <div className="appointment-header">
        <h4>{props.cat}</h4>
      </div>
      <div className="client-info">
        <div className="client name"><p>{props.name}</p></div>
        <div className="client-number"><p>{props.num}</p></div>
      </div>
        <div className="appointment-dt">
            <div className="appointment-date"><CalendarMonthIcon sx={{fontSize:15}}/><p> {`${splitdated[0]} ${splitdated[1]} ${" "} ${splitdated[2]}`}</p></div>
            <div className="appointment-time"><AccessTimeIcon sx={{fontSize:15}}/><p> {`${splittime[0]}: ${splittime[1]}`}</p></div>
        </div>
    </div>
  )
}

export default AppointmentCard
