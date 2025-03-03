import React, { useState, useEffect } from "react";
import Create from "./Create";
import axios from 'axios'


function Home(){
    const [todos, setTodos] = useState([])
    useEffect (() => {
        axios.get('http://localhost:3001/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))

    }, [])

    const handlEdit = (id) => {
        axios.put('http://localhost:3001/update/' +id)
        .then(result => console.log(result.data))
        .catch(err => console.log(err))
    }

    const handeldelete = (id) =>{
        axios.delete('http://localhost:3001/delete/' +id)
        .then(result => console.log(result.data))
        .catch(err => console.log(err))
    }
    return (
        <div className="home">
            <h2>Todo List</h2>
            <Create/>
            <br/>
            {
                todos.length === 0?
                <div><h2>No Records</h2></div> :
                todos.map(todo => (
                    <div className="task"> 
                        <div className="checkbox" onClick={ () => handlEdit(todo._id)}>
                            { todo.done ? <BsFillCheckcircleFill className='icon' />
                            :  <BsCircleFill className='icon' />}
                            
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                        </div>
                        <div>
                            <span><BsFillTrashFill className='icon' onClick={ ()=> handeldelete(todo._id)}/></span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Home