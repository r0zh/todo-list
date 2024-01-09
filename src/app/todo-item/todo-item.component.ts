import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Item } from '../item';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() item?: Item;

  changeStatus() {
    if (this.item) {
      this.item.status = !this.item.status;
    }
  }

  @Output() onRemoveItem = new EventEmitter<Item>();

  removeItem() {
    this.onRemoveItem.emit(this.item);
  }
}
