import { Task } from "../Models/TaskModel";


const key = 'todoItems';

export class StorageService {

    save = (todos: Task[]) => {
        localStorage.setItem(key, JSON.stringify(todos));
    }

    read = () => {
        let todos = localStorage.getItem(key);

        return todos ? JSON.parse(todos as string) : '';
    }
}

export const storageService = new StorageService();
