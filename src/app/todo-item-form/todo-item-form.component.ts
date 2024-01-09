import { Item } from './../item';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-item-form',
  templateUrl: './todo-item-form.component.html',
  styleUrls: ['./todo-item-form.component.css'],
})
export class TodoItemFormComponent {
  item: Item = {
    name: '',
    status: false,
  };

  @Output() onAddItem = new EventEmitter<Item>();

  addItem() {
    if (this.item.name != '') {
      this.onAddItem.emit(this.item);
      this.item = {
        name: '',
        status: false,
      };
    }
  }
}
