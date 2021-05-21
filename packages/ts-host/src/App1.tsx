import React, { useRef, useState} from "react";
import "./index.css";
import  "./tsremote-mf.decl.d";
// import ToDos  from "@swsl/ts-remote-mf/ToDos";
import ToDoListView  from "@swsl/ts-remote-mf/ToDoListView";

import {ToDo, ToDoListComponent} from "@swsl/shared-types";

const ToDoListViewComp = ToDoListView as ToDoListComponent;
const App1 = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [todos , setToDo] = useState<ToDo[]>([]);
    return (
        <div>Hi there, I'm React from Webpack 6. <h2>From host</h2>
            {/*<ToDoListViewComp list={todos} />*/}
            <input type="text" ref={inputRef} />
            <button onClick={() => {
                // ToDos.add()
                setToDo([...todos, {content: inputRef?.current?.value, done: false,id: todos.length+1 }])
            }}>Add</button>
        </div>);
}
export default App1;

