import {Link} from "react-router-dom";
import {
    Drawer as MUIDrawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    AppBar, Toolbar, IconButton
}
    from '@mui/material';
import {makeStyles} from "@mui/styles"


import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';



const Drawer = () => {
    //const classes = useStyles()
    const itemList = [
        {
            text: "Home",
            icon: <HomeIcon/>,
            path: "/",
        },
        {
            text: "To Do List",
            icon: <FormatListBulletedIcon/>,
            path: "/todoList",
        },
        {
            text: "Calendar",
            icon: <CalendarMonthIcon/>,
            path: "/calendar",
        },
    ]

    return (
        <div>
            <MUIDrawer variant={"permanent"} >
                <List>
                    <ListItem>
                        <Typography sx={{
                            fontWeight: "bold",
                            fontSize: "30px"
                        }}>Dashboard</Typography>
                    </ListItem>
                    {
                        itemList.map(
                            (item, index) => {
                                const {text, icon, path} = item
                                return (
                                    <Link to={path} key={index}>
                                        <ListItem button key={index}>
                                            {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                            <ListItemText primary={text}/>
                                        </ListItem>
                                    </Link>
                                )
                            }
                        )
                    }
                </List>
            </MUIDrawer>
        </div>
    )
}
export default Drawer