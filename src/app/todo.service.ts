import { Injectable } from '@angular/core';
import {TodoItem, TodoList} from './definitions';
import {BehaviorSubject} from 'rxjs';
import {List} from 'immutable';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private subj = new BehaviorSubject<TodoList>({label: 'TodoList L3 MIAGE', items: List([]) });
  readonly observable = this.subj.asObservable();

  constructor() { }

  append(label: string) {
    const L: TodoList = this.subj.getValue();
    this.subj.next( {...L, items: L.items.push( {label, isDone: false} ) } );
  }

  remove(item: TodoItem) {
    const L = this.subj.getValue();
    this.subj.next( {...L, items: L.items.remove( L.items.indexOf(item) ) } );
  }

  updateLabel(item: TodoItem, label: string) {
    if (label !== '') {
      this.updateItem(item, {...item, label} );
    } else {
      this.remove(item);
    }
  }

  updateIsDone(item: TodoItem, isDone: boolean) {
    this.updateItem(item, {...item, isDone} );
  }

  updateItem(item: TodoItem, newItem: TodoItem) {
    const L = this.subj.getValue();
    const i = L.items.indexOf(item);
    this.subj.next( {...L, items: L.items.splice(i, 1, newItem ) } );
  }

}
