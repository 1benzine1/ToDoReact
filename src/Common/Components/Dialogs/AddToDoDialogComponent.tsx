import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { observableTodoStore } from '../../../ObservableTodoStore';

export const AddToDoDialog = (props: { todoListId: string }) => {

  const [open, setOpen] = React.useState(false);
  let txtInputVal: string = '';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    setOpen(false);
    observableTodoStore.addTodoListItem(props.todoListId, txtInputVal);
  };

  const onChangeTxtVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    txtInputVal = e.currentTarget.value;
  }

  return (
    <div>
      <Button style={{ marginTop: '1em' }} variant="contained" color="primary" onClick={handleClickOpen}>
        Add new todo item
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"> Add todo item </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please, input todo item name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Todo name"
            fullWidth
            onChange={onChangeTxtVal}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}