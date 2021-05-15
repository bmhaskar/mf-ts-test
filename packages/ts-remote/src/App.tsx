import React, {useRef, useState} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ToDos from "./ToDos";
import ToDoListView from "./ToDoListView";
const App = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [todos , setToDo] = useState(ToDos.getAll());
    return (
        <div>Hi there, I'm React from Webpack 5. <h2>From remote</h2>
            <ToDoListView list={todos} />
            <input type="text" ref={inputRef} />
            <button onClick={() => {
                ToDos.add({content: inputRef?.current?.value, done: false,id: todos.length+1 })
                setToDo([...ToDos.getAll()])
            }}>Add</button>
        </div>);
}


ReactDOM.render(<App />, document.getElementById("app"));
