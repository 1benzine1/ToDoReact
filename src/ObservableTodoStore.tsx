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
      addTodoListItem: action,
      onRenameHeader: action,
      deleteToDoList: action,
      createNewToDoList: action,
      deleteToDoItem: action,
      onToggleCompleted: action,
      onRenameToDoTask: action
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

  addTodoListItem(id: string, todoName: string) {
    this.todos.find(e => e.id === id)?.todoItems.push(new ToDoModel(todoName, false));
    storageService.save(this.todos);
  }

  onRenameHeader(id: string, newHeader: string) {
    const index: number = this.todos.findIndex(e => e.id === id);
    this.todos[index].header = newHeader;
    storageService.save(this.todos);
  }

  deleteToDoList(id: string) {
    this.todos = this.todos.filter(t => t.id !== id);
    storageService.save(this.todos);
  }

  createNewToDoList(header: string, todo: string) {
    this.todos.push(new ToDoListModel(header, [new ToDoModel(todo, false)]));
    storageService.save(this.todos);
  }

  onToggleCompleted(id: string) {
    for (let index = 0; index < this.todos.length; index++) {
      let indx = this.todos[index].todoItems.findIndex(i => i.id === id)
      if (indx >= 0) {
        this.todos[index].todoItems[indx].isDone = !this.todos[index].todoItems[indx].isDone;
        this.todos[index].todoItems = _.sortBy(this.todos[index].todoItems, 'isDone');
        storageService.save(this.todos);
        break;
      }
    }
  }

  deleteToDoItem(todoId: string) {

    if (this.todos && this.todos.length > 0) {

      for (let i = 0; i < this.todos.length; i++) {

        if (this.todos[i].todoItems && this.todos[i].todoItems.length > 0) {

          if (this.todos[i].todoItems.findIndex(i => i.id === todoId) >= 0) {

            this.todos[i].todoItems = this.todos[i].todoItems.filter(i => i.id !== todoId);
            storageService.save(this.todos);
            break;
          }
        }
      }
    }
  }
  
  onRenameToDoTask(id: string, newName: string){
  
    if (this.todos && this.todos.length > 0) {
  
      for (let i = 0; i < this.todos.length; i++) {
  
        if (this.todos[i].todoItems && this.todos[i].todoItems.length > 0) {
  
          let index = this.todos[i].todoItems.findIndex(i => i.id === id);

          if ( index >= 0) {
            this.todos[i].todoItems[index].name = newName;
            storageService.save(this.todos);
            break;
          }
        }
      }
    }
  }
}

export const observableTodoStore = new ObservableTodoStore();