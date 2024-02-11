import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Item } from '../interfaces/item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/**
 * Service for managing todo items.
 */
export class TodoService {
  // Array of todo items.
  items: Item[] = [];
  private _items: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  private _item = new Subject<Item>();

  items$ = this._items.asObservable();
  item$ = this._item.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    this._items.next(this.sortItems(this.localStorageService.loadItems()));
    this.items$.subscribe(() => {
      console.log('change in item '+ this._items.getValue());
      this.saveItems();
    });
  }

  /**
    * Adds a new item to the list of items.
    * @param item - The item to be added.
    */
  addItem(item: Item) {
    console.log('addItem', item);
    const currentItems = this._items.getValue();
    currentItems.push(item);
    this.sortItems(currentItems);
    this._items.next(currentItems);
  }

  /**
    * Removes an item from the list of items.
    * @param item - The item to be removed.
    */
  removeItem(item: Item) {
    console.log('removeItem', item);
    const currentItems = this._items.getValue();
    const index = currentItems.indexOf(item);
    console.log(index)
    if (index > -1) {
      currentItems.splice(index, 1);
    }
    this._items.next(currentItems);
  }

  /**
    * Changes the status of an item.
    * @param item - The item whose status is to be changed.
    */
  changeStatus(item: Item) {
    console.log('changeStatus', item);
    const currentItems = this._items.getValue();
    const index = currentItems.indexOf(item);
    console.log(index)
    if (index > -1) {
      currentItems[index].status = item.status;
    }
    this.sortItems(currentItems);
    this._items.next(currentItems);
  }

  /**
    * Changes the name of an item.
    * @param item - The item whose name is to be changed.
    */
  changeName(item: Item) {
    console.log('changeName', item);
    const currentItems = this._items.getValue();
    const index = currentItems.indexOf(item);
    if (index > -1) {
      currentItems[index].name = item.name;
    }
    this._items.next(currentItems);
  }


  /**
    * Updates the items in local storage.
    */
  private saveItems() {
    this.localStorageService.saveItems(this._items.getValue())
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
  private sortItems(items: Item[]) {
    return items.sort(this.compareItems);
  }
}

