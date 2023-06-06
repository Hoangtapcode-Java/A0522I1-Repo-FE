import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthClientService} from '../../../service/auth-client.service';
import {Router} from '@angular/router';
import {UserServiceService} from '../../../service/user-service.service';
import Swal from 'sweetalert2';


// @ts-ignore
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isDisabledButton = false;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  emailForm: FormGroup = new FormGroup({
    email: new FormControl('')
  });

  constructor(private authService: AuthClientService, private router: Router,
              private userServiceService: UserServiceService) {
  }

  ngOnInit(): void {
    this.loadFunction();
  }

  public login() {
    this.authService.login(this.loginForm);
  }


  loadFunction(): void {
    const signUpButton: HTMLElement | null = document.getElementById('signUp');
    const signInButton: HTMLElement | null = document.getElementById('signIn');
    const container: HTMLElement | null = document.getElementById('container');

    if (signUpButton && signInButton && container) {
      signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
        console.log('da them cn 1');
      });

      signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
        console.log('Da them chuc nang');
      });
    }

  }

  loadForgot() {
    const buttonLoad: HTMLElement | null = document.getElementById('submit_button');
    buttonLoad.innerHTML =
       `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="color: darkseagreen"></span>
        <span class="visually-hidden">Loading...</span>`;
    this.isDisabledButton = true;
    this.userServiceService.sendOtp(this.emailForm.get('email').value).subscribe(data => {
      Swal.fire({
        title: 'Success',
        text: 'OTP send to email, please check your email" ',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      console.log(data);
      this.router.navigateByUrl('user/forgot');
    }, error => {
      Swal.fire({
        title: 'Error',
        text: 'Email invalid" ',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      buttonLoad.innerHTML = 'Gửi';
      this.isDisabledButton = false;
    });
  }
}
