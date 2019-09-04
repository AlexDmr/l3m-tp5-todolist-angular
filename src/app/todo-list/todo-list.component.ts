import { Component, OnInit } from '@angular/core';
import {TodoService} from '../todo.service';
import {TodoList} from '../definitions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(private tds: TodoService) { }

  ngOnInit() {
  }

  append(label: string) {
    this.tds.append(label);
  }

  get todolistObs(): Observable<TodoList> {
    return this.tds.observable;
  }

}
