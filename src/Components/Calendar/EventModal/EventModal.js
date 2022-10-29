import {Box, Container, Modal, Typography, Grid, TextField, IconButton, Button} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SegmentIcon from '@mui/icons-material/Segment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleIcon from '@mui/icons-material/Circle';
import DeleteIcon from '@mui/icons-material/Delete';

import {useContext, useState} from "react";
import GlobalContext from "../../../Context/GlobalContext";
import CreateEventButton from "../CreateEventButton/CreateEventButton";
import TextInput from "./TextInput/TextInput";

import {labelsColors} from '../../../util/util'
import Divider from "@mui/material/Divider";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#fff',
    boxShadow: 24,
    p: 4,
    outline: 'none',
    borderRadius: '10px',
    padding: '0',
    height: 'auto'
};
const style2 = {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '10px 10px 0 0',
    backgroundColor: '#dedede',
    padding: '5px',
}
const style3 = {
    padding: '8px',
}

const EventModal = (props) => {
    const {setShowEventModal, daySelected, dispatchCallEvent, selectedEvent} = useContext(GlobalContext)
    const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '')
    const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : '')
    const [selectedLabel, setSelectedLabel] = useState(selectedEvent ? labelsColors.find(
        (label) => label === selectedEvent.label
    ) : labelsColors[0])

    const handleSubmit = (e) => {
        e.preventDefault()

        const calendarEvent = {
            title: title ? title : 'new event',
            description,
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now(),
        }

        if (selectedEvent) {
            dispatchCallEvent({type: 'update', payload: calendarEvent})
        } else {
            dispatchCallEvent({type: 'push', payload: calendarEvent})
        }
        setShowEventModal(false)
    }

    return (
        <div onClick={() => (props.onClose ? props.onClose() : '')}>
            <Modal
                open={true}
            >
                <Box sx={style}
                     onClick={(event) => event.stopPropagation()}
                >
                    {/* header */}
                    <Box sx={style2}>
                        <Box>
                            <CreateEventButton
                                size={'small'}
                                iconButton={<MenuIcon/>}
                            />
                        </Box>
                        <Box>
                            {
                                selectedEvent && (
                                    <CreateEventButton
                                        size={'small'}
                                        iconButton={<DeleteIcon/>}
                                        onClick={() => {
                                            dispatchCallEvent({type: 'delete', payload: selectedEvent})
                                            setShowEventModal(false)
                                        }}
                                    />
                                )
                            }
                            <CreateEventButton
                                size={'small'}
                                iconButton={<CloseIcon/>}
                                onClick={() => setShowEventModal(false)}
                            />
                        </Box>
                    </Box>
                    {/* body */}
                    <Box sx={style3}>
                        <Grid container>
                            <Grid item md={2}>
                            </Grid>
                            <Grid item md={10}>
                                <TextInput
                                    placeholder={"Add Title"}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item md={2}>
                                <ScheduleIcon/>
                            </Grid>
                            <Grid item md={10}>
                                <Typography>
                                    {daySelected.format('dddd, MMMM DD')}
                                </Typography>
                            </Grid>
                            <Grid container>
                                <Grid item md={2}>
                                    <SegmentIcon/>
                                </Grid>
                                <Grid item md={10}>
                                    <TextInput
                                        placeholder={'Enter description'}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item md={2}>
                                    <BookmarkIcon/>
                                </Grid>
                                <Grid item md={10}>
                                    {
                                        labelsColors.map((element, index) => (
                                            <IconButton key={index} onClick={() => setSelectedLabel(element)}>
                                                {
                                                    element === selectedLabel ? (<CheckCircleIcon sx={
                                                        {color: `${element}`, cursor: 'pointer'}
                                                    }/>) : (<CircleIcon sx={
                                                        {color: `${element}`, cursor: 'pointer'}
                                                    }/>)
                                                }
                                            </IconButton>
                                        ))
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    {/* footer */}
                    <Divider/>
                    <Box sx={{
                        width: '100%',
                        height: 'auto',
                        padding: '8px',
                        marginBottom: '35px'
                    }}>
                        <Button type={'submit'} sx={{float: 'right'}}
                                variant={'outlined'}
                                onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default EventModal