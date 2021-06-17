import { observer } from 'mobx-react-lite';
import { observable } from 'mobx';
import { Button, Input } from '@material-ui/core';
import { createContext, useContext, useState } from 'react';
import { ObservableTodoStore, observableTodoStore } from '../../../ObservableTodoStore';
import { RenameModalWindow } from '../../Components/Modals/RenameModalWindow/RenameModalWindow';
import { AddToDoDialog } from '../../Components/Dialogs/AddToDoDialogComponent';
import { ToDoModel } from '../../../Models/ToDoModel';
import { IRenameProps } from '../../Interfaces/RenamePropsInterface';

const TodoStoreContext = createContext<ObservableTodoStore>(observableTodoStore);
// let modalActive: boolean = observable<boolean>((value: boolean));
let modalActiveTaskRename: boolean = false;
let txtValueTaskRename: string = '';

const ActiveModal = observer((props: IRenameProps) => {
  const [modalActiveTaskRename, setModalActive] = useState(props.isActive ? props.isActive : false);
  return (<RenameModalWindow isActive={modalActiveTaskRename} itemId={props.itemId} newValue={props.newValue}>
    {props.children}
  </RenameModalWindow>);
})

const TodoList = observer(() => {

  let context = useContext(TodoStoreContext);

  const onRenameHeader = (id: string, oldHeader: string) => {
    const newHeader = prompt('New header', oldHeader) || oldHeader;

    modalActiveTaskRename = true;

    context.onRenameHeader(id, newHeader);
  }

  const createNewToDoList = () => {
    const newHeader = prompt('Input header') as string;
    const newTodo = prompt('Input task') as string;
    context.createNewToDoList(newHeader, newTodo);
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
    modalActiveTaskRename = true;

    let newName = prompt('New name', oldName) || oldName;
    observableTodoStore.onRenameToDoTask(id, newName);
  }

  const onChangeNameTodo = (e : HTMLInputElement) => {
    txtValueTaskRename = e.value;
  }

  const listItems = observable(
    props.todos?.map(i => <li key={i.id}>
      <div>
        <ActiveModal key={i.id} isActive={modalActiveTaskRename} itemId={i.id} newValue={txtValueTaskRename}>
          <div>
            <p>Input please new todo name</p>
            <Input name='taskRenameInput' value={txtValueTaskRename} onChange={() => onChangeNameTodo} />
          </div>
        </ActiveModal>

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

export function HomePage() {
  return (<div>
    <TodoList />
  </div>
  );
}