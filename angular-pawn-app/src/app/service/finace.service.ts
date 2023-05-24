
import {Injectable} from '@angular/core';

import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Finace} from "../models/finace/Finace";


@Injectable({
  providedIn: 'root'
})
export class FinaceService {


  constructor(private httpClient: HttpClient) {
  }


  getFinace(): Observable<Finace> {
    // @ts-ignore
    return this.httpClient.get("http://localhost:8080/api/finace")
  }
}
