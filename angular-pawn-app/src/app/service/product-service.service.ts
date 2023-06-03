import { Injectable } from '@angular/core';
import {Product} from "../models/Product";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../models/Customer";

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  products : Product []=[];
  constructor(private httpClient : HttpClient) { }


  getProductByCustomer(id: number): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8080/api/products/customer/" + id);
  }
  getSearch1(idCustomer: number = 0,name : string ='',price : number = 0,nameCategory : string=''): Observable<any>{
    return this.httpClient.get<any>('http://localhost:8080/api/products' + '?name='+ name +'&price='+price+'&nameCategory='+ nameCategory);
  }
}
interface GetReponse {
  content: Customer[];
  number: number;
  totalPage: number;
  totalElement: number;
}
