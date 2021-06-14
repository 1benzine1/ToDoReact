<<<<<<< HEAD
import { v4 as uuidv4 } from 'uuid';
import { makeObservable, observable, action } from 'mobx';

export class ToDoModel{

    id: string = '';
=======

// import { v4 as uuidv4 } from 'uuid';

const _ = require ( 'lodash' );

export class ToDoModel{

    id: number = 0;
>>>>>>> 7e7c884f9407254cbf5a2b814b9c2861caf3920b
    name : string = '';
    isDone : boolean = false;

    constructor(name : string, isDone: boolean){

<<<<<<< HEAD
        makeObservable(this, {
            id: observable,
            name: observable,
            isDone: observable,
        })

        this.id = uuidv4();
=======
        // this.id = uuidv4();
        this.id = _.uniqueId();
>>>>>>> 7e7c884f9407254cbf5a2b814b9c2861caf3920b
        this.name = name;
        this.isDone = isDone;
    }   
}