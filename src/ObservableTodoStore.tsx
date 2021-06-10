import { makeObservable, observable, computed, action } from 'mobx';
import { TaskItem } from './Models/TaskItemModel';
import { Task } from './Models/TaskModel';
import { storageService } from './Services/StorageService';

export class ObservableTodoStore {

  todos: Task[] = [];

  constructor() {
    makeObservable(this, {
      todos: observable,
      addTodo: action,
      addTaskItem: action,
      onRenameHeader: action,
      deleteToDoList: action,
      createNewToDoList: action,
      deleteToDoItem: action
    })

    const todosFromStorage: Task[] = storageService.read();

    if (todosFromStorage) {
      for (let index = 0; index < todosFromStorage.length; index++) {
        this.todos.push(todosFromStorage[index]);
      }
    }
    else {
      this.todos.push(new Task('TestHeader', [new TaskItem('TestTask', false)]));
    }
  }

  addTodo(task: Task) {
    this.todos.push(task);
    storageService.save(this.todos);
  }

  addTaskItem(taskHeader: string, taskItem: TaskItem) {
    this.todos.find(e => e.header === taskHeader)?.taskItems.push(taskItem);
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

  createNewToDoList(header: string, task: string) {
    this.todos.push(new Task(header, [new TaskItem(task, false)]));
    storageService.save(this.todos);
  }

  deleteToDoItem(itemName: string) {

    if (this.todos && this.todos.length > 0) {

      for (let i = 0; i < this.todos.length; i++) {

        if (this.todos[i].taskItems && this.todos[i].taskItems.length > 0) {

          if (this.todos[i].taskItems.filter(i => i.name === itemName)) {

            this.todos[i].taskItems = this.todos[i].taskItems.filter(i => i.name !== itemName);
            storageService.save(this.todos);
            return;
          }
        }
      }
    }
  }
}

export const observableTodoStore = new ObservableTodoStore();