import React, {useState} from "react";
import { useEffect } from "react";
import './styles.css';


function TimeAndDate()
{
    

    var showdate = new Date();
    var displaytodaysdate = showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();
    var dt = showdate.toDateString();
    var displaytime = showdate.getHours()+'/'+showdate.getMinutes();
    const [time, setTime] = useState(new Date())

    useEffect(()=>{
        setInterval(()=>setTime(new Date()), 1000)
    },[])

    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return(
        <div class="top-right-text">
            <h2> {dt} {formattedTime}</h2>
        </div>
    );
}

export default TimeAndDate