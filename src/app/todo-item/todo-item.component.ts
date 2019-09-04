import {Component, Input, OnInit} from '@angular/core';
import {TodoItem} from '../definitions';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() item: TodoItem;
  isEditing = false;

  constructor(private tds: TodoService) { }

  ngOnInit() {
  }

  remove() {
    this.tds.remove(this.item);
  }
}
