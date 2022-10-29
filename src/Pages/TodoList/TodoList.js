import './TodoList.css';
import Board from "../../Components/Board/Board";
import EditTable from "../../Components/EditTable/EditTable";

import {data} from '../../Data/mockData'
import {useEffect, useState} from "react";
import {DragDropContext} from "react-beautiful-dnd";
import {v4} from "uuid";

function TodoList() {
    const [boards, setBoards] = useState(JSON.parse(localStorage.getItem("TodoList")) || [{
        id: v4(),
        title: "To Do",
        cards: [
            {
                id: v4(),
                title: "Card 1",
                tasks: [],
                labels: [{
                    id: v4(),
                    text: "frontend",
                    color: "red"
                }],
                desc: "This is description.",
                date: "",
            },
        ]
    },]);

    const addCard = (title, bid) => {
        const index = boards.findIndex((item) => item.id === bid);
        if (index < 0) return;

        const tempBoards = [...boards];
        tempBoards[index].cards.push({
            id: v4(),
            title,
            tasks: [],
            labels: [],
            desc: "",
            date: "",
        });
        setBoards(tempBoards);

    }
    const removeCard = (cid, bid) => {
        const bIndex = boards.findIndex((item) => item.id === bid)
        if (bIndex < 0) return

        const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid)
        if (cIndex < 0) return

        const tempBoards = [...boards]
        tempBoards[bIndex].cards.splice(cIndex, 1)
        setBoards(tempBoards)
    }
    const updateCard = (cid, bid, card) => {
        const bIndex = boards.findIndex((item) => item.id === bid)
        if (bIndex < 0) return

        const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid)
        if (cIndex < 0) return

        const tempBoards = [...boards]
        tempBoards[bIndex].cards[cIndex] = card
        setBoards(tempBoards)
    }

    const addBoard = (title) => {
        if (title)
            setBoards([
                ...boards,
                {
                    id: v4(),
                    title,
                    cards: [],
                }
            ])
    }
    const removeBoard = (bid) => {
        const tempBoards = boards.filter(item => item.id !== bid)
        setBoards(tempBoards)
    }

    const handleDragEnd = ({destination, source}) => {
        if (!destination)
            return
        if (destination.index === source.index && destination.droppableId === source.droppableId)
            return

        // creating a copy of item before removing it from state.
        let srcIndex = boards.findIndex(object => object.id === source.droppableId)
        let desIndex = boards.findIndex(object => object.id === destination.droppableId)

        const itemCopy = boards[srcIndex].cards[source.index]

        const output = [...boards]
        output[srcIndex].cards.splice(source.index, 1)
        output[desIndex].cards.splice(destination.index, 0, itemCopy)
        setBoards(output)
    }

    useEffect(() => {
        localStorage.setItem("TodoList", JSON.stringify(boards))
    }, [boards])

    return (
        <div className="App">
            <div className="app_navbar">
                <h2>To Do List</h2>
            </div>
            <div className="app_outer">
                <div className="app_boards">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        {
                            boards.map((item) => (
                                <Board key={item.id} board={item}
                                       removeBoard={removeBoard}
                                       addCard={addCard}
                                       removeCard={removeCard}
                                       updateCard={updateCard}
                                />
                            ))
                        }
                    </DragDropContext>
                    <div className="app_boards_board">
                        <EditTable
                            displayClass={"app_boards_board_add"}
                            text={"Add Board"} placeholder={"Enter board title"}
                            onSubmit={(value) => addBoard(value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoList;
