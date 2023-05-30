import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UserServiceService} from '../../../service/user-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  firstValue = '';
  secondValue = '';
  thirdValue = '';
  fourthValue = '';
  fifthValue = '';
  sixthValue = '';

  constructor(private userServiceService: UserServiceService) {
  }


  ngOnInit(): void {
  }


  clickEvent(nextElementId: string): void {
    const nextElement = document.getElementById(nextElementId) as HTMLInputElement | null;
    if (nextElement) {
      nextElement.focus();
    }
  }

  changePassword() {
    const otp = this.firstValue + this.secondValue + this.thirdValue + this.fourthValue + this.fifthValue + this.sixthValue;
    const email = this.userServiceService.email;
    const newPassword = 'abc123';
    const changeForm = {
      email,
      otp,
      newPassword
    };
    this.userServiceService.resetPassword(changeForm);
    console.log('email OTP: ' + email);
    console.log('OTP ' + otp);

  }
}
