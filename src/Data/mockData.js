import {v4} from "uuid"

export const data = [
    {
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
    },
]

export const colorsChip = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959"
]