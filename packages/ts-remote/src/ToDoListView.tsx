import React from "react";
import {ToDo} from "@swsl/shared-types";

const ToDoListView = ({list}: {list: ToDo[] } ) => (
    <table>
        <thead>
        <tr>
            <th> Order </th>
            <th> To Do </th>
        </tr>
        </thead>
        <tbody>
        {
            list.map(({content,id, done}) =>  (
                <tr key={`${content}-${id}`}>
                    <td>{id}</td>
                    <td><strong> { done ? (<strike>{content}</strike>) : content }</strong></td>
                </tr>
            ))
        }
        </tbody>
    </table>
)

export default ToDoListView;