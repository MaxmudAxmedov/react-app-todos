// useState
import React, {useState} from "react";

// JavaScripts list
import TodoItem from "../TodoItem/TodoItem";

// scss file
import "./todoList.scss";

function TodoList () {
    const [array, setArray] = useState(JSON.parse(window.localStorage.getItem("array")) || []);
    const [value, setValue] = useState(null);    

    function renderItem(evt) { 
        const newTodo = {
            id: array[array.length - 1]?.id + 1 || 0,
            title: evt.target.value,
            isCompleted: false 
        }

        if(evt.code === "Enter" && evt.target.value !== ""){

            evt.target.value = ""
            window.localStorage.setItem("array", JSON.stringify([...array, newTodo]));
            return setArray([...array, newTodo]);

        }
        else if(evt.target.value === ""){
            setTimeout(function(){
                document.querySelector('.input').classList.add('error');
                document.getElementById('warning').innerText = 'Malumot kiriting !';
                setInterval(function () {
                    document.querySelector('.input').classList.remove('error');
                    document.getElementById('warning').innerText = '';
                }, 3000);
            }, 0);
        }   
    }
    
    function selectedItem (evt) {
        const n = evt.target.dataset.id - 0;
        const fin = array.find(item => item.id === n);
        fin.isCompleted = !fin.isCompleted;
        setArray([...array]);
        window.localStorage.setItem("array", JSON.stringify([...array]));   
    }
    
    function deleteItem (evt) {
        const deleteID = evt.target.dataset.id - 0;
        const filtered = array.filter(item => item.id !== deleteID);
        window.localStorage.setItem("array", JSON.stringify(filtered));
        return setArray(filtered);
    }

    return (
        <div className="todo">
            <input className="input" ref={value} onKeyUp={renderItem} type="text" placeholder="enter your text"/>
            <strong id="warning"></strong>
            <ul className="list">
                {
                    array.map(item => (
                        <TodoItem key={item.id} id={item.id} isCompleted={item.isCompleted} item={item.title} change={selectedItem} deleteItem={(deleteItem)}/>
                    ))
                }
            </ul>
        </div>
    )
}
export default TodoList;