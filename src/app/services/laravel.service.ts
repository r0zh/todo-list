import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1/api/items'; // Asegúrate de cambiar esto por tu URL real

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}`);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.baseUrl}`, item);
  }

  removeItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.baseUrl}/${item.id}`, item);
  }
}
