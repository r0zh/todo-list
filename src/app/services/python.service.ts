import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Item } from '../interfaces/item';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8081';
  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Item[]> {
    return this.http.get<any>(`${this.baseUrl}/leer`).pipe(
      map(response => response.status ? response.items : null)
    );
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<any>(`${this.baseUrl}/grabar`, item).pipe(
      map(response => response.status ? response.items : null)
    );
  }

  removeItem(item: Item): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/borrar/${item.id}`).pipe(
      map(response => response.status ? response.items : null)
    );
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<any>(`${this.baseUrl}/actualizar/${item.id}`, item).pipe(
      map(response => response.status ? response.items : null)
    );
  }
}
