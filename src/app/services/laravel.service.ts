import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Item } from '../interfaces/item';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1/api/items'; // Asegúrate de cambiar esto por tu URL real

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Item[]> {
    return this.http.get<any>(`${this.baseUrl}`).pipe(
      map(response => response.status ? response.items : null)
    );
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<any>(`${this.baseUrl}`, item).pipe(
      map(response => response.status ? response.items : null)
    );
  }

  removeItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.status ? response.items : null)
    );
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<any>(`${this.baseUrl}/${item.id}`, item).pipe(
      map(response => response.status ? response.item : null)
    );
  }
}
