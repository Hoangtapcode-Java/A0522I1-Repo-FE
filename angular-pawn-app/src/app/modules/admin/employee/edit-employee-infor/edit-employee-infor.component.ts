import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";
import {Title} from "@angular/platform-browser";
import {EmployeeServiceService} from "../../../../service/employee-service.service";

declare const Swal: any;

@Component({
  selector: 'app-edit-employee-infor',
  templateUrl: './edit-employee-infor.component.html',
  styleUrls: ['./edit-employee-infor.component.css']
})
export class EditEmployeeInforComponent implements OnInit {
  employeeInfor: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern("^\\s*(?:[A-Zà-ỹ][a-zà-ỹ]*(?: [A-Zà-ỹ][a-zà-ỹ]*)*)\\s*$")]),
    dateOfBirth: new FormControl("", [Validators.required, this.isOver23, this.isOver50]),
    phone: new FormControl("", [Validators.required, Validators.pattern("^\\s*(09|08)\\d{8}\\s*$")]),
    email: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern("^\\s*[a-zA-Z0-9_.+-]+@gmail.com+\\s*$")]),
    gender: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern("^\\s*(?:[A-ZÀ-ỹ0-9,.][a-zÀ-ỹ0-9,.]*(?: [A-ZÀ-ỹ0-9,.][a-zÀ-ỹ0-9,.]*)*)\\s*$")]),
    idCard: new FormControl("", [Validators.required, Validators.pattern("^\\s*\\d{12}\\s*$")]),
    avatar: new FormControl(),
    userName: new FormControl(),
    password: new FormControl(null, [Validators.maxLength(30), Validators.minLength(10), Validators.pattern("^(?=.*[A-Z])(?=.*\\d)(?=.*[a-zA-Z0-9])[\\w!@#$%^&*()-=_+<>?'\"{}`~/|]*\\d?$")]),
    confirmPassword: new FormControl(null)
  }, [this.comparePassword]);
  inputImage: any = null;
  oldAvatarLink: any = null;
  checkEmail: boolean = false;
  checkPhone: boolean = false;
  checkIdCard: boolean = false;
  maxSize: boolean = false;

  constructor(private employeeService: EmployeeServiceService,
              private route: Router,
              private storage: AngularFireStorage,
              private title: Title) {
    this.employeeService.findByIdEmployee().subscribe(now => {
      this.employeeInfor.patchValue(now);
      this.oldAvatarLink = now.avatar;
    })
  }

  ngOnInit(): void {
    this.title.setTitle("Thông tin cá nhân");
  }

  trimFormGroupValues(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];
      if (control.value && typeof control.value === 'string') {
        control.setValue(control.value.trim());
      }
    });
  }

  submit(employeeInfor: FormGroup) {
    if (employeeInfor.value.password==""){
      employeeInfor.value.password=null;
      employeeInfor.value.confirmPassword=null;
    }
    if (this.employeeInfor.valid) {
      this.trimFormGroupValues(employeeInfor);
      if (this.inputImage == null) {
        this.employeeService.updateEmployeeInfor(employeeInfor.value).subscribe(next => {
        }, error => {
          console.log(error)
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
          Swal.fire('','Sửa thành công','success').finally(() => {
            window.location.reload();
          });
        });
      } else if (this.inputImage != null && this.maxSize != true) {
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
          ).subscribe(() => {
          }, error => {
          }, () => {
            Swal.fire('','Sửa thành công','success').finally(() => {
              window.location.reload();
            });
          });
        });
      }
    }
  }

  back() {
    window.location.reload();
  }

  selectImg(event: any) {
    this.inputImage = event.target.files[0];
    if (this.inputImage.size > 1048576 && this.inputImage != null) {
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
