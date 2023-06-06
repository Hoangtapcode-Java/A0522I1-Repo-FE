import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import validate = WebAssembly.validate;
import {CustomerRegHomeService} from '../../../../service/customer-reg-home.service';
declare const Swal: any;

declare const Swal: any;
@Component({
  selector: 'app-pawn-form-customer',
  templateUrl: './pawn-form-customer.component.html',
  styleUrls: ['./pawn-form-customer.component.css']
})
export class PawnFormCustomerComponent implements OnInit {
  addNewCustomerReg: FormGroup;
  regexName = '^[a-zA-ZÀ-ỹ]+([ ][a-zA-ZÀ-ỹ]+)*$';
  regexPhone = '^(0|\\+?84)(\\d){9}$';
  // regexEmail = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$';
  regexEmail = '^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,253}\\.[a-zA-Z]{2,63}$';
  // regexAddress = '^[a-zA-Z0-9\\s/,-]*$';
  regexAddress = '^[0-9a-zA-Z\u00C0-\u1FFF\u2C00-\uD7FF\uF900-\uFFFD\\p{Mn}\\s,/-]*$';
  regexIdCard = '^\\d{12}$';
  submitted = false;
  constructor(private customerService: CustomerRegHomeService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {
    this.addNewCustomerReg = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.regexEmail),
        Validators.minLength(7), Validators.maxLength(254)]),
      phone: new FormControl('', [ Validators.required, Validators.pattern(this.regexPhone)]),
      address: new FormControl('',  [Validators.required, Validators.pattern(this.regexAddress),
        Validators.minLength(20), Validators.maxLength(200)]),
      note: new FormControl('', [Validators.maxLength(200), Validators.minLength(5)]),
      customerName: new FormControl('', [ Validators.required,
        Validators.minLength(5), Validators.maxLength(50),
        Validators.pattern(this.regexName)]),
      idCardCustomer: new FormControl('', [ Validators.required, Validators.pattern(this.regexIdCard)])
    });
  }
  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (this.addNewCustomerReg.valid) {
      this.customerService.saveCustomerReg(this.addNewCustomerReg.value).subscribe(next => {
        Swal.fire(
          'Đăng ký thành công!!',
          'Nhân viên của DANA88 sẽ liên hệ với bạn để sắp xếp lịch hẹn!!!'
        );
        this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
          this.addNewCustomerReg.reset();
          this.submitted = false;
        });
      });
    }
  }
}
