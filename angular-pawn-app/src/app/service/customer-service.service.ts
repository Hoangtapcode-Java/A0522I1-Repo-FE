import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../models/customer/Customer';
import {Observable} from 'rxjs';
import {ApiResponse} from "../models/customer/ApiResponse";

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  private URL_API = 'http://localhost:8080/api/customer';
  // @author TuanVD
//  * @version 1
//  * @since 06/06/2023
  constructor(private  httpClient: HttpClient) { }
  save(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(`${this.URL_API}/add`, customer);
  }

  // getAll(): Observable <Customer[]> {
  //   return this.httpClient.get<Customer[]>(this.URL_APIL);
  // }
  // @author TuanVD
//  * @version 1
//  * @since 06/06/2023
  getCustomerById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>('http://localhost:8080/api/customer/' + id);
  }
  // @author TuanVD
//  * @version 1
//  * @since 06/06/2023
  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.httpClient.put<Customer>(`${this.URL_API}/update/`+ id, customer);
  }

  // updateCustomer(id: string, customer: Customer): Observable<ApiResponse<Customer>> {
  //   return this.httpClient.put<ApiResponse<Customer>>(`${this.URL_API}/${id}`, customer);
  // }
}
