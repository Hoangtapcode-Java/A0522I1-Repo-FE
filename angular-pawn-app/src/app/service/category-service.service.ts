import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<any> {
    return this.httpClient.get<Category[]>('http://localhost:8080/api/categories');
  }

  findById(id: any): Observable<Category> {
    return this.httpClient.get<Category>('http://localhost:8080/api/categories/' + id);
  }
}
