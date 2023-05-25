import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


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
    const result =  this.getToken() == null ? false : true;
    return result;
  }

  public generateHeader(): HttpHeaders {
    const tokenStr = 'Bearer ' + this.getToken();
    return new HttpHeaders().set('Authorization', tokenStr);
  }




}
