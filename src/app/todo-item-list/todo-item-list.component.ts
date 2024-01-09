import { Component } from '@angular/core';
import { Item } from '../item';
import { ITEMS } from '../mock-items';

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
}
