import { Injectable } from '@angular/core';
import {Product} from "../models/product/Product";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../models/customer/Customer";

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  products : Product []=[];
  API_KEY_PRODUCT = 'http://localhost:8080/api/products'

  constructor(private httpClient : HttpClient) { }

  // @ts-ignore
  getContractNotPay(nameCustomer: string, categoryName: string, page: number) : Observable<any>{
    // @ts-ignore
    return this.httpClient.get(this.API_KEY_PRODUCT+"?namecustomer="+nameCustomer+"&categoryname="+categoryName+"&page="+page)
  }
  // @ts-ignore
  getProductNotPayById(id : Number) : Observable<Contract>{
    return this.httpClient.get("http://localhost:8080/api/products/"+id)
  }



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

