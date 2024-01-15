import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';
import { ITEMS } from '../mock-items';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  saveItems(items: Item[]) {
    localStorage.setItem('items', JSON.stringify(items));
  }

  loadItems(): Item[] {
    if (
      !localStorage.getItem('items') ||
      localStorage.getItem('items') === '[]'
    ) {
      localStorage.setItem('items', JSON.stringify(ITEMS));
    }
    const items = localStorage.getItem('items');
    return items ? JSON.parse(items) : [];
  }
}
