import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Image} from "../models/image/Image";

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private httpClient : HttpClient) { }

  // @ts-ignore
  getAllImg() : Observable<Image[]>{
    // @ts-ignore
    return  this.httpClient.get('http://localhost:8080/api/img')
  }
}
