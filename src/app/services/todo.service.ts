import { Injectable } from '@angular/core';
import { ApiService } from './python.service';
import { Item } from '../interfaces/item';
import { BehaviorSubject, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/**
 * Service for managing todo items.
 */
export class TodoService {
  // Array of todo items.
  private _items: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  items$ = this._items.asObservable();

  constructor(private apiService: ApiService) {
    this.loadItems();
  }

  loadItems(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getAllItems().pipe(
        tap((items: Item[]) => {
          if (items !== null) {
            //sort items by position
            items.sort((a, b) => {
              if (b.position === undefined || a.position === undefined) {
                return -1; // or 1, depending on how you want to handle undefined
              }
              return a.position - b.position;
            });
            this._items.next(items);
            console.log("recargo");
            resolve();
          }
        }),
        catchError((error) => {
          console.error("Error when loading items:", error);
          reject(error);
          throw error; // rethrow the error if you want it to propagate
        })
      ).subscribe();
    });
  }

  /**
  * Adds a new item to the list of items.
  * @param item - The item to be added.
  */
  addItem(item: Item): Promise<void> {
    console.log('addItem', item);
    item.position = this.getTodosLastPosition();
    console.log(this.getTodosLastPosition())

    return new Promise((resolve, reject) => {
      this.apiService.addItem(item).subscribe({
        next: async () => {
          try {
            await this.loadItems(); // Reload the complete list from the server
            resolve();
          } catch (error) {
            console.error("Error when adding character:", error);
            reject(error);
          }
        },
        error: (error: any) => {
          console.error("Error when adding character:", error);
          reject(error);
        }
      });
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
    * Updates an item in the database.
    * @param item - The item whose status is to be changed.
    */
  updateItem(item: Item) {
    console.log('updateItem', item);
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
    * Returns the last position of the list of todo items.
    */
  getTodosLastPosition() {
    let allItems = this._items.getValue();
    let lastPosition = 0;
    // get the last position of the list of items with status 0
    allItems.forEach((item) => {
      if (item.position !== undefined && item.status !== undefined && item.position > lastPosition && item.status == 0) {
        lastPosition = item.position;
      }
    });
    return lastPosition + 1;
  }

  /**
    * Returns the last position of the list of doing items.
    */
  getDoingsLastPosition() {
    let allItems = this._items.getValue();
    let lastPosition = 0;
    // get the last position of the list of items with status 1
    allItems.forEach((item) => {
      if (item.position !== undefined && item.status !== undefined && item.position > lastPosition && item.status == 1) {
        lastPosition = item.position;
      }
    });
    return lastPosition + 1;
  }

  /**
  * Returns the last position of the list of done items.
  */
  getDonesLastPosition() {
    let allItems = this._items.getValue();
    let lastPosition = 0;
    // get the last position of the list of items with status 2
    allItems.forEach((item) => {
      if (item.position !== undefined && item.status !== undefined && item.position > lastPosition && item.status == 2) {
        lastPosition = item.position;
      }
    });
    return lastPosition + 1;
  }
}

