import dayjs from "dayjs";
import {useContext, useEffect, useState} from "react";
import GlobalContext from "../../../Context/GlobalContext";

import {Typography, Box} from "@mui/material";

const Day = ({day, rowIdx}) => {
    const {setShowEventModal, setDaySelected, filteredEvents, setSelectedEvent} = useContext(GlobalContext)
    const [dayEvents, setDayEvents] = useState([])

    useEffect(() => {
        const events = filteredEvents.filter(event => dayjs(event.day).format("DD-MM-YY")
            === day.format("DD-MM-YY"))
        setDayEvents(events)
    }, [filteredEvents, day])

    const getCurrentDayClass = () => {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
    }

    return (
        <Box className="day_container" sx={{
            width: '200px',
            height: '200px',
            textAlign: 'center',
            backgroundColor: '#f8f8f8',
            display: 'block'
        }}>
            <header className="day">
                {
                    rowIdx === 0 && (
                        <Typography className="day_weekday">
                            {day.format("ddd").toUpperCase()}
                        </Typography>
                    )
                }
                <Typography className="day_day"
                            sx={{
                                color: `${getCurrentDayClass() ? "white" : "black"}`,
                                backgroundColor: `${getCurrentDayClass() ? "blue" : "null"}`,
                                margin: '0 auto',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',

                            }}
                >
                    {day.format("DD")}
                </Typography>
            </header>
            <Box sx={{cursor: 'pointer', width: '100%', height: '100%'}}
                 onClick={(e) => {
                     setDaySelected(day)
                     setShowEventModal(true)
                 }}
            >
                {dayEvents.map((event, index) => (
                    <div key={index}
                         style={{
                             backgroundColor: `${event.label}`,
                             color: 'white'
                         }}
                         onClick={(e) => {
                             setSelectedEvent(event)
                         }}>
                        {event.title}
                    </div>
                ))}
            </Box>
        </Box>
    )
}

export default Day