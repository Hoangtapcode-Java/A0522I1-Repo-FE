import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Status} from '../models/status/Status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Status[]> {
    return this.httpClient.get<Status[]>('http://localhost:8080/api/status');
  }

  findById(id: any): Observable<Status> {
    return this.httpClient.get<Status>('http://localhost:8080/api/status/' + id);
  }
}
