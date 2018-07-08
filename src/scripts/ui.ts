import { Todo, Item, Colors } from './todo';

export class UI{
    public addTodoOnUI(todo:Item){
        let listHTML = `
            <li class='list-group-item'>
                <div class='form-check'>
                    <input class='form-check-input' type='checkbox' value='' id='chb-${todo.title}' data-id=${todo.id}>
                    <label class='form-check-label' for='chb-${todo.title}'>
                        ${todo.title}
                    </label>
                    <i class="fa fa-times remove-icon float-right mt-1" data-id=${todo.id}></i>
                </div>
            </li>
        `;
        $('#remainingTodos .list-group').append(listHTML);
    }
    
    public deleteTodoOnUI(elem:JQuery<HTMLElement>){
        elem.closest(".list-group-item").remove();
    }
    
    //elem:JQuery<HTMLElement>
    public completeTodo(todo:Item, elem:JQuery<HTMLElement>){
        elem.closest(".list-group-item").remove();
        let completedTodoHTML =  this.getCompletedTodoHTML(todo);
        $("#completedTodos .list-group").append(completedTodoHTML);
    }

    private getCompletedTodoHTML(todo:Item){
        let HTML;
        if(todo.color==Colors.Green){
            HTML = `<li class='list-group-item bg-success text-white' style='text-decoration: line-through;'>${todo.title}</li>`;
        }
        return HTML;
    }
    public clearForm(){
        ($('#todoForm')[0] as HTMLFormElement).reset();
    }
}