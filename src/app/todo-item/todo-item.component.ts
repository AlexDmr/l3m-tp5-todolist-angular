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
  private pisEditing = false;

  constructor(private tds: TodoService) { }

  ngOnInit() {
  }

  get isEditing(): boolean {
    return this.pisEditing;
  }

  set isEditing(e: boolean) {
    this.pisEditing = e;
    // Donner le focus au champs input
    requestAnimationFrame( () => this.newTextInput.nativeElement.focus() );
  }

  remove() {
    this.tds.remove(this.item);
  }

  updateIsDone(b: boolean) {
    this.tds.updateIsDone(b, this.item);
  }

  updateLabel(label: string) {
    if (this.isEditing) {
      this.isEditing = false;
      this.tds.updateLabel(label, this.item);
    }
  }
}
