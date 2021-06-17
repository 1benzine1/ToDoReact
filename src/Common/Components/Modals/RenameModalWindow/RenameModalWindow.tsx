import { Button } from '@material-ui/core';
import { useState } from 'react';
import { observableTodoStore } from '../../../../ObservableTodoStore';
import { IRenameProps } from '../../../Interfaces/RenamePropsInterface';
import './RenameModalWindow.css';

export const RenameModalWindow = (props: IRenameProps) => {

    const [modalActiveTaskRename, setModalActive] = useState(props.isActive ? props.isActive : false);

    return (
        <div className={modalActiveTaskRename ? 'modal active' : 'modal'} >
            <div className={modalActiveTaskRename ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
                <p>Test text</p>
                {props.children}
                <Button onClick={() =>  observableTodoStore.onRenameToDoTask(props.itemId, props.newValue as string)}> Accept </Button>
                <Button onClick={() => setModalActive(false)}> Cancel </Button>
            </div>
        </div>
    );
}