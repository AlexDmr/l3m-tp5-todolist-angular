import {List} from 'immutable';

export interface TodoItem {
  readonly label: string;
  readonly isDone: boolean;
}

export interface TodoList {
  readonly label: string;
  readonly items: List< TodoItem >;
}
