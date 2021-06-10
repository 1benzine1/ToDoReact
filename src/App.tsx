import './App.css';
import { observer } from 'mobx-react-lite';
import { observableTodoStore, ObservableTodoStore } from './ObservableTodoStore';
import { TaskItem } from './Models/TaskItemModel';
import { observable } from 'mobx';
import Button from '@material-ui/core/Button';

const TodoList = observer((props: { store: ObservableTodoStore }) => {
  const onNewTodo = (taskHeader: string) => {
    let result = prompt('Task name') as string;
    observableTodoStore.addTaskItem(taskHeader, new TaskItem(result, false));
  }

  const onRenameHeader = (oldHeader: string) => {
    const newHeader = prompt('New header', oldHeader) || oldHeader;
    observableTodoStore.onRenameHeader(oldHeader, newHeader);
  }

  const createNewToDoList = () => {
    const newHeader = prompt('Input header') as string;
    const newTask = prompt('Input task') as string;
    observableTodoStore.createNewToDoList(newHeader, newTask);
  }

  return (
    <div  >
      <Button variant="contained" onClick={createNewToDoList}>Add new ToDo list</Button>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', marginTop: '10px' }}>
        <div>
          <ul>
            {props.store.todos.map((task, idx) => (
              <div style={{ display: 'list-item', alignItems: 'end', border: '1px solid black', marginTop: '10px' }}>
                <div style={{ display: 'list-item', alignItems: 'center' }}>
                  <Button variant="contained" style={{ marginRight: '1em' }} onClick={() => observableTodoStore.deleteToDoList(task.header)} >Delete ToDo list</Button>
                  <Button variant="contained" style={{ marginRight: '1em' }} onClick={() => onNewTodo(task.header)}>Add ToDo item</Button>
                  <p style={{ marginRight: '10%' }} >(double-click on item for edit)</p>
                </div>
                <p onDoubleClick={() => onRenameHeader(task.header)}>{task.header}</p>
                <TodoView taskItems={task.taskItems} key={idx} />
              </div>
            )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
})

const TodoView = observer((props: { taskItems: TaskItem[], key?: number }) => {
  const onToggleCompleted = (itemName: string) => {
    let index = props.taskItems.findIndex(item => item.name === itemName);
    props.taskItems[index].isDone = !props.taskItems[index].isDone;

    if(props.taskItems.find(i => i.isDone) && props.taskItems.find(i => !i.isDone)){
      props.taskItems.sort((i, j) => Number(i.isDone) - Number(j.isDone));
    }
    else{
      props.taskItems.sort((x, y) =>  x.name.length - y.name.length);
    }
  }

  const onRenameTask = (oldName: string) => {
    let index = props.taskItems.findIndex(i => i.name === oldName);
    props.taskItems[index].name = prompt('New name', oldName) || oldName;
  }

  const listItems = observable(
    props.taskItems.map(i => <li>
      <div>
        <input name="isDoneTask" type='checkbox' className="strikethrough" checked={i.isDone} onChange={() => onToggleCompleted(i.name)} />
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
