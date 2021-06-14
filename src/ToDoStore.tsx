import React from 'react';
import { TaskItem } from './Models/TaskItemModel';
import { Task } from './Models/TaskModel';

export class TodoStore{

    todos: Task[] = [];
    task: Task = new Task('123', [ new TaskItem('dasdas', false)]);

    constructor(){
        
        this.todos.push(this.task);
    }

    addTodo(task : Task) {
        this.todos.push(task);
    }
}