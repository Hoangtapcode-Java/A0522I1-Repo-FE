import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthClientService} from '../../../service/auth-client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthClientService, private router: Router) {
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
    this.router.navigateByUrl('/user/forgot');
  }
}
