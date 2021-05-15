
export type ToDo = {
    id: number,
    content: string,
    done: boolean
}
export type ListFilter<T> =  (v: T) => T
export interface List<T> {
    add(item:T): void;
    getAll(): T[];
    select(filter: ListFilter<T> ) :  T[]
}

export type ToDoListComponent = React.StatelessComponent<{
    list: ToDo[];
}>;