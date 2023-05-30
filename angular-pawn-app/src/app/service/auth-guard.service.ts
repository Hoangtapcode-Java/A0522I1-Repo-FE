import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {AuthClientService} from './auth-client.service';
import {UserRole} from '../models/UserRole';
import {JwtService} from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthClientService, private router: Router, private jwtClientService: JwtService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // const logged = this.authService.getIsLogged();
    const logged = this.jwtClientService.verifyToken();
    console.log('logged: ' + logged);
    if (!logged) {
      this.router.navigateByUrl('/user/login');
      return false;
    } else {
      const userRole: UserRole[] = [];
      const roles = this.jwtClientService.getToken().split(',');
      roles.forEach(role => {
        if (role === 'ADMIN') {
          userRole.push(UserRole.Admin);
        } else {
          userRole.push(UserRole.User);
        }
      });
      console.log('Role: ' + userRole);
      const requiredRoles: any = route.data.roles as UserRole[];
      console.log('type userRole ' + typeof userRole);
      console.log('required role: ' + requiredRoles);
      console.log('!requiredRoles.includes(userRole): ' + userRole.includes(requiredRoles));
      if (requiredRoles && requiredRoles.length > 0 && !requiredRoles.some(role => userRole.includes(role))) {
        // Người dùng không có quyền truy cập vào route, điều hướng tới trang lỗi hoặc trang không được phép
        // this.router.navigate(['/error']);
        console.log('Khong co quyen');
        return false;
      }
      return true;
    }
  }
}
