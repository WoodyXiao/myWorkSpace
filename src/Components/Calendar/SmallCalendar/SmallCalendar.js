import dayjs from "dayjs";
import React, {useContext, useEffect, useState} from "react";
import {getMonth} from "../../../util/util";

import {Container, Typography, Box} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import {makeStyles} from "@mui/styles";
import CreateEventButton from "../CreateEventButton/CreateEventButton";
import GlobalContext from "../../../Context/GlobalContext";

const useStyles = makeStyles(theme => ({
    button: {
        width: '20px',
        height: '20px',
        '& svg': {
            width: '15px',
            height: '15px',
        }
    },
    currentDay: {
        color: '#fff',
        backgroundColor: '#1379ec'
    },
    daySelected: {
        color: '#233269',
        backgroundColor: '#86b7f8',
        'typography': {
            fontSize: '20px',
        }
    }
}))

const SmallCalendar = () => {

    const classes = useStyles()
    const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month())
    const [currentMonth, setCurrentMonth] = useState(getMonth())
    const handlePreventMonth = () => {
        setCurrentMonthIndex(currentMonthIndex - 1)
    }
    const handleNextMonth = () => {
        setCurrentMonthIndex(currentMonthIndex + 1)
    }
    const getDayClass = (day) => {
        const format = 'DD-MM-YY'
        const nowDay = dayjs().format(format)
        const currDay = day.format(format)
        const selectedDay = daySelected && daySelected.format(format)
        if (nowDay === currDay)
            return 'currDay'
        else if (currDay === selectedDay)
            return 'selectedDay'
    }

    const {monthIndex, setSmallCalendarMonth, setDaySelected, daySelected} = useContext(GlobalContext)

    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIndex))
    }, [currentMonthIndex])

    useEffect(() => {
        setCurrentMonthIndex(monthIndex)
    }, [monthIndex])

    return (
        <div style={{
            width: '100%',
            marginLeft: '-10px'
        }}>
            <Container sx={{display: 'flex', justifyContent: 'space-between',}}>
                <CreateEventButton
                    onClick={handlePreventMonth}
                    size={'small'}
                    className={classes.button}
                    iconButton={<ArrowBackIosIcon/>}/>

                <Box>
                    <Typography sx={{fontSize: '14px', fontWeight: 'bold'}}>
                        {dayjs(new Date(dayjs().year(), currentMonthIndex)).format(
                            "MMMM YYYY"
                        )}
                    </Typography>
                </Box>

                <CreateEventButton
                    onClick={handleNextMonth}
                    size={'small'}
                    className={classes.button}
                    iconButton={<ArrowForwardIosIcon/>}/>
            </Container>
            <Container>
                <Grid container sx={{width: '100%'}}>
                    <Grid container sx={{width: '100%', textAlign: 'center'}}>
                        {
                            currentMonth[0].map((day, index) => (
                                <Grid item xs={12 / 7} key={index}>
                                    <Typography sx={{fontSize: '14px'}}>
                                        {day.format('dd').charAt(0)}
                                    </Typography>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
                <Grid container sx={{width: '100%'}}>
                    {
                        currentMonth.map((row, i) => (
                            <Grid container key={i} sx={{width: '100%', textAlign: 'center'}}>
                                {
                                    row.map((day, index) => (
                                        <Grid item xs={12 / 7} key={index}>
                                            <Typography
                                                sx={{
                                                    fontSize: '12px',
                                                    borderRadius: '50%',
                                                    '&:hover': {
                                                        cursor: 'pointer',
                                                        backgroundColor: '#86b7f8',
                                                        color: 'white',
                                                    }
                                                }}
                                                className={getDayClass(day) === 'currDay' ? classes.currentDay
                                                    : getDayClass(day) === 'selectedDay' ? classes.daySelected : null}
                                                onClick={() => {
                                                    setSmallCalendarMonth(currentMonthIndex)
                                                    setDaySelected(day)
                                                }}
                                            >
                                                {day.format('D')}
                                            </Typography>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default SmallCalendar