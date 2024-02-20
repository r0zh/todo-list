import { Injectable } from '@angular/core';
import { ApiService } from './laravel.service';
import { Item } from '../interfaces/item';
import { BehaviorSubject } from 'rxjs';

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

  constructor(private apiService: ApiService) {
    this.loadItems();
  }

  loadItems() {
    this.apiService.getAllItems().subscribe((items: Item[]) => {
      if (items !== null) {
        console.log(items);
        this._items.next(items);
      }
    });
    console.log("La Consulta a la BD devuelve: ", this._items);
  }

  /**
  * Adds a new item to the list of items.
  * @param item - The item to be added.
  */
  addItem(item: Item) {
    console.log('addItem', item);
    this.apiService.addItem(item).subscribe({
      next: () => {
        this.loadItems(); // Recargar la lista completa desde el servidor
      },
      error: (error: any) => {
        console.error("Error al añadir personaje:", error);
      }
    });
  }

  /**
    * Removes an item from the list of items.
    * @param item - The item to be removed.
    */
  removeItem(item: Item) {
    console.log('removeItem', item.id);
    this.apiService.removeItem(item).subscribe({
      next: () => {
        this.loadItems(); // Recargar la lista completa desde el servidor
      },
      error: (error: any) => {
        console.error("Error al borrar personaje:", error);
      }
    });
  }

  /**
    * Changes the status of an item.
    * @param item - The item whose status is to be changed.
    */
  changeStatus(item: Item) {
    console.log('changeStatus', item);
    if (item.id) {
      this.apiService.updateItem(item).subscribe({
        next: () => {
          this.loadItems(); // Actualiza la lista de items
        },
        error: (error: any) => {
          console.error("Error al cambiar el estado del personaje:", error);
        }
      });
    }
  }

  /**
    * Changes the name of an item.
    * @param item - The item whose name is to be changed.
    */
  changeName(item: Item) {
    console.log('changeName', item);
    if (item.id) {
      this.apiService.updateItem(item).subscribe({
        next: () => {
          this.loadItems(); // Actualiza la lista de items
        },
        error: (error: any) => {
          console.error("Error al cambiar el estado del personaje:", error);
        }
      });
    }
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

