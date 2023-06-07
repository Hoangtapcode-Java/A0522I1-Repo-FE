// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Customer } from '../models/customer/Customer';
// import { Observable } from 'rxjs';
// import { HttpParams } from '@angular/common/http';
// @Injectable({
//   providedIn: 'root'
// })
// export class CustomerServiceService {
//   // ThuongVTH
//
//   constructor(private httpClient: HttpClient) {}
//
//   getAll(page: number = 0, nameCustomer: string = ''): Observable<Customer[]>{
//     return this.httpClient.get<Customer[]>("http://localhost:8080/api/customer?nameCustomer="+nameCustomer+"&page="+page);
//   }
//
//   findById(id: number): Observable<Customer>{
//     return this.httpClient.get<Customer>("http://localhost:8080/api/customer/" + id);
//   }
// }
import { Injectable } from '@angular/core';
import {Customer} from "../models/customer/Customer";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../dto/customerDTO/api-response";
import {Page} from "../dto/customerDTO/page";
import {CustomerList} from "../models/customer/CustomerList";

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  private URL_API = 'http://localhost:8080/api/customer';
  private readonly serverApi: string = "http://localhost:8080/api/customers";
  customers: Customer []=[];

  constructor(private httpClient : HttpClient) {

  }
  save(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(`${this.URL_API}/add`, customer);
  }
  getCustomerById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>('http://localhost:8080/api/customer/' + id);
  }
  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.httpClient.put<Customer>(`${this.URL_API}/update/`+ id, customer);
  }
  // call api from back-end
  getAllCustomers(
    valueReceived: string = "",
    searchDateOfBirth: Date = null,
    searchGender: number = null,
    page: number = 0,
    size: number = 5
  ): Observable<ApiResponse<Page>> {
    let queryParams = "";
    if (valueReceived.trim() !== "") {
      queryParams += `&valueReceived=${valueReceived}`;
    }

    if (searchDateOfBirth) {
      const searchDateOfBirthParam = searchDateOfBirth
        .toISOString()
        .slice(0, 10);
      queryParams += `&searchDateOfBirth=${searchDateOfBirthParam}`;
    }

    if (searchGender !== null) {
      queryParams += `&searchGender=${searchGender}`;
    }
    return this.httpClient.get<ApiResponse<Page>>(
      `${this.serverApi}?page=${page}&size=${size}${queryParams}`
    );
  }

  // another way to write the function getAllCustomers
  // customers$ = (valueReceived: string = '', page: number = 0, size: number = 10): Observable<ApiResponse<Page>> =>
  //   this.httpClient.get<ApiResponse<Page>>(`${this.serverApi}/list?valueReceived=${valueReceived}&page=${page}&size=${size}`);

  getAllCustomerRestores(
    valueReceived: string = "",
    page: number = 0,
    size: number = 5
  ): Observable<ApiResponse<Page>> {
    let queryParams = "";
    if (valueReceived.trim() !== "") {
      queryParams += `&valueReceived=${valueReceived}`;
    }

    return this.httpClient.get<ApiResponse<Page>>(
      `${this.serverApi}/restore?page=${page}&size=${size}${queryParams}`
    );
  }

  deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.serverApi}/${id}`);
  }

  restoreById(id: number): Observable<CustomerList> {
    return this.httpClient.patch<CustomerList>(`${this.serverApi}/${id}`, {});
  }

  findByIdHuy(id: number): Observable<ApiResponse<CustomerList>> {
    return this.httpClient.get<ApiResponse<CustomerList>>(
      `${this.serverApi}/${id}`
    );
  }
    // ThuongVTH


  getAll(page: number = 0, nameCustomer: string = ''): Observable<Customer[]>{
    return this.httpClient.get<Customer[]>("http://localhost:8080/api/customer?nameCustomer="+nameCustomer+"&page="+page);
  }

  findById(id: number): Observable<Customer>{
    return this.httpClient.get<Customer>("http://localhost:8080/api/customer/" + id);
  }

  getAllCustomer(page: number, id: number, name: string, identityCard: string): Observable<any> {
    return this.httpClient.get<GetReponse>('http://localhost:8080/api/customers/liquidation' + '?page=' + page + '&id=' +
      id + '&name=' + name + '&identityCard=' + identityCard);
  }
  getSearch(name: string): Observable<any> {
    return this.httpClient.get<GetReponse>('http://localhost:8080/api/customers/liquidation' + '?customer_name=' + name);
  }
  findCustomerById(id : number) : Observable<Customer>{
    return this.httpClient.get<Customer>("http://localhost:8080/api/customer/"+id);
  }
}
interface GetReponse {
  content:Customer[];
  number:number;
  totalPage:number;
  totalElement:number;
}


