import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Item } from '../item';
import { ITEMS } from '../mock-items';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { LocalStorageService } from '../localStorageService';

@Component({
  selector: 'app-todo-item-list',
  templateUrl: './todo-item-list.component.html',
  styleUrls: ['./todo-item-list.component.css'],
})
export class TodoItemListComponent {
  constructor(private localStorageService: LocalStorageService) {}

  // get items from local storage
  items: Item[] = [];

  ngOnInit(): void {
    this.items = this.localStorageService.loadItems();
  }

  getItems(): Item[] {
    return ITEMS;
  }

  @ViewChild('todoItem') todoItem!: TodoItemComponent;

  onRemoveItem(item: Item) {
    console.log('removeItem', item);
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
    this.updateItems();
  }

  onChangeStatus(item: Item) {
    console.log('onChangeStatus', item);
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items[index].status = item.status;
    }
    this.updateItems();
  }

  updateItems() {
    this.localStorageService.saveItems(this.items);
  }
}
