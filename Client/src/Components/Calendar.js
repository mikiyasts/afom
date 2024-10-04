import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function Calendar(props) {
  const date = new Date();
  const [currentday, setCurrentDay] = useState(date.getDate());
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [scheduledate, SetScheduledate] = useState(-1);
  const [checkbusy, setCheckbusy] = useState([]);
  const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let days = Array();
  let year = Array();

  const [formvalue, Setfromvalue] = useState({
    month: currentMonth,
    day: currentday,
    year: currentYear,
  });

  for (let i = 0; i < daysInMonth(currentYear, currentMonth); i++) {
    days[i] = i + 1;
  }
  for (let i = 0; i <= 10; i++) {
    year[i] = date.getFullYear() + i;
  }

  const updateFormvalue = (e) => {
    SetScheduledate(-1);
    setCurrentMonth(Number(e.target.value));
    props.passDate(0, 0, 0);
  };

  const scheduleToggle = (ind) => {
    SetScheduledate(ind);
  };
  useEffect(() => {
    setCheckbusy(props.busy && props.busy);
  }, [props.busy]);



  const daysCard = days.map((dy, index) => {
    if (
      currentYear === date.getFullYear() &&
      currentMonth === date.getMonth() &&
      currentday === dy
    ) {
      let count = 0;
      props.busy &&
        props.busy.map((bs) => {
          if (currentMonth + 1 < 10 && index + 1 < 10) {
            if (
              bs.date === `${currentYear}-0${currentMonth + 1}-0${index + 1}`
            ) {

              count++;
            }
          } else if (currentMonth + 1 > 10 && index + 1 < 10) {
            if (
              bs.date === `${currentYear}-${currentMonth + 1}-0${index + 1}`
            ) {
              count++;
            }
          } else if (currentMonth + 1 < 10 && index + 1 > 10) {
            if (
              bs.date === `${currentYear}-0${currentMonth + 1}-${index + 1}`
            ) {
              

              count++;
            }
          } else if (currentMonth + 1 > 10 && index + 1 > 10) {
            if (bs.date === `${currentYear}-${currentMonth + 1}-${index + 1}`) {
              count++;
            }
          }else if (currentMonth + 1 === 10 && index + 1 > 10) {
            if (bs.date === `${currentYear}-${currentMonth + 1}-${index + 1}`) {
              count++;
            }
          }else if (currentMonth + 1 === 10 && index + 1 < 10) {
            if (bs.date === `${currentYear}-${currentMonth + 1}-0${index + 1}`) {
              count++;
            }
          }else if (currentMonth + 1 > 10 && index + 1 === 10) {
            console.log("msmsm");
            
            if (bs.date === `${currentYear}-${currentMonth + 1}-${index + 1}`) {
              count++;
            }
          }else if (currentMonth + 1 < 10 && index + 1 === 10) {
            console.log("msmsm");
            
            if (bs.date === `${currentYear}-0${currentMonth + 1}-${index + 1}`) {
              count++;
            }
          }else if (currentMonth + 1 === 10 && index + 1 === 10) {
            console.log("msmsm");
            
            if (bs.date === `${currentYear}-${currentMonth + 1}-${index + 1}`) {
              count++;
            }
          }
        });
      return (
        <div
          className={`day today ${scheduledate === index && "schedule"} ${
            count >= 1 && "busy"
          }`}
          key={dy}
          style={{
            border: "1px solid #f2f2f2",
            minHeight: "30px",
            width: "30px",
            height: "30px",
          }}
          onClick={() => {
            if (count < 1) {
              scheduleToggle(index);
              props.passDate(currentYear, currentMonth + 1, index + 1);
            }
          }}
        >
          {dy}
        </div>
      );
    }
    
    //today ended
    else if (
      currentYear <= date.getFullYear() &&
      currentMonth <= date.getMonth() &&
      currentday > dy
    ) {
      return (
        <div
          className={`day`}
          key={dy}
          style={{
            border: "1px solid #f2f2f2",
            minHeight: "30px",
            opacity: "0.3",
            width: "30px",
            height: "30px",
          }}
        >
          {dy}
        </div>
      );
    }
    else if (
      currentYear <= date.getFullYear() &&
      currentMonth < date.getMonth()
    ) {
      return (
        <div
          className={`day`}
          key={dy}
          style={{
            border: "1px solid #f2f2f2",
            minHeight: "30px",
            opacity: "0.3",
            width: "30px",
            height: "30px",
          }}
        >
          {dy}u
        </div>
      );
    }
    //passed days ended
 
    else {
      let count = 0;
      props.busy &&
        props.busy.map((bs) => {
          if (currentMonth + 1 < 10 && index + 1 < 10) {
            if (
              bs.date === `${currentYear}-0${currentMonth + 1}-0${index + 1}`
            ) {

              count++;
            }
          } else if (currentMonth + 1 > 10 && index + 1 < 10) {
            if (
              bs.date === `${currentYear}-${currentMonth + 1}-0${index + 1}`
            ) {
              count++;
            }
          } else if (currentMonth + 1 < 10 && index + 1 > 10) {
            if (
              bs.date === `${currentYear}-0${currentMonth + 1}-${index + 1}`
            ) {
              

              count++;
            }
          } else if (currentMonth + 1 > 10 && index + 1 > 10) {
            if (bs.date === `${currentYear}-${currentMonth + 1}-${index + 1}`) {
              count++;
            }
          }
          else if (currentMonth + 1 === 10 && index + 1 > 10) {
            if (bs.date === `${currentYear}-${currentMonth + 1}-${index + 1}`) {
              count++;
            }
          }else if (currentMonth + 1 === 10 && index + 1 < 10) {
            if (bs.date === `${currentYear}-${currentMonth + 1}-0${index + 1}`) {
              count++;
            }
          }else if (currentMonth + 1 > 10 && index + 1 === 10) {
            
            if (bs.date === `${currentYear}-${currentMonth + 1}-${index + 1}`) {
              count++;
            }
          }else if (currentMonth + 1 < 10 && index + 1 === 10) {
            
            if (bs.date === `${currentYear}-0${currentMonth + 1}-${index + 1}`) {
              count++;
            }
          }else if (currentMonth + 1 === 10 && index + 1 === 10) {
            
            if (bs.date === `${currentYear}-${currentMonth + 1}-${index + 1}`) {
              count++;
            }
          }
        });

      return (
        <div
          className={`day ${scheduledate === index && "schedule"} ${
            count >= 1 && "busy"
          }`}
          key={dy}
          style={{
            border: "1px solid #f2f2f2",
            minHeight: "30px",
            width: "30px",
            height: "30px",
          }}
          onClick={() => {
            if (count < 1) {
              scheduleToggle(index);
              props.passDate(currentYear, currentMonth + 1, index + 1);
            }
          }}
        >
          {dy}
        </div>
      );
    }
  });

  return (
    <div
      className="calendar-body"
      style={{
        width: "250px",
        border: "1px solid white",
        height: "fit-content",
        marginInline: "auto",
      }}
    >
      <div
        className="calendar-header"
        style={{
          display: "flex",
          height: "fit-content",
          padding: ".5rem",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="arrow back"
          onClick={() => {
            setCurrentMonth((prev) => {
              SetScheduledate(-1);
              if (prev === 0) {
                return prev + 11;
              } else {
                return prev - 1;
              }
            });
            props.passDate(0, 0, 0);
          }}
        >
          <ArrowBackIosIcon />
        </div>
        <div>
          <select
            name="month"
            id="month"
            style={{ color: "black" }}
            value={currentMonth}
            onChange={updateFormvalue}
          >
            {month.map((mn, index) => (
              <option key={mn} style={{ color: "black" }} value={index}>
                {mn}
              </option>
            ))}
          </select>
          <select
            name="year"
            id="year"
            style={{ color: "black" }}
            value={currentYear}
            onChange={(e) => {
              SetScheduledate(-1);
              setCurrentYear(Number(e.target.value));
              props.passDate(0, 0, 0);
            }}
          >
            {year.map((yr) => (
              <option key={yr} style={{ color: "black" }} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>
        <div className="arrow forward">
          <ArrowForwardIosIcon
            onClick={() => {
              setCurrentMonth((prev) => {
                SetScheduledate(-1);
                if (prev === 11) {
                  return prev - 11;
                } else {
                  return prev + 1;
                }
              });
              props.passDate(0, 0, 0);
            }}
          />
        </div>
      </div>
      <div
        className="calendar-days"
        style={{
          width: "100%",
          height: "240px",
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          padding: ".2rem",
          overflow: "scroll",
        }}
      >
        {daysCard}
      </div>
    </div>
  );
}

export default Calendar;
