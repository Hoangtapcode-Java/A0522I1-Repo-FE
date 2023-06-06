import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contract} from '../models/contract/Contract';

@Injectable({
  providedIn: 'root'
})


export class EmployeeService {

  constructor(private httpClient: HttpClient) {
  }

}
