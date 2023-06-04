import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../models/status/Status';

@Injectable({
  providedIn: 'root'
})
export class StatusServiceService {
  
  constructor(private httpClient: HttpClient) {}
  
  // ThuongVTH
  getAll(): Observable<Status[]>{
    return this.httpClient.get<Status[]>("http://localhost:8080/api/statuses")
  }

  findById(id: number): Observable<Status>{
    return this.httpClient.get<Status>("http://localhost:8080/api/statuses/" + id);
  }
}
