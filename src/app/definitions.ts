import {List} from 'immutable';

export interface TodoItem {
  readonly label: string;
  readonly isDone: boolean;
  readonly color: string;
}

export interface TodoList {
  readonly label: string;
  readonly items: List< TodoItem >;
}

export function tdlToString(tdl: TodoList): string {
  return JSON.stringify(tdl);
}

export function strToTdl(str: string): TodoList {
  const obj = JSON.parse(str);
  return {...obj, items: List(obj.items)};
}
