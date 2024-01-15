import { Item } from '../interfaces/item';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent {
  item: Item = {
    name: '',
    status: false,
  };

  @Output() onAddItem = new EventEmitter<Item>();

  addItem() {
    if (this.item.name != '') {
      this.onAddItem.emit({ ...this.item });
      this.item = {
        name: '',
        status: false,
      };
    }
  }
}
