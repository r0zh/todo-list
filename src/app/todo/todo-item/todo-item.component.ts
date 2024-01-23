import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Item } from '../../interfaces/item';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  @Input() item?: Item;

  @Output() onChangeStatus = new EventEmitter<Item>();

  changeStatus() {
    if (this.item) {
      this.item.status = !this.item.status;
      this.onChangeStatus.emit(this.item);
    }
  }

  @Output() onChangeName = new EventEmitter<Item>();

  changeName(name: string) {
    this.onChangeName.emit(this.item);
  }

  @Output() onRemoveItem = new EventEmitter<Item>();

  removeItem() {
    this.onRemoveItem.emit(this.item);
  }
}
