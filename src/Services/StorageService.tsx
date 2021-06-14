import { ToDoListModel } from "../Models/ToDoListModel";


const key = 'todoItems1';

export class StorageService {

    save = (todos: ToDoListModel[]) => {
        localStorage.setItem(key, JSON.stringify(todos));
    }

    read = () => {
        let todos = localStorage.getItem(key);

        return todos ? JSON.parse(todos as string) : '';
    }
}

export const storageService = new StorageService();
