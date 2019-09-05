import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TodoService} from '../todo.service';
import {TodoItem, TodoList} from '../definitions';
import {Observable} from 'rxjs';
import { List } from 'immutable';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  currentFilter: FctFilterItems = FilterAllItems;

  constructor(private tds: TodoService) { }

  ngOnInit() {
  }

  append(label: string) {
    this.tds.append(label);
  }

  get todolistObs(): Observable<TodoList> {
    return this.tds.observable;
  }

  get allIsChecked(): boolean {
    return this.tds.allIsChecked();
  }

  toggleAllItems() {
    const isDone = !this.allIsChecked;
    this.tds.updateIsDone(isDone, ...this.tds.getCurrentTodoList().items);
  }

  filterAll() {
    this.currentFilter = FilterAllItems;
  }

  get isFilterAll(): boolean {
    return this.currentFilter === FilterAllItems;
  }

  filterDone() {
    this.currentFilter = FilterDoneItems;
  }

  get isFilterDone(): boolean {
    return this.currentFilter === FilterDoneItems;
  }

  filterUndone() {
    this.currentFilter = FilterUndoneItems;
  }

  get isFilterUndone(): boolean {
    return this.currentFilter === FilterUndoneItems;
  }

  get items(): List<TodoItem> {
    return this.tds.getCurrentTodoList().items.filter( this.currentFilter );
  }
}

type FctFilterItems = (item: TodoItem) => boolean;
const FilterAllItems: FctFilterItems = item => true;
const FilterDoneItems: FctFilterItems = item => item.isDone;
const FilterUndoneItems: FctFilterItems = item => !item.isDone;
