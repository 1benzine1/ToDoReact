import { v4 as uuidv4 } from 'uuid';
import { makeObservable, observable} from 'mobx';

export class ToDoModel{

    id: string = '';
    name : string = '';
    isDone : boolean = false;

    constructor(name : string, isDone: boolean){
        makeObservable(this, {
            id: observable,
            name: observable,
            isDone: observable,
        })

        this.id = uuidv4();
        this.name = name;
        this.isDone = isDone;
    }   
}