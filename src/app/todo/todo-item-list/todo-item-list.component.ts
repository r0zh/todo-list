import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../interfaces/item';
import { ITEMS } from '../mock-items';
import { LocalStorageService } from '../services/localStorageService';

@Component({
  selector: 'app-todo-item-list',
  templateUrl: './todo-item-list.component.html',
})
export class TodoItemListComponent {
  constructor(private localStorageService: LocalStorageService) {}

  @Input() items: Item[] = [];
  // get items from local storage

  @Output() onRemoveItem = new EventEmitter<Item>();
  @Output() onChangeStatus = new EventEmitter<Item>();
  @Output() onChangeName = new EventEmitter<Item>();

  removeItem(item: Item) {
    this.onRemoveItem.emit(item);
  }

  changeStatus(item: Item) {
    this.onChangeStatus.emit(item);
  }

  changeName(item: Item) {
    this.onChangeName.emit(item);
  }
}
