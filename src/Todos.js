import {atom} from "recoil"

export const Todos = atom({
    key: "todos",
    default: [{
        id: 1,
        title:"todo1",
        description: "Description of todo1"
    },{
        id: 2,
        title:"todo2",
        description: "Description of todo2"
    },{
        id: 3,
        title:"todo3",
        description: "Description of todo3"
    }]
})