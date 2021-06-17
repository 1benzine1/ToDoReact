import { ReactChild } from 'react';
import { ObservableTodoStore } from '../../ObservableTodoStore';

export interface IRenameProps {
      itemId: string,
      isActive: boolean,
      children: ReactChild,
      newValue: string | undefined,
      setActive?: Function
 }
