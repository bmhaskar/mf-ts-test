import {List, ListFilter, ToDo} from "@swsl/shared-types";

  class ToDos implements List<ToDo>{
    private constructor() { }
    private todos: ToDo[] = [] as ToDo[];
    static instance: ToDos = new ToDos();
    add(todo: ToDo): void {
        ToDos.instance.todos.push(todo);
    }
    getAll(): ToDo[] {
        return ToDos.instance.todos;
    }
    select(filter:ListFilter<ToDo> ): ToDo[] {
        return ToDos.instance.todos.filter(filter);
    }
}
const MyToDo:ToDo = {id: 1, content: "dummyTodo", done: true};
ToDos.instance.add( MyToDo);
export default ToDos.instance;

