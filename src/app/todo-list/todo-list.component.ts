import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TodoService} from '../todo.service';
import {Observable} from 'rxjs';
import {TodoList} from '../definitions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  constructor(private tds: TodoService) { }

  ngOnInit() {
  }

  get todoListObs(): Observable<TodoList> {
    return this.tds.observable;
  }
}
