import { useState } from "react"
import { Todos } from "./Todos"
import { useRecoilState } from "recoil"

export default function Todo() {

    const [key, setKey] = useState(4)
    const [todos, setTodos] = useRecoilState(Todos)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    // const [buttonVisible, setButtonVisible] = useState(true)
    const [editingTodoId, setEditingTodoId] = useState(null)
    const [editing, setEditing] = useState(false)


    const AddTodo = () => {
        if (!title.trim() || !description.trim()) {
            alert("Please fill all the fields")
        } else {
            setTodos((prevTodos) => [...prevTodos, { id: key, title: title, description: description }])
            setTitle('')
            setDescription('')
            setKey(key + 1)
        }
    }

    const RemoveTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== Number(id)))
    }

    function EditTodo(id) {
        setEditingTodoId(id)
    }

    function SaveTodo(todo) {
        if(!todo.title.trim() || !todo.description.trim()){
            alert("Please fill all the fields")
        }else{
        setEditingTodoId(null)
        }
    }

    return (<>
        <h1 style={{ textAlign: "center" }}>TodoProject</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "center" }}>

            <input type="text" placeholder="Title" style={{ width: "175px", padding: "7px" }} value={title} onChange={(e) => { setTitle(e.target.value) }} />
            <input type="text" placeholder="Description" style={{ width: "250px", padding: "7px" }} value={description} onChange={(e) => { setDescription(e.target.value) }} />

            <button style={{ width: "75px" }} onClick={AddTodo}>Add Todo</button>
            <hr style={{ height: "2px", backgroundColor: "gray", width: "50%", margin: "5px 0px" }} />
            <div>Todos</div>

            {todos.map((todo) => {
                return (
                    <div key={todo.id} style={{ display: "flex", flexDirection: "row", gap: "8px", alignItems: 'center' }}>

                        {editingTodoId == todo.id ? (
                            <input type="text"
                                value={todo.title} 
                                style={{ border: "none", textAlign: "end", fontWeight: 'bold' }} 
                                onChange={(e) => {
                                    const updatedTitle = { ...todo, title: e.target.value }
                                    setTodos((prevTodos) => 
                                        prevTodos.map((t) => t.id == todo.id ? updatedTitle : t)
                                    )
                                }} />
                            ):(
                            <input type="text" readOnly={true} value={`${todo.title}:`} style={{ border: "none", textAlign: "end", fontWeight: 'bold' }} />)}

                        {editingTodoId == todo.id ? (
                            <input 
                            type="text" 
                            value={todo.description} 
                            style={{ border: 'none', textAlign: 'start' }} 
                            onChange={(e) => {
                                const updatedDescription = { ...todo, description: e.target.value };
                                setTodos((prevTodos) => prevTodos.map((t) => t.id === todo.id ? updatedDescription : t));
                              }} /> 
                        ):(

                            <input type="text" readOnly={true} value={todo.description} style={{ border: 'none', textAlign: 'start' }} />)}



                        <button onClick={() => RemoveTodo(todo.id)}>Remove todo</button>

                        {editingTodoId == todo.id ? <button onClick={() => SaveTodo(todo)}>Save</button> : <button onClick={() => EditTodo(todo.id)}>Edit</button>}

                    </div>)
            })}
        </div>

    </>)
}