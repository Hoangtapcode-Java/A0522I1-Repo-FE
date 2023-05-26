import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

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

  constructor() {
  }


  ngOnInit(): void {
  }

  clickEvent(nextElementId: string): void {
    const nextElement = document.getElementById(nextElementId) as HTMLInputElement | null;
    if (nextElement) {
      nextElement.focus();
    }
  }

  chanePassword() {
    const otp = this.firstValue + this.secondValue + this.thirdValue + this.fourthValue + this.fifthValue;
    console.log('OTP ' + otp);
  }
}
