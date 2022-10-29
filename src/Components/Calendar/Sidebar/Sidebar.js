import {useContext} from "react";

import {
    Drawer as MUIDrawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
}
    from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {makeStyles} from "@mui/styles"

import Labels from '../Labels/Labels';
import CreateEventButton from "../CreateEventButton/CreateEventButton";
import SmallCalendar from "../SmallCalendar/SmallCalendar";
import GlobalContext from "../../../Context/GlobalContext";

const useStyles = makeStyles({
    drawer: {
        position: "sticky",
    }
})

const Sidebar = () => {
    const classes = useStyles()
    const {setShowEventModal} = useContext(GlobalContext)

    return (
        <MUIDrawer anchor={"right"} variant={"permanent"} className={classes.drawer}
                   open={true}
        >

            <List sx={{width: '200px', paddingTop: '70px'}}>
                <ListItem>
                    <CreateEventButton
                        size={"small"}
                        startIcon={<AddIcon/>}
                        text={'Create'}
                        onClick={() => setShowEventModal(true)}
                    />
                </ListItem>
                <SmallCalendar/>
                <ListItem>
                    <Labels/>
                </ListItem>
            </List>
        </MUIDrawer>

    )
}
export default Sidebar