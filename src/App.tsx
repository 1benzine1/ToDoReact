import './App.css';
import { observer } from 'mobx-react-lite';
import { observableTodoStore, ObservableTodoStore } from './ObservableTodoStore';
import { ToDoModel } from './Models/ToDoModel';
import { observable } from 'mobx';
<<<<<<< HEAD
import {Button} from '@material-ui/core';
import {createContext, useContext} from 'react';

const TodoStoreContext = createContext<ObservableTodoStore>(observableTodoStore);

const TodoList = observer(() => {
  
  let context = useContext(TodoStoreContext);

  const onNewTodo = (id: string) => {
    let result = prompt('ToDo name') as string;
    context.addTodoListItem(id, new ToDoModel(result, false));
  }

  const onRenameHeader = (id: string, oldHeader: string) => {
    const newHeader = prompt('New header', oldHeader) || oldHeader;
    context.onRenameHeader(id, newHeader);
=======
import Button from '@material-ui/core/Button';

const _ = require('lodash');

const TodoList = observer((props: { store: ObservableTodoStore }) => {
  const onNewTodo = (todoHeader: string) => {
    let result = prompt('ToDo name') as string;
    observableTodoStore.addTodoListItem(todoHeader, new ToDoModel(result, false));
  }

  const onRenameHeader = (oldHeader: string) => {
    const newHeader = prompt('New header', oldHeader) || oldHeader;
    observableTodoStore.onRenameHeader(oldHeader, newHeader);
>>>>>>> 7e7c884f9407254cbf5a2b814b9c2861caf3920b
  }

  const createNewToDoList = () => {
    const newHeader = prompt('Input header') as string;
    const newTodo = prompt('Input task') as string;
<<<<<<< HEAD
    context.createNewToDoList(newHeader, newTodo);
=======
    observableTodoStore.createNewToDoList(newHeader, newTodo);
>>>>>>> 7e7c884f9407254cbf5a2b814b9c2861caf3920b
  }

  return (
    <div  >
      <Button variant="contained" onClick={createNewToDoList}>Add new ToDo list</Button>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', marginTop: '10px' }}>
        <div>
          <ul>
<<<<<<< HEAD
            {context.todos.map((todoList) => (
              <div key={todoList.id} style={{ display: 'list-item', alignItems: 'end', border: '1px solid black', marginTop: '10px' }}>
                <div style={{ display: 'list-item', alignItems: 'center' }}>
                  <Button variant="contained" style={{ marginRight: '1em' }} onClick={() => context.deleteToDoList(todoList.id)} >Delete ToDo list</Button>
                  <Button variant="contained" style={{ marginRight: '1em' }} onClick={() => onNewTodo(todoList.id)}>Add ToDo item</Button>
                  <p style={{ marginRight: '10%' }} >(double-click on item for edit)</p>
                </div>
                <p onDoubleClick={() => onRenameHeader(todoList.id, todoList.header)}>{todoList.header}</p>
=======
            {props.store.todos.map((todoList) => (
              <div key={todoList.id} style={{ display: 'list-item', alignItems: 'end', border: '1px solid black', marginTop: '10px' }}>
                <div style={{ display: 'list-item', alignItems: 'center' }}>
                  <Button variant="contained" style={{ marginRight: '1em' }} onClick={() => observableTodoStore.deleteToDoList(todoList.header)} >Delete ToDo list</Button>
                  <Button variant="contained" style={{ marginRight: '1em' }} onClick={() => onNewTodo(todoList.header)}>Add ToDo item</Button>
                  <p style={{ marginRight: '10%' }} >(double-click on item for edit)</p>
                </div>
                <p onDoubleClick={() => onRenameHeader(todoList.header)}>{todoList.header}</p>
>>>>>>> 7e7c884f9407254cbf5a2b814b9c2861caf3920b
                <TodoView todos={todoList.todoItems} key={todoList.id} />
              </div>
            )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
})

<<<<<<< HEAD
const TodoView = observer((props: { todos: ToDoModel[], key?: number | string }) => {
  const onToggleCompleted = (id: string) => {
    observableTodoStore.onToggleCompleted(id);
  }

  const onRenameTask = (id: string, oldName: string) => {
    let newName = prompt('New name', oldName) || oldName;
    observableTodoStore.onRenameToDoTask(id, newName);
=======
const TodoView = observer((props: { todos: ToDoModel[], key?: number }) => {
  const onToggleCompleted = (id: number) => {
    observableTodoStore.onToggleCompleted(id);


    // let index = props.todos.findIndex(item => item.id === id);
    // props.todos[index].isDone = !props.todos[index].isDone;

    // if(props.todos.find(i => i.isDone) && props.todos.find(i => !i.isDone)){
    //   props.todos.sort((i, j) => Number(i.isDone) - Number(j.isDone));
    // }
    // else{
    //   props.todos.sort((x, y) =>  x.name.length - y.name.length);
    // }
  }

  const onRenameTask = (oldName: string) => {
    let index = props.todos.findIndex(i => i.name === oldName);
    props.todos[index].name = prompt('New name', oldName) || oldName;
>>>>>>> 7e7c884f9407254cbf5a2b814b9c2861caf3920b
  }

  const listItems = observable(
    props.todos?.map(i => <li key={i.id}>
      <div>
        <input name="isDoneTask" type='checkbox' className="strikethrough" checked={i.isDone} onChange={() => onToggleCompleted(i.id)} />
<<<<<<< HEAD
        <label htmlFor="isDoneTask" onDoubleClick={() => onRenameTask(i.id, i.name)}>{i.name}</label>
        <button className="deleteToDoItem"  onClick={() => observableTodoStore.deleteToDoItem(i.id)}>delete item</button>
=======
        <label htmlFor="isDoneTask" onDoubleClick={() => onRenameTask(i.name)}>{i.name}</label>
        <button className="deleteToDoItem" onClick={() => observableTodoStore.deleteToDoItem(i.name)}>delete item</button>
>>>>>>> 7e7c884f9407254cbf5a2b814b9c2861caf3920b
      </div>
    </li>))

  return (
    <div>
      {listItems}
    </div>
  );
})

function App() {
  return (
<<<<<<< HEAD
      <div><TodoList/></div>
=======
    <div><TodoList store={observableTodoStore} /></div>
>>>>>>> 7e7c884f9407254cbf5a2b814b9c2861caf3920b
  );
}

export default App;
