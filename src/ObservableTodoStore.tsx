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
<<<<<<< HEAD
=======
      addTodo: action,
>>>>>>> 7e7c884f9407254cbf5a2b814b9c2861caf3920b
      addTodoListItem: action,
      onRenameHeader: action,
      deleteToDoList: action,
      createNewToDoList: action,
<<<<<<< HEAD
      deleteToDoItem: action,
      onToggleCompleted: action,
      onRenameToDoTask: action
=======
      deleteToDoItem: action
>>>>>>> 7e7c884f9407254cbf5a2b814b9c2861caf3920b
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

<<<<<<< HEAD
  addTodoListItem(id: string, todo: ToDoModel) {
    this.todos.find(e => e.id === id)?.todoItems.push(todo);
    storageService.save(this.todos);
  }

  onRenameHeader(id: string, newHeader: string) {
    const index: number = this.todos.findIndex(e => e.id === id);
=======
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
>>>>>>> 7e7c884f9407254cbf5a2b814b9c2861caf3920b
    this.todos[index].header = newHeader;
    storageService.save(this.todos);
  }

<<<<<<< HEAD
  deleteToDoList(id: string) {
    this.todos = this.todos.filter(t => t.id !== id);
=======
  deleteToDoList(header: string) {
    this.todos = this.todos.filter(t => t.header !== header);
>>>>>>> 7e7c884f9407254cbf5a2b814b9c2861caf3920b
    storageService.save(this.todos);
  }

  createNewToDoList(header: string, todo: string) {
    this.todos.push(new ToDoListModel(header, [new ToDoModel(todo, false)]));
    storageService.save(this.todos);
  }

<<<<<<< HEAD
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
=======
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
>>>>>>> 7e7c884f9407254cbf5a2b814b9c2861caf3920b

    if (this.todos && this.todos.length > 0) {

      for (let i = 0; i < this.todos.length; i++) {

        if (this.todos[i].todoItems && this.todos[i].todoItems.length > 0) {

<<<<<<< HEAD
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
=======
          if (this.todos[i].todoItems.filter(i => i.name === todoName)) {

            this.todos[i].todoItems = this.todos[i].todoItems.filter(i => i.name !== todoName);
            storageService.save(this.todos);
            return;
>>>>>>> 7e7c884f9407254cbf5a2b814b9c2861caf3920b
          }
        }
      }
    }
  }
}

export const observableTodoStore = new ObservableTodoStore();