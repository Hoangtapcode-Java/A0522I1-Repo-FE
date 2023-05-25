import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {UserRole} from '../models/UserRole';
import {JwtService} from './jwt.service';
import {Router} from '@angular/router';


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
        console.log(user.value);
        localStorage.setItem('token', data.token);
        localStorage.setItem('logged', '1');
        console.log('token login: ' + data.token);
        this.router.navigateByUrl('/user');
        data.roles.forEach(role => {
          role.authority === 'ADMIN' ? this.roles.push(UserRole.Admin) : this.roles.push(UserRole.User);
        });
        localStorage.setItem('roles', this.roles.join(','));
      });
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
    console.log('da xoa roles');
  }


}
