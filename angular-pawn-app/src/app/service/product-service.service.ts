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
  getAllProduct(): Observable<any>{
    return this.httpClient.get<GetReponse>("http://localhost:8080/api/products")
  }

}
interface GetReponse {
  content: Customer[];
  number: number;
  totalPage: number;
  totalElement: number;
}
