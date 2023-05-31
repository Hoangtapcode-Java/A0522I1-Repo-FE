import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {UserRole} from '../models/UserRole';
import {JwtService} from './jwt.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthClientService {
  public isLogged = false;
  public roles: UserRole[] = [];

  constructor(private httpClient: HttpClient, private jwtClientService: JwtService, private router: Router) {

  }

  public connectBEAuth(user) {
    return this.httpClient.post<string>('http://localhost:8080/api/auth/signin', user, {responseType: 'json'});
  }

  public login(user) {
    try {
      this.connectBEAuth(user.value).subscribe((data: any) => {
        this.jwtClientService.setToken(data.token);
        console.log('token login: ' + data.token);
        this.router.navigateByUrl('/user');
        localStorage.setItem('username', user.value.username);
        console.log(data.createdTime);
        localStorage.setItem('createdTime', data.createdTime);
        data.roles.forEach(role => {
          role.authority === 'ADMIN' ? this.roles.push(UserRole.Admin) : this.roles.push(UserRole.User);
        });
        sessionStorage.setItem('roles', this.roles.join(','));
        // Swal.fire({
        //   title: 'Success!',
        //   text: 'Login success',
        //   icon: 'info',
        //   confirmButtonText: 'OK'
        // });
      }, ((error) => {
        Swal.fire({
          title: 'Error!',
          text: 'User name or password wrong',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }));
    } catch (e) {
      console.log('login fail');
    }

  }

  public getRoles() {
    return this.roles;
  }

  public logout() {
    this.jwtClientService.removeToken();
    localStorage.removeItem('roles');
    localStorage.removeItem('username');
    localStorage.removeItem('createdTime');

  }


}
