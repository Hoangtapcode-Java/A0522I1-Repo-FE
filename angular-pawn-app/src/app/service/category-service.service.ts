
// @ts-ignore
import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../models/category/Category";



// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private httpClient  : HttpClient) { }
  // @ts-ignore
  getAllCategory() : Observable<Category[]>{
    // @ts-ignore
    return  this.httpClient.get("http://localhost:8080/api/category")
  }
}
