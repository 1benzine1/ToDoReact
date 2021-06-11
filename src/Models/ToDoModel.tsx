
// import { v4 as uuidv4 } from 'uuid';

const _ = require ( 'lodash' );

export class ToDoModel{

    id: number = 0;
    name : string = '';
    isDone : boolean = false;

    constructor(name : string, isDone: boolean){

        // this.id = uuidv4();
        this.id = _.uniqueId();
        this.name = name;
        this.isDone = isDone;
    }   
}