import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root',
})

/**
 * Service for managing todo items.
 */
export class TodoService {
  // Array of todo items.
  items: Item[] = [];

  constructor(private localStorageService: LocalStorageService) {
    this.items = this.localStorageService.loadItems();
    this.sortItems();
  }

  /**
    * Adds a new item to the list of items.
    * @param item - The item to be added.
    */
  addItem(item: Item) {
    console.log('addItem', item);
    this.items.push(item);
    this.sortItems();
    this.updateItems();
  }

  /**
    * Removes an item from the list of items.
    * @param item - The item to be removed.
    */
  removeItem(item: Item) {
    console.log('removeItem', item);
    const index = this.items.indexOf(item);
    console.log(index)
    if (index > -1) {
      this.items.splice(index, 1);
    }
    this.updateItems();
  }

  /**
    * Changes the status of an item.
    * @param item - The item whose status is to be changed.
    */
  changeStatus(item: Item) {
    console.log('changeStatus', item);
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items[index].status = item.status;
    }
    this.sortItems();
    this.updateItems();
  }

  /**
    * Changes the name of an item.
    * @param item - The item whose name is to be changed.
    */
  changeName(item: Item) {
    console.log('changeName', item);
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items[index].name = item.name;
    }
    this.updateItems();
  }

  /**
    * Updates the items in local storage.
    */
  private updateItems() {
    this.localStorageService.saveItems(this.items);
  }

  /**
    * Compares two items based on their status.
    * @param a - The first item.
    * @param b - The second item.
    * @returns A negative number if a comes before b, a positive number if a comes after b, or zero if they are equal.
    */
  private compareItems(a: Item, b: Item): number {
    if (a.status === b.status) {
      return 0;
    } else if (a.status) {
      return 1;
    } else {
      return -1;
    }
  }

  /**
    * Sorts the items based on their status.
    */
  private sortItems() {
    this.items.sort(this.compareItems);
  }
}

