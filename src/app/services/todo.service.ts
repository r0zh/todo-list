import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  items: Item[] = [];

  constructor(private localStorageService: LocalStorageService) {
    this.items = this.localStorageService.loadItems();
    this.sortItems();
  }

  addItem(item: Item) {
    console.log('addItem', item);
    this.items.push(item);
    this.sortItems();
  }

  removeItem(item: Item) {
    console.log('removeItem', item);
    // get index of the item
    const index = this.items.indexOf(item);
    console.log(index)
    // if item exists
    if (index > -1) {
      this.items.splice(index, 1);
    }
    // update the items in local storage
    this.updateItems();
  }

  changeStatus(item: Item) {
    console.log('changeStatus', item);
    // get index of the item
    const index = this.items.indexOf(item);

    // if item exists
    if (index > -1) {
      this.items[index].status = item.status;
    }

    // reorder the list of items so that the completed items are at the bottom
    this.sortItems();

    // update the items in local storage
    this.updateItems();
  }

  changeName(item: Item) {
    console.log('changeName', item);
    // get index of the item
    const index = this.items.indexOf(item);
    // if item exists
    if (index > -1) {
      this.items[index].name = item.name;
    }
    // update the items in local storage
    this.updateItems();
  }

  private updateItems() {
    this.localStorageService.saveItems(this.items);
  }

  private compareItems(a: Item, b: Item): number {
    if (a.status === b.status) {
      return 0;
    } else if (a.status) {
      return 1;
    } else {
      return -1;
    }
  }

  private sortItems() {
    this.items.sort(this.compareItems);
  }
}
