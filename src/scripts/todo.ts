export class Item{
    id:number;
    title:string;
    isCompleted:boolean;   
    color:number; 
}
export class Todo{
    todos: { id:number, title:string, isCompleted:boolean, color:number };
    completedTodos:Item[];
    remainingTodos:Item[];
}

export enum Colors{
    Red = 0,
    Green
}
