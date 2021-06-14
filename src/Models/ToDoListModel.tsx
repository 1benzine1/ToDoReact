import { ToDoModel } from "./ToDoModel";
import { v4 as uuidv4 } from 'uuid';
import { makeObservable, observable, action } from 'mobx';

export class ToDoListModel{

    id: string =  '';
    header: string = '';
    todoItems: ToDoModel [] = [];

    constructor(header: string, todoItems: ToDoModel [] ){
        makeObservable(this, {
            id: observable,
            header: observable,
            todoItems: observable,
        })

        this.id = uuidv4();
        this.header = header;
        this.todoItems = todoItems;
    }
}