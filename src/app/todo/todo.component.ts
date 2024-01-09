import { Component } from '@angular/core';
import { Item } from '../item';
import { LocalStorageService } from '../localStorageService';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  items: Item[] = [];
  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.items = this.localStorageService.loadItems();
  }

  onAddItem(item: Item) {
    console.log('onAddItem', item);
    this.items.push(item);
    this.updateItems();
  }

  onRemoveItem(item: Item) {
    console.log('removeItem', item);
    // get index of the item
    const index = this.items.indexOf(item);
    // if item exists
    if (index > -1) {
      this.items.splice(index, 1);
    }
    // update the items in local storage
    this.updateItems();
  }

  onChangeStatus(item: Item) {
    console.log('onChangeStatus', item);
    // get index of the item
    const index = this.items.indexOf(item);
    // if item exists
    if (index > -1) {
      this.items[index].status = item.status;
    }

    // update the items in local storage
    this.updateItems();
  }

  onChangeName(item: Item) {
    console.log('onChangeName', item);
    // get index of the item
    const index = this.items.indexOf(item);
    // if item exists
    if (index > -1) {
      this.items[index].name = item.name;
    }
    // update the items in local storage
    this.updateItems();
  }

  updateItems() {
    this.localStorageService.saveItems(this.items);
  }
}
