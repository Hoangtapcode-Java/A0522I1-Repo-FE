import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';
import {Route, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  email = '';
  doneSend = false;
  isDisableButton = false;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  sendOtp(mail: string): Observable<any> {
    this.email = mail;
    return this.httpClient.get('http://localhost:8080/api/auth/forgot-password?email=' + mail);
  }

  sendOtpByEmail(mail: string): any {
    console.log('email: ' + mail);
    this.sendOtp(mail).subscribe(data => {
      this.doneSend = true;
      Swal.fire({
        title: 'Success',
        text: 'OTP send to email, please check your email" ',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.router.navigateByUrl('user/forgot');
    }, error => {
      Swal.fire({
        title: 'Error',
        text: 'Email invalid" ',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }

  reset(change: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/reset-password', change);
  }

  resetPassword(change: any) {
    this.reset(change).subscribe(success => {
      Swal.fire({
        title: 'Success',
        text: 'Reset password to "abc123" ',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }, error => {
      Swal.fire({
        title: 'Error!',
        text: 'OTP wrong',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    });
  }
}
