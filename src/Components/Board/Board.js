import './Board.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Card from "../Card/Card";
import EditTable from "../EditTable/EditTable";
import Dropdown from "../Dropdown/Dropdown";
import {useState} from "react";
import {Droppable} from "react-beautiful-dnd";


const Board = (props) => {
    const [showDropdown, setShowDropdown] = useState(false)

    return (
        <div className="board">
            <div className="board_top">
                <p className="board_top_title">
                    {props.board?.title} <span>{`${props.board?.cards?.length}`}</span></p>

                <div className="board_top_more" onClick={(e) => {
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
                            <div className="board_dropdown">
                                <p onClick={() => props.removeBoard(props.board?.id)}>Delete Board</p>
                            </div>
                        </Dropdown>
                    )}
                </div>
            </div>
            <Droppable droppableId={props.board.id}>
                {
                    (provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="board_cards custom-scroll">
                            {
                                props.board?.cards?.map((item, index) => (
                                    <Card key={item.id}
                                          card={item}
                                          removeCard={props.removeCard}
                                          boardId={props.board?.id}
                                          index={index}
                                          updateCard={props.updateCard}
                                    />
                                ))
                            }
                            <EditTable
                                displayClass={"boards_cards_add"}
                                text={"Add Card"}
                                placeholder={"Enter Card Title"}
                                onSubmit={(value) => props.addCard(value, props.board?.id)}
                            />
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>

        </div>
    )
}

export default Board