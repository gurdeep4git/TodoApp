import "../sass/todo.scss";

import { Todo, Item, Colors } from "./todo";
import { UI } from "./ui";

class todoApp{
    private _todo:Todo;
    private _item:Item;
    private _ui:UI;
    private todoListInLs:Item[];

    constructor(){
        this._item = new Item();
        this._todo = new Todo();
        this._ui = new UI();

        this._todo.remainingTodos = [];
        this._todo.completedTodos = [];
        this.todoListInLs = [];
        this.bindEvents();
    }

    private bindEvents():void{
        $("#addTodo").click(()=>this.addTodo());
        $("body").on("change","#remainingTodos input[type='checkbox']",(e)=>this.markCompleted($(e.target)));
        $(window).on("load",()=>this.loadTodos());
        $("body").on("click",".remove-icon",(e)=>this.removeTodo($(e.target)));
    }

    private removeTodo(elem:JQuery<HTMLElement>){
        let currId = parseInt(elem.attr("data-id"));
        //Remove from remaining todos
        this._todo.remainingTodos.forEach((item,i)=>{
            if(item.id==currId){
                this._todo.remainingTodos.splice(i,1);
            }
        });
        //Remove from UI
        this._ui.deleteTodoOnUI(elem);
        //remove From LS
        this._todo.remainingTodos = JSON.parse(localStorage.getItem("remainingTodoList"));
        this._todo.remainingTodos.forEach((item,i)=>{
            if(item.id==currId){
                this._todo.remainingTodos.splice(i,1);
            }
        });
        //Update LS
        localStorage.setItem("remainingTodoList", JSON.stringify(this._todo.remainingTodos));

    }

    private loadTodos(){
        if(localStorage.getItem("remainingTodoList") === null){
            this._todo.remainingTodos=[];
        }
        else{
            this._todo.remainingTodos = JSON.parse(localStorage.getItem("remainingTodoList"));
            this._todo.remainingTodos.forEach((item)=>{
            let listHTML = `
                <li class='list-group-item'>
                <div class='form-check'>
                <input class='form-check-input' type='checkbox' value='' id='chb-${item.title}' data-id=${item.id}>
                <label class='form-check-label' for='chb-${item.title}'>
                    ${item.title}
                </label>
                <i class="fa fa-times remove-icon float-right mt-1" data-id=${item.id}></i>
            </div>
            </li>`;
            $('#remainingTodos .list-group').append(listHTML);
            });
        }
    }
    private addTodo(){
        if($("#inputTodo").val().toString().trim()!=""){
            this._item.id = Math.floor(Math.random() * 101); 
            this._item.title = $("#inputTodo").val().toString().trim();
            this._item.isCompleted = false;
            this._item.color = Colors.Red;
            this._todo.todos = {
                id:this._item.id,
                title:this._item.title,
                isCompleted:this._item.isCompleted,
                color:this._item.color
            }
            this._todo.remainingTodos.push(this._todo.todos);
            this._ui.addTodoOnUI(this._todo.todos);
            localStorage.setItem("remainingTodoList", JSON.stringify(this._todo.remainingTodos));
            this._ui.clearForm();
        }
        else{
            return false;
        }
    }

    private markCompleted(elem:JQuery<HTMLElement>){
        let currId = parseInt(elem.attr("data-id"));
        let title = elem.attr("id").split("-");
        let currElemTitle = title[1];

        // remove from remaining todo array
        this._todo.remainingTodos.forEach((item,i)=>{
            if(item.id==currId){
                this._todo.remainingTodos.splice(i,1);
            }
        });

        // Remove form LS
        this._todo.remainingTodos = JSON.parse(localStorage.getItem("remainingTodoList"));
        this._todo.remainingTodos.forEach((item,i)=>{
            if(item.id==currId){
                this._todo.remainingTodos.splice(i,1);
            }
        });
        // change status
        this._item.isCompleted = true;
        // change color
        this._item.color = Colors.Green;
        // add to completed array
        this._todo.todos = {
            id:currId,
            title:currElemTitle,
            isCompleted:this._item.isCompleted,
            color:this._item.color
        }
        this._todo.completedTodos.push(this._todo.todos);
        this._ui.completeTodo(this._todo.todos,elem);

        // After removing update LS
        localStorage.setItem("remainingTodoList", JSON.stringify(this._todo.remainingTodos));
    }
}
new todoApp();
