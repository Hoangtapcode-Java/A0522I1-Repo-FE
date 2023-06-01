import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeServiceService} from "../../../service/employee-service.service";
import {Router} from "@angular/router";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";
declare const Swal: any;

@Component({
  selector: 'app-edit-employee-infor',
  templateUrl: './edit-employee-infor.component.html',
  styleUrls: ['./edit-employee-infor.component.css']
})
export class EditEmployeeInforComponent implements OnInit {
  employeeInfor: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern("^(?:[A-Z][a-zÀ-ỹ]*(?: [A-Z][a-zÀ-ỹ]*)+)$")]),
    dateOfBirth: new FormControl("", [Validators.required, this.isOver23, this.isOver50]),
    phone: new FormControl("", [Validators.required, Validators.pattern("^(09|08)\\d{8}$")]),
    email: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern("^[a-zA-Z0-9_.+-]+@gmail.com+$")]),
    gender: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern("^[^!@#$%^&*()_+<>?'\"{}\\`~|/\\\\]+$")]),
    idCard: new FormControl("", [Validators.required, Validators.pattern("^\\d{12}$")]),
    avatar: new FormControl(),
    userName: new FormControl(),
    password: new FormControl("", [ Validators.maxLength(30), Validators.minLength(10), Validators.pattern("^(?=.*[A-Z])(?=.*\\d)(?=.*[a-zA-Z0-9])[\\w!@#$%^&*()-=_+<>?'\"{}`~/|]*\\d?$")]),
    confirmPassword: new FormControl("", [])
  }, [this.comparePassword]);
  inputImage: any = null;
  oldAvatarLink: any = null;
  checkEmail: boolean = false;
  checkPhone: boolean = false;
  checkIdCard: boolean = false;
  maxSize: boolean = false;

  constructor(private employeeService: EmployeeServiceService, private route: Router, private storage: AngularFireStorage) {
    this.employeeService.findByIdEmployee().subscribe(now => {
      this.employeeInfor.patchValue(now);
      this.oldAvatarLink = now.avatar;
    })
  }

  ngOnInit(): void {
  }

  submit(employeeInfor: FormGroup) {
    if (this.employeeInfor.valid) {
      if (this.inputImage == null&&this.maxSize!=true) {
        this.employeeService.updateEmployeeInfor(employeeInfor.value).subscribe(next => {
        }, error => {
          if (error.error.duplicateEmail) {
            this.checkEmail = true;
          } else this.checkEmail = false;
          if (error.error.duplicatePhone) {
            this.checkPhone = true;
          } else this.checkPhone = false;
          if (error.error.duplicateIdCard) {
            this.checkIdCard = true;
          } else this.checkIdCard = false;
        }, () => {
          this.route.navigateByUrl("employee/edit-employee-infor");
          Swal.fire('Sửa thành công');
        });
      } else {
        const nameImg = formatDate(new Date(), 'dd-MM-yyyy_hh:mm:ss:a_', 'en-US') + this.inputImage.name;
        const fileRef = this.storage.ref(nameImg);

        this.employeeService.updateEmployeeInfor(employeeInfor.value).subscribe(next => {
        }, error => {
          if (error.error.duplicateEmail) {
            this.checkEmail = true;
          } else this.checkEmail = false;
          if (error.error.duplicatePhone) {
            this.checkPhone = true;
          } else this.checkPhone = false;
          if (error.error.duplicateIdCard) {
            this.checkIdCard = true;
          } else this.checkIdCard = false;
        }, () => {
          this.storage.upload(nameImg, this.inputImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                this.employeeInfor.value.avatar = url;
                this.employeeService.updateEmployeeInfor(employeeInfor.value).subscribe();
              });
            })
          ).subscribe();
          this.route.navigateByUrl("employee/edit-employee-infor" );
          Swal.fire('Sửa thành công');
        });
      }
    }
  }

  back() {
    this.route.navigateByUrl("/");
  }

  selectImg(event: any) {
    this.inputImage = event.target.files[0];
    if (this.inputImage.size > 1048576 && this.inputImage) {
      this.maxSize = true;
      event.target.value = null;
      this.oldAvatarLink = null;
      this.inputImage = null;
    } else if (this.inputImage) {
      this.maxSize = false;
      const reader = new FileReader();
      reader.readAsDataURL(this.inputImage);
      reader.onload = (e: any) => {
        this.oldAvatarLink = e.target.result;
      };
    }
  }

  comparePassword(form: any) {
    const password = form.controls.password.value;
    const confirmPassword = form.controls.confirmPassword.value;
    if (password === confirmPassword) {
      return null;
    }
    return {'failPass': true};
  }

  isOver23(control: AbstractControl): any {
    let dob = new Date(control.value);
    let currentDate = new Date();
    let age = currentDate.getFullYear() - dob.getFullYear();
    let monthDiff = currentDate.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dob.getDate())) {
      age--;
    }
    if (age < 23) {
      return {'isOver23': true};
    }
  }

  isOver50(control: AbstractControl): any {
    let dob = new Date(control.value);
    let currentDate = new Date();
    let age = currentDate.getFullYear() - dob.getFullYear();
    let monthDiff = currentDate.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dob.getDate())) {
      age--;
    }
    if (age > 50) {
      return {'isOver50': true};
    }
  }

  setFlagEmail() {
    this.checkEmail = false;
  }

  setFlagPhone() {
    this.checkPhone = false;
  }

  setFlagIdCard() {
    this.checkIdCard = false;
  }
}
