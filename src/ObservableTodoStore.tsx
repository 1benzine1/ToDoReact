import { makeObservable, observable, action } from 'mobx';
import { ToDoModel } from './Models/ToDoModel';
import { ToDoListModel } from './Models/ToDoListModel';
import { storageService } from './Services/StorageService';

const _ = require('lodash');

export class ObservableTodoStore {

  todos: ToDoListModel[] = [];

  constructor() {
    makeObservable(this, {
      todos: observable,
      addTodo: action,
      addTodoListItem: action,
      onRenameHeader: action,
      deleteToDoList: action,
      createNewToDoList: action,
      deleteToDoItem: action
    })

    const todosFromStorage: ToDoListModel[] = storageService.read();

    if (todosFromStorage) {
      for (let index = 0; index < todosFromStorage.length; index++) {
        this.todos.push(todosFromStorage[index]);
      }
    }
    else {
      this.todos.push(new ToDoListModel('TestHeader', [new ToDoModel('TestToDo', false)]));
    }
  }

  addTodo(todoList: ToDoListModel) {
    this.todos.push(todoList);
    storageService.save(this.todos);
  }

  addTodoListItem(taskHeader: string, todo: ToDoModel) {
    this.todos.find(e => e.header === taskHeader)?.todoItems.push(todo);
    storageService.save(this.todos);
  }

  onRenameHeader(oldHeader: string, newHeader: string) {
    const index: number = this.todos.findIndex(e => e.header === oldHeader);
    this.todos[index].header = newHeader;
    storageService.save(this.todos);
  }

  deleteToDoList(header: string) {
    this.todos = this.todos.filter(t => t.header !== header);
    storageService.save(this.todos);
  }

  createNewToDoList(header: string, todo: string) {
    this.todos.push(new ToDoListModel(header, [new ToDoModel(todo, false)]));
    storageService.save(this.todos);
  }

  onToggleCompleted(id: number){
    for (let index = 0; index < this.todos.length; index++) {
     let indx = this.todos[index].todoItems.findIndex(i => i.id === id)
     if(indx){
      this.todos[index].todoItems[indx].isDone = !this.todos[index].todoItems[indx].isDone;
      this.todos[index].todoItems[indx] ?  _.sortBy(this.todos[index].todoItems, 'isDone') :  _.sortBy(this.todos[index].todoItems, 'name');
      storageService.save(this.todos);
      break;
     } 
    }
  }


  deleteToDoItem(todoName: string) {

    if (this.todos && this.todos.length > 0) {

      for (let i = 0; i < this.todos.length; i++) {

        if (this.todos[i].todoItems && this.todos[i].todoItems.length > 0) {

          if (this.todos[i].todoItems.filter(i => i.name === todoName)) {

            this.todos[i].todoItems = this.todos[i].todoItems.filter(i => i.name !== todoName);
            storageService.save(this.todos);
            return;
          }
        }
      }
    }
  }
}

export const observableTodoStore = new ObservableTodoStore();