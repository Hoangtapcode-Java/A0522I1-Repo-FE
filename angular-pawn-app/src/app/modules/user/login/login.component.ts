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
    // console.log(this.loginForm.value);
    // this.authService.connectBEAuth(this.loginForm.value).subscribe((data: any) => {
    //   console.log(data);
    //   if (null !== data.token) {
    //     // @ts-ignore
    //     localStorage.setItem('token', data.token);
    //     localStorage.setItem('logged', '1');
    //     console.log('token login: ' + data.token);
    //     this.authService.isLogged = true;
    //     this.router.navigateByUrl('/user');
    //   }
    // });
    // console.log(this.authService.getIsLogged());
    // if (this.authService.getIsLogged()) {
    //   console.log('login: ' + this.authService.getIsLogged());
    //   this.router.navigateByUrl('/user');
    // }
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

}
