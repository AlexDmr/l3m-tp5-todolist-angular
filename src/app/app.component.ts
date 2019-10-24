import { Component } from '@angular/core';
import {TodoService} from './todo.service';
import {TodoItem, TodoList} from './definitions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private tds: TodoService) {
  }

  get todoListObs(): Observable<TodoList> {
    return this.tds.observable;
  }

}
