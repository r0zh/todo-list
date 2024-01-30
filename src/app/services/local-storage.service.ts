import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  saveItems(items: Item[]) {
    localStorage.setItem('items', JSON.stringify(items));
  }

  loadItems(): Item[] {
    const items = localStorage.getItem('items');
    return items ? JSON.parse(items) : [];
  }
}
