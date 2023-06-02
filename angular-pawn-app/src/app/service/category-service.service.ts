import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
// ThuongVTH
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Category[]>{
    return this.httpClient.get<Category[]>("http://localhost:8080/api/category")
  }

  findById(id: number): Observable<Category>{
    return this.httpClient.get<Category>("http://localhost:8080/api/category/" + id);
  }
}
