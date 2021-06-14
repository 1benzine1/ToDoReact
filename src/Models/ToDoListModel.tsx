import { ToDoModel } from "./ToDoModel";
<<<<<<< HEAD
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
=======
// import { v4 as uuidv4 } from 'uuid';

const _ = require ( 'lodash' );

export class ToDoListModel{

    id: number =  0;
    header: string = '';
    todoItems: ToDoModel [] = [];


    constructor(header: string, todoItems: ToDoModel [] ){
        // this.id = uuidv4();
        this.id = _.uniqueId();
>>>>>>> 7e7c884f9407254cbf5a2b814b9c2861caf3920b
        this.header = header;
        this.todoItems = todoItems;
    }
}