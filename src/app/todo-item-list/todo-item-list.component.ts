import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Item } from '../item';
import { ITEMS } from '../mock-items';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-item-list',
  templateUrl: './todo-item-list.component.html',
  styleUrls: ['./todo-item-list.component.css'],
})
export class TodoItemListComponent {
  // get items from local storage
  items = ITEMS;

  ngOnInit(): void {
    this.items = this.getItems();
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
  }
}
