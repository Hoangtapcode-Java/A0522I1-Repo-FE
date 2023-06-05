import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UserServiceService} from '../../../service/user-service.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';


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

  constructor(private userServiceService: UserServiceService, private router: Router) {
  }


  ngOnInit(): void {
  }


  clickEvent(nextElementId: string): void {
    const nextElement = document.getElementById(nextElementId) as HTMLInputElement | null;
    if (nextElement) {
      nextElement.focus();
    }
  }
  generateOtp(): string {
    const otpLength = 6; // Độ dài của mã OTP
    const digits = '0123456789abcdefghiklmnoptrsuvwxyz'; // Các chữ số để tạo mã OTP

    let otp = '';
    for (let i = 0; i < otpLength; i++) {
      const index: number = Math.floor(Math.random() * digits.length);
      const digit: string = digits.charAt(index);
      otp += digit;
    }

    return otp;
  }

  changePassword() {
    const otp = this.firstValue + this.secondValue + this.thirdValue + this.fourthValue + this.fifthValue + this.sixthValue;
    const email = this.userServiceService.email;
    const newPassword = this.generateOtp();
    const changeForm = {
      email,
      otp,
      newPassword
    };
    const buttonLoad: HTMLElement | null = document.getElementById('btn-confirm-change');
    buttonLoad.innerHTML =
      `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="color: darkseagreen"></span>
        <span class="visually-hidden">Loading...</span>`;
    this.userServiceService.reset(changeForm).subscribe(success => {
      Swal.fire({
        title: 'Success',
        text: 'Cập nhật mật khẩu thành công, kiểm tra email để xem mật khẩu',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.router.navigateByUrl('/user/login');
    }, error => {
      Swal.fire({
        title: 'Error!',
        text: 'OTP Sai hoặc đã hết hạn!!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      buttonLoad.innerHTML = 'Xác nhận';
    });
    console.log('email OTP: ' + email);
    console.log('OTP ' + otp);

  }

}
