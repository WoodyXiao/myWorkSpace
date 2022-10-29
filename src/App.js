import {BrowserRouter, Routes, Route} from "react-router-dom";

import TodoList from "./Pages/TodoList/TodoList";
import Drawer from "./Components/Header/Drawer/Drawer"
import Home from "./Pages/Home/Home";
import Calendar from "./Pages/Calendar/Calendar";
import ContextWrapper from "./Context/ContextWrapper";

import {makeStyles} from "@mui/styles";
import Navbar from "./Components/Header/Nav";


const useStyles = makeStyles({
    container: {
        display:'flex'
    }
})

const App = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/todoList"} element={<TodoList className={"todoList"}/>}/>
                    <Route path={"/calendar"} element={<ContextWrapper><Calendar/></ContextWrapper>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App