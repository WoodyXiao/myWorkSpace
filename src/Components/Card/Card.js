import './Card.css'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import Chip from "../Chip/Chip";
import Dropdown from "../Dropdown/Dropdown";
import CardInfo from "./CardInfo/CardInfo";

import {useState} from "react";
import {Draggable} from "react-beautiful-dnd";


const Card = (props) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            {showModal && <CardInfo
                card={props.card}
                updateCard={props.updateCard}
                boardId={props.boardId}
                onClose={() => setShowModal(false)}/>}
            <Draggable key={props.card.id} draggableId={props.card.id} index={props.index}>
                {
                    (provided, snapshot) => {
                        return (
                            <div className='card'
                                 ref={provided.innerRef}
                                 {...provided.draggableProps}
                                 {...provided.dragHandleProps}
                                 onClick={() => setShowModal(true)}
                            >
                                <div className="card_top">
                                    <div className="card_top_labels">
                                        {
                                            props.card?.labels?.map((item, index) => (
                                                <Chip text={item.text} color={item.color} key={index}/>
                                            ))
                                        }
                                    </div>
                                    <div className="card_top_more" onClick={(e) => {
                                        e.stopPropagation()
                                        setShowDropdown(true)
                                    }}>
                                        <MoreHorizIcon/>
                                        {showDropdown && (
                                            <Dropdown
                                                onClose={() => {
                                                    setShowDropdown(false)
                                                }}
                                            >
                                                <div className="card_dropdown">
                                                    <p onClick={() => props.removeCard(props.card?.id, props.boardId)}>Delete
                                                        Card</p>
                                                </div>

                                            </Dropdown>
                                        )}
                                    </div>

                                </div>
                                <div className="card_title">
                                    {props.card?.title}
                                </div>
                                <div className="card_footer">
                                    {
                                        props.card?.date && (
                                            <p><AccessTimeIcon/>{props.card?.date}</p>
                                        )
                                    }
                                    {
                                        props.card?.tasks?.length > 0 && (
                                            <p>
                                                <TaskAltIcon/>
                                                {props.card?.tasks?.filter((item) => item.completed)?.length}
                                                /{props.card?.tasks?.length}
                                            </p>
                                        )
                                    }

                                </div>
                            </div>
                        )
                    }
                }

            </Draggable>
        </>
    )
}

export default Card;