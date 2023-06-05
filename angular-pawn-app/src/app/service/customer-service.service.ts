import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Customer} from "../models/Customer";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  customers: Customer []=[];

  constructor(private httpClient : HttpClient) {

  }
  // getAllCustomer(): Observable<any>{
  //   return this.httpClient.get<GetReponse>("http://localhost:8080/api/customers")
  // }
  getAllCustomer(page: number, id: number, name: string, identityCard: string): Observable<any> {
    return this.httpClient.get<GetReponse>('http://localhost:8080/api/customers' + '?page=' + page + '&id=' +
      id + '&name=' + name + '&identityCard=' + identityCard);
  }
  getSearch(name: string): Observable<any> {
    return this.httpClient.get<GetReponse>('http://localhost:8080/api/customers' + '?customer_name=' + name);
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
