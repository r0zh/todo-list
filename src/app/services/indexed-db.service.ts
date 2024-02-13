import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private db: IDBPDatabase | undefined;

  constructor() {
    this.connectToDb();
  }

  private async connectToDb() {
    this.db = await openDB('todolist', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('items')) {
          db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  }

  async addItem(item: Item) {
    if (!this.db) return;
    await this.db.add('items', item);
  }

  async getAllItems(): Promise<Item[]> {
    if (!this.db) {
      await this.connectToDb();
    }
    return this.db!.getAll('items');
  }

  async updateItem(id: number, item: Item) {
    if (!this.db || !id || !item) return;
    console.log('updateItem', id, item);
    await this.db.put('items', item);
  }

  async updateItems(items: Item[]) {
    if (!this.db) return;
    console.log('updateItems', items);
    await this.db.clear('items');
    for (const item of items) {
      await this.db.add('items', item);
    }
  }

  async deleteItem(id: number) {
    if (!this.db) return;
    await this.db.delete('items', id);
  }
}
