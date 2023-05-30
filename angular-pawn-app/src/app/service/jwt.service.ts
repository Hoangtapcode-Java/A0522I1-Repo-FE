import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthClientService} from './auth-client.service';


@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private jwtSecret = 'hoangnhan235';
  private logged = false;

  constructor(private httpClient: HttpClient) {
  }

  public setToken(token: any) {
    localStorage.setItem('token', token);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public removeToken() {
    localStorage.removeItem('token');
  }

  public verifyToken() {
    // this.get('http://localhost:8080/employee/test').subscribe((data: any) => {
    //     console.log('data: ' + data);
    //     return true;
    //   },
    //   (error) => {
    //     console.log('fail');
    //     return false;
    //   });
    let result = this.getToken() == null ? false : true;
    const date = new Date();
    const createdTime = localStorage.getItem('createdTime');
    if (createdTime != null) {
      const created = new Date(createdTime);
      date.setDate(created.getDate() + 1);
      // Thời gian hiện tại
      const currentTime = new Date();
      if (date < currentTime) {
        result = false;
        localStorage.removeItem('createdTime');
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
      } else {
        console.log('token con hieu luc');
      }
    } else {
      result = false;
    }

    return result;
  }

  public generateHeader(): HttpHeaders {
    const tokenStr = 'Bearer ' + this.getToken();
    return new HttpHeaders().set('Authorization', tokenStr);
  }


}
