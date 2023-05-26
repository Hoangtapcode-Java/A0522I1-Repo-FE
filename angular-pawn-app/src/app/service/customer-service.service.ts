import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer/Customer';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private httpClient: HttpClient) {}

  getAll(page: number = 0, nameCustomer: string = ''): Observable<Customer[]>{
    return this.httpClient.get<Customer[]>("http://localhost:8080/api/customer?nameCustomer="+nameCustomer+"&page="+page);
  }

  findById(id: number): Observable<Customer>{
    return this.httpClient.get<Customer>("http://localhost:8080/api/customer/" + id);
  }
}
