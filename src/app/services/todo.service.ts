import { Injectable } from '@angular/core';
import { IndexedDbService } from './indexed-db.service';
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
  items$ = this._items.asObservable();
  private _item: Subject<Item> = new Subject<Item>();
  item$ = this._item.asObservable();

  constructor(private indexedDbService: IndexedDbService) {
    this.loadInitialData();
  }

  async loadInitialData() {
    const items = await this.indexedDbService.getAllItems();
    this._items.next(items);
  }

  /**
  * Adds a new item to the list of items.
  * @param item - The item to be added.
  */
  async addItem(item: Item) {
    console.log('addItem', item);
    const currentItems = this._items.getValue();
    await this.indexedDbService.addItem(item);
    // get id of the last item added
    const items = await this.indexedDbService.getAllItems();
    item.id = items[items.length - 1].id;
    this._items.next([...currentItems, item]);
  }

  /**
    * Removes an item from the list of items.
    * @param item - The item to be removed.
    */
  async removeItem(item: Item) {
    const id = item.id!;
    console.log('removeItem', id);
    const currentItems = this._items.getValue();
    const index = currentItems.findIndex(itemInArray => itemInArray.id == item.id);
    currentItems.splice(index, 1);
    await this.indexedDbService.deleteItem(id); // Elimina de IndexedDB
  }

  /**
    * Changes the status of an item.
    * @param item - The item whose status is to be changed.
    */
  async changeStatus(item: Item) {
    console.log('changeStatus', item);
    const currentItems = this._items.getValue();
    const index = currentItems.findIndex(itemInArray => itemInArray.id == item.id);
    currentItems[index].status = item.status;
    await this.indexedDbService.updateItems(currentItems);
    await this.loadInitialData(); // Actualiza la lista de items
  }

  /**
    * Changes the name of an item.
    * @param item - The item whose name is to be changed.
    */
  async changeName(item: Item) {
    console.log('changeName', item);
    const currentItems = this._items.getValue();
    const index = currentItems.findIndex(itemInArray => itemInArray.id == item.id);
    currentItems[index].name = item.name;

    await this.indexedDbService.updateItem(item.id!, item);
    await this.loadInitialData(); // Actualiza la lista de items
  }

  /**
    * Sorts the items based on their status.
    */
  private sortItems(items: Item[]) {
    return items.sort(this.compareItems);
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
}

