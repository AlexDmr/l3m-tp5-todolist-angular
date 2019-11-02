import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TodoService} from '../todo.service';
import {Observable} from 'rxjs';
import {TodoItem, TodoList} from '../definitions';
import {List} from 'immutable';

type FCT_FILTER = (item: TodoItem) => boolean;

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  currentFilter: FCT_FILTER;
  filterAll: FCT_FILTER     = item => true;
  filterDone: FCT_FILTER    = item => item.isDone;
  filterUndone: FCT_FILTER  = item => !item.isDone;

  constructor(private tds: TodoService) {
    this.currentFilter = this.filterAll;
  }

  ngOnInit() {
  }

  clearCompleted(items: List<TodoItem>) {
    this.tds.remove( ...items.filter(this.filterDone) );
  }

  getFilteredItems(items: List<TodoItem>): List<TodoItem> {
    return items.filter( this.currentFilter );
  }

  get todoListObs(): Observable<TodoList> {
    return this.tds.observable;
  }

  append(label: string) {
    this.tds.append(label);
  }

  isAllDone(items: List<TodoItem>): boolean {
    return items.reduce( (acc, item) => acc && item.isDone, true);
  }

  setAllDone(done: boolean, items: List<TodoItem>) {
    this.tds.updateIsDone(done, ...items);
  }

  getNbItemsLeft(items: List<TodoItem>): number {
    return items.reduce( (nb, item) => item.isDone ? nb : nb + 1, 0);
  }
}
