import './App.css';
import { observer } from 'mobx-react-lite';
import { observableTodoStore, ObservableTodoStore } from './ObservableTodoStore';
import { ToDoModel } from './Models/ToDoModel';
import { observable } from 'mobx';
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
  }

  const createNewToDoList = () => {
    const newHeader = prompt('Input header') as string;
    const newTodo = prompt('Input task') as string;
    observableTodoStore.createNewToDoList(newHeader, newTodo);
  }

  return (
    <div  >
      <Button variant="contained" onClick={createNewToDoList}>Add new ToDo list</Button>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', marginTop: '10px' }}>
        <div>
          <ul>
            {props.store.todos.map((todoList) => (
              <div key={todoList.id} style={{ display: 'list-item', alignItems: 'end', border: '1px solid black', marginTop: '10px' }}>
                <div style={{ display: 'list-item', alignItems: 'center' }}>
                  <Button variant="contained" style={{ marginRight: '1em' }} onClick={() => observableTodoStore.deleteToDoList(todoList.header)} >Delete ToDo list</Button>
                  <Button variant="contained" style={{ marginRight: '1em' }} onClick={() => onNewTodo(todoList.header)}>Add ToDo item</Button>
                  <p style={{ marginRight: '10%' }} >(double-click on item for edit)</p>
                </div>
                <p onDoubleClick={() => onRenameHeader(todoList.header)}>{todoList.header}</p>
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
  }

  const listItems = observable(
    props.todos?.map(i => <li key={i.id}>
      <div>
        <input name="isDoneTask" type='checkbox' className="strikethrough" checked={i.isDone} onChange={() => onToggleCompleted(i.id)} />
        <label htmlFor="isDoneTask" onDoubleClick={() => onRenameTask(i.name)}>{i.name}</label>
        <button className="deleteToDoItem" onClick={() => observableTodoStore.deleteToDoItem(i.name)}>delete item</button>
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
    <div><TodoList store={observableTodoStore} /></div>
  );
}

export default App;
