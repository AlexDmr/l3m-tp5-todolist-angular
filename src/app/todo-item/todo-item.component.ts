import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TodoItem} from '../definitions';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {
  @Input() item: TodoItem;
  @ViewChild('newTextInput', {static: true}) newTextInput: ElementRef<HTMLInputElement>;
  private editing = false;

  constructor(private tds: TodoService) { }

  ngOnInit() {
  }

  get isDone(): boolean {
    return this.item.isDone;
  }

  set isDone(done: boolean) {
    this.tds.updateIsDone(done, this.item);
  }

  setLabel(txt: string) {
    this.tds.updateLabel(txt, this.item);
  }

  get isEditing(): boolean {
    return this.editing;
  }

  set isEditing(e: boolean) {
    this.editing = e;
    if (e) {
      requestAnimationFrame( () => this.newTextInput.nativeElement.focus() );
    }
  }

  delete() {
    this.tds.remove(this.item);
  }
}
