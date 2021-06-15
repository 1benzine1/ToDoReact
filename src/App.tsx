import './App.css';
import { observer } from 'mobx-react-lite';
import { observableTodoStore, ObservableTodoStore } from './ObservableTodoStore';
import { ToDoModel } from './Models/ToDoModel';
import { observable } from 'mobx';
import { Button } from '@material-ui/core';
import { createContext, useContext, useState } from 'react';
import { AddToDoDialog } from './Common/Components/Dialogs/AddToDoDialogComponent';
import { RenameModalWindow } from './Common/Components/Modals/RenameModalWindow/RenameModalWindow';
import React from 'react';


const TodoStoreContext = createContext<ObservableTodoStore>(observableTodoStore);
// const [modalActive, setModalActive] = React.useState(false);

const TodoList = observer(() => {

  let context = useContext(TodoStoreContext);

  const onRenameHeader = (id: string, oldHeader: string) => {
    const newHeader = prompt('New header', oldHeader) || oldHeader;
    context.onRenameHeader(id, newHeader);
  }

  const createNewToDoList = () => {
    const newHeader = prompt('Input header') as string;
    const newTodo = prompt('Input task') as string;
    context.createNewToDoList(newHeader, newTodo);
    observableTodoStore.createNewToDoList(newHeader, newTodo);
  }

  return (
    <div  >
      <Button variant="contained" onClick={createNewToDoList}>Add new ToDo list</Button>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', marginTop: '10px' }}>
        <div>
          <ul>
            {context.todos.map((todoList) => (
              <div key={todoList.id} style={{ display: 'list-item', alignItems: 'end', border: '1px solid black', marginTop: '10px' }}>
                <div style={{ display: 'list-item', alignItems: 'center' }}>
                  <Button variant="contained" style={{ marginRight: '1em' }} onClick={() => context.deleteToDoList(todoList.id)} >Delete ToDo list</Button>
                  <AddToDoDialog todoListId={todoList.id} />
                  <p style={{ marginRight: '10%' }} >(double-click on item for edit)</p>
                </div>
                <p onDoubleClick={() => onRenameHeader(todoList.id, todoList.header)}>{todoList.header}</p>
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

const TodoView = observer((props: { todos: ToDoModel[], key?: number | string }) => {
  const onToggleCompleted = (id: string) => {
    observableTodoStore.onToggleCompleted(id);
  }

  const onRenameToDo = (id: string, oldName: string) => {

    // setModalActive(true);

    let newName = prompt('New name', oldName) || oldName;
    observableTodoStore.onRenameToDoTask(id, newName);
  }

  const listItems = observable(
    props.todos?.map(i => <li key={i.id}>
      <div>
        <input name="isDoneTask" type='checkbox' className="strikethrough" checked={i.isDone} onChange={() => onToggleCompleted(i.id)} />
        <label htmlFor="isDoneTask" onDoubleClick={() => onRenameToDo(i.id, i.name)}>{i.name}</label>
        <button className="deleteToDoItem" onClick={() => observableTodoStore.deleteToDoItem(i.id)}>delete item</button>
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
    <div>
      <TodoList />
      {/* <RenameModalWindow active={modalActive} setActive={setModalActive}/> */}
    </div>
  );
}

export default App;
