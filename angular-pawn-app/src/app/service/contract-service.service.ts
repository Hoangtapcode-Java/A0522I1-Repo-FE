import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contract} from '../models/contract/Contract';

@Injectable({
  providedIn: 'root'
})
export class ContractServiceService {
  private baseUrl = 'http://localhost:8080/api/contract';

  constructor(private httpClient: HttpClient) {
  }

  getAll(page: number, nameCustomer: string, nameProduct: string, dateBegin: string, contractCode: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + '?page=' + page + '&nameCustomer=' + nameCustomer + '&nameProduct=' + nameProduct
      + '&dateBegin=' + dateBegin + '&contractCode=' + contractCode);
  }
}
