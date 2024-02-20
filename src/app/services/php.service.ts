import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:41062/www/phpAPI'; // Asegúrate de cambiar esto por tu URL real

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/leer.php`);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.baseUrl}/grabar.php`, item);
  }

  removeItem(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/borrar.php`, { id });
  }
}
