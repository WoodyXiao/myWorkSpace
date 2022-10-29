import {Button, Typography} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


import GlobalContext from "../../../Context/GlobalContext";
import {useContext} from "react";
import dayjs from "dayjs";
import CreateEventButton from "../CreateEventButton/CreateEventButton";

const CalendarHeader = () => {
    const {monthIndex, setMonthIndex} = useContext(GlobalContext)
    const handlePrevMonth = () => {
        setMonthIndex(monthIndex - 1)
    }
    const handleNextMonth = () => {
        setMonthIndex(monthIndex + 1)
    }
    const handleReset = () => {
        setMonthIndex(monthIndex === dayjs().month()
            ? monthIndex + Math.random()
            : dayjs().month())
    }

    return (
        <div className="calendar_navbar">
            <h2>Calendar</h2>
            <CreateEventButton
                size={"medium"}
                text={'TODAY'}
                onClick={handleReset}/>
            <CreateEventButton
                size={"small"}
                startIcon={<ArrowBackIosIcon/>}
                onClick={handlePrevMonth}
                variant={"text"}
            />
            <CreateEventButton
                size={"small"}
                startIcon={<ArrowForwardIosIcon/>}
                onClick={handleNextMonth}
                variant={"text"}
            />
            <Typography variant={'h5'}>
                {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
            </Typography>
        </div>
    )
}

export default CalendarHeader