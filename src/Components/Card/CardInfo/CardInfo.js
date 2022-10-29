import './CardInfo.css'
import Modal from "../../Modal/Modal";
import EditTable from "../../EditTable/EditTable";
import Chip from '../../Chip/Chip';
import {useEffect, useState} from "react";
import {v4} from "uuid";

import {colorsChip} from "../../../Data/mockData";

import TitleIcon from '@mui/icons-material/Title';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const CardInfo = (props) => {
    const [activeColor, setActiveColor] = useState("")

    const [values, setValues] = useState({...props.card})

    const calculatePercent = () => {
        if (values.tasks?.length === 0) return "0"
        const completed = values.tasks?.filter(item => item.completed)?.length

        return (completed / values.tasks?.length) * 100 + ""
    }

    const addLabel = (label) => {
        const index = values.labels.findIndex((item) => item.text === label.text);
        if (index > -1) return;

        setActiveColor("");
        setValues({
            ...values,
            labels: [...values.labels, label],
        });
    }

    const removeLabel = (label) => {
        const tempLabels = values.labels.filter((item) => item.text !== label.text);

        setValues({
            ...values,
            labels: tempLabels,
        });

    }

    const addTask = (value) => {
        const task = {
            id: v4(),
            completed: false,
            text: value,
        }
        setValues({
            ...values,
            tasks: [...values.tasks, task]
        })
    }

    const removeTask = (id) => {
        const tasks = [...values.tasks]

        const tempTasks = tasks.filter((item) => item.id !== id)
        setValues({
            ...values,
            tasks: tempTasks
        })
    }

    const updateTask = (id, value) => {
        const tasks = [...values.tasks]

        const index = tasks.findIndex((item) => item.id === id)
        if (index < 0) return

        tasks[index].completed = value;

        setValues({
            ...values,
            tasks
        })
    }

    useEffect(() => {
        props.updateCard(props.card.id, props.boardId, values)
    }, [values])

    return (
        <Modal onClose={() => props.onClose()}>
            <div className="cardInfo">

                {/* ========== title ========== */}
                <div className="cardInfo_box">
                    <div className="cardInfo_box_title">
                        <TitleIcon/>
                        Title
                    </div>
                    <div className="cardInfo_box_body">
                        <EditTable
                            text={values.title}
                            default={values.title}
                            placeholder={"Enter Title"}
                            buttonText={"Set Title"}
                            onSubmit={(value) => setValues({...values, title: value})}
                        />
                    </div>
                </div>
                {/* ========== description ========== */}
                <div className="cardInfo_box">
                    <div className="cardInfo_box_title">
                        <FormatListBulletedIcon/>
                        Description
                    </div>
                    <div className="cardInfo_box_body">
                        <EditTable
                            text={values.desc}
                            default={values.desc}
                            placeholder={"Enter description"}
                            buttonText={"Set Description"}
                            onSubmit={(value) => setValues({...values, desc: value})}/>
                    </div>
                </div>

                {/* ========== calendar =========== */}
                <div className="cardInfo_box">
                    <div className="cardInfo_box_title">
                        <CalendarMonthIcon/>
                        Date
                    </div>
                    <div className="cardInfo_box_body">
                        <input type="date"
                               defaultValue={values.date ? new Date(values.date).toISOString().substr(0, 10) : ""}
                               onChange={(event) =>
                                   setValues({...values, date: event.target.value})}
                        />
                    </div>
                </div>

                {/* ========== labels ========== */}
                <div className="cardInfo_box">
                    <div className="cardInfo_box_title">
                        <LocalOfferIcon/>
                        Labels
                    </div>

                    <div className="cardInfo_box_labels">
                        {
                            values.labels?.map((item, index) => (
                                <Chip
                                    close
                                    onClose={() => removeLabel(item)}
                                    key={item.text + index}
                                    color={item.color}
                                    text={item.text}
                                />
                            ))
                        }
                    </div>

                    <div className="cardInfo_box_colors ">
                        {
                            colorsChip.map((item, index) =>
                                <li key={index} style={{backgroundColor: item}}
                                    className={item === activeColor ? "active" : ""}
                                    onClick={() => setActiveColor(item)}
                                />
                            )
                        }
                    </div>

                    <div className="cardInfo_box_body">
                        <EditTable
                            text={"Add Label"}
                            placeholder={"Enter label"}
                            buttonText={"Add"}
                            onSubmit={(value) => addLabel({color: activeColor, text: value})}
                        />
                    </div>
                </div>

                {/* ========== tasks ========== */}
                <div className="cardInfo_box">
                    <div className="cardInfo_box_title">
                        <TaskAltIcon/>
                        Tasks
                    </div>

                    <div className="cardInfo_box_progress-bar">
                        <div className={`cardInfo_box_progress ${calculatePercent() === "100" ?
                            "cardInfo_box_progress-active" : ""}`} style={{width: calculatePercent() + "%"}}/>
                    </div>

                    <div className="cardInfo_box_list">
                        {
                            values.tasks?.map((item) => (
                                <div
                                    key={item.id}
                                    className="cardInfo_task">
                                    <input type="checkbox" defaultValue={item.completed}
                                           onChange={(event) => updateTask(item.id, event.target.checked)}
                                           checked={!!item.completed}/>
                                    <p className={item.completed ? "completed" : ""}>{item.text}</p>
                                    <DeleteForeverIcon onClick={() => removeTask(item.id)}/>
                                </div>
                            ))
                        }
                    </div>

                    <div className="cardInfo_box_body">
                        <EditTable
                            text={"Add new task"}
                            placeholder={"Enter task"}
                            buttonText={"Add Task"}
                            onSubmit={addTask}/>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CardInfo