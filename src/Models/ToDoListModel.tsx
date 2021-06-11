import { ToDoModel } from "./ToDoModel";
// import { v4 as uuidv4 } from 'uuid';

const _ = require ( 'lodash' );

export class ToDoListModel{

    id: number =  0;
    header: string = '';
    todoItems: ToDoModel [] = [];


    constructor(header: string, todoItems: ToDoModel [] ){
        // this.id = uuidv4();
        this.id = _.uniqueId();
        this.header = header;
        this.todoItems = todoItems;
    }
}