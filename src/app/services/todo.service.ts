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
    item.position = this.getLastPosition();
    console.log(this.getLastPosition())

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
    * Returns the last position.
    */
  getLastPosition() {
    return this._items.getValue().length;
  }

}

