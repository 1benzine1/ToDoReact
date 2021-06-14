import { TaskItem } from "./TaskItemModel";

export class Task{

    header: string = '';
    taskItems: TaskItem [] = [];

    constructor(header: string, taskItems: TaskItem [] ){
        this.header = header;
        this.taskItems = taskItems;
    }
}