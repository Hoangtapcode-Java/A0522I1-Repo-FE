import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {AuthClientService} from "../../../../service/auth-client.service";
import {UserServiceService} from "../../../../service/user-service.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isDisabledButton = false;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.minLength(4), Validators.maxLength(45)]),
    password: new FormControl('', [Validators.minLength(4), Validators.maxLength(100)])
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
        text: 'OTP đã gửi qua email, vào email để xem OTP" ',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      console.log(data);
      this.router.navigateByUrl('user/forgot');
    }, error => {
      Swal.fire({
        title: 'Error',
        text: 'Email không hợp lệ" ',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      buttonLoad.innerHTML = 'Gửi';
      this.isDisabledButton = false;
    });
  }
}
