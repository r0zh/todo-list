import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // Saves items to local storage.
  saveItems(items: Item[]) {
    localStorage.setItem('items', JSON.stringify(items));
  }

  // Loads items from local storage.
  loadItems(): Item[] {
    const items = localStorage.getItem('items');
    return items ? JSON.parse(items) : [];
  }
}
