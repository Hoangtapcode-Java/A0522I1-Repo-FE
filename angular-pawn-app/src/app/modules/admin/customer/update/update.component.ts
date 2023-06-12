import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {Customer} from "../../../../models/customer/Customer";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerServiceService} from "../../../../service/customer-service.service";
import {HttpErrorResponse} from "@angular/common/http";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(
    private customerService: CustomerServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private firebase: AngularFireStorage
  ) {
    this.activatedRoute.paramMap.subscribe((next) => {
      this.id = +next.get("id");
    });
    console.log(this.id);

    this.formGroup = new FormGroup({
      id: new FormControl(),
      customerCode: new FormControl(),
      name: new FormControl(),
      dateOfBirth: new FormControl(),
      gender: new FormControl(),
      email: new FormControl(),
      address: new FormControl(),
      phone: new FormControl(),
      identityCard: new FormControl(),
      avatar: new FormControl()
    });
  }
  customer: Customer;
  id: number = 0;
  file = null; //
  oldAvatarLink = null;
  myDate: string;
  imgLink: string = null;
  submitted = false;
  oldAvatarUrl: string;
  emailError: string;
  phoneError: string;
  idCardError: string;
  uploadProgress$: Observable<number>;
  uploadTask: AngularFireUploadTask;
  customerCodeError: string = '';

  formGroup: FormGroup;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = +params.get('id'); // Lấy giá trị id từ URL và chuyển đổi thành số
      this.customerService.getCustomerById(this.id).subscribe((next) => {
        console.log(next);
        this.customer = next;

        this.oldAvatarLink = next.avatar; // Lưu trữ URL của avatar cũ
        this.myDate = next.dateOfBirth;
        console.log("avatar", this.oldAvatarLink);
        this.formGroup = new FormGroup({
          id: new FormControl(next.id),
          customerCode: new FormControl(next.customerCode, [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(8),
            Validators.pattern("^KH - \\d{4}$"),
          ]),
          name: new FormControl(next.name, [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(45),
          ]),
          dateOfBirth: new FormControl(next.dateOfBirth, [
            Validators.pattern(
              "^(19[0-9]{2}|200[0-5])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$"
            ),
          ]),
          gender: new FormControl(next.gender, [Validators.required]),
          email: new FormControl(next.email, [
            Validators.required,
            Validators.pattern("^[^\\s@]+@gmail\\.com$"),
            Validators.maxLength(256),
          ]),
          address: new FormControl(next.address, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
          phone: new FormControl(next.phone, [
            Validators.required,
            Validators.pattern("^(0\\d{9,10})$"),
          ]),
          identityCard: new FormControl(next.identityCard, [
            Validators.required,
            Validators.pattern("^\\d{12}$"),
          ]),
          avatar: new FormControl(next.avatar),
        });

        // Đặt giá trị ban đầu cho các trường dữ liệu từ dữ liệu đã có
        this.formGroup.patchValue({
          id: next.id,
          customerCode: next.customerCode,
          name: next.name,
          dateOfBirth: next.dateOfBirth,
          email: next.email,
          address: next.address,
          phone: next.phone,
          identityCard: next.identityCard,
          avatar: next.avatar,
        });

        // Lưu trữ URL của avatar cũ vào thuộc tính oldAvatarUrl
        this.oldAvatarUrl = this.oldAvatarLink;
        // debugger

        (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
    });
  }

  submit(): void {
    this.submitted = true;
    console.log(this.file?.name);

    if (this.file && this.file.name) {
      console.log('test', this.file.name);
      const avatarName = this.getCurrentDateTime() + this.file.name;
      const fileRef = this.firebase.ref(avatarName);
      this.uploadTask = this.firebase.upload(avatarName, this.file);
      this.uploadProgress$ = this.uploadTask.percentageChanges();
      this.uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.formGroup.controls.avatar.setValue(url);
            // console.log('Form validity:', this.formGroup.valid);
            // console.log('Form errors:', this.formGroup.errors);
            // console.log('Form value:', this.formGroup.value);
            this.saveCustomer(this.id);
          });
        })
      ).subscribe();
    } else {
      // console.log('Form validity:', this.formGroup.valid);
      // console.log('Form errors:', this.formGroup.errors);
      // console.log('Form value:', this.formGroup.value);
      this.saveCustomer(this.id);
    }
  }

  saveCustomer(id: number): void {
    this.customerCodeError = '';
    this.emailError = '';
    this.phoneError = '';
    this.idCardError = '';
    // debugger;
    this.customerService.updateCustomer(id, this.formGroup.value).subscribe(
      () => {
        console.log("Cập nhật thành công");
        this.formGroup.reset();
        this.router.navigateByUrl("/customer/list");
      },
      (error) => {
        console.log("error");
        if (error.status === 400) {
          const errorMessage = error.error;
          if (errorMessage.includes("Mã khách hàng đã tồn tại.")) {
            this.customerCodeError = errorMessage;
          } else if (errorMessage.includes("Email đã tồn tại.")) {
            this.emailError = errorMessage;
          } else if (errorMessage.includes("Số điện thoại đã tồn tại.")) {
            this.phoneError = errorMessage;
          } else if (errorMessage.includes("CMND hoặc Hộ chiếu đã tồn tại.")) {
            this.idCardError = errorMessage;
          }
          this.submitted = false;
        }
      }
    );
  }


  removeForm(): void {
    this.formGroup.reset()
    this.router.navigateByUrl("/customer/list");
  }

  ngAfterViewInit() {
    const fileInput: HTMLInputElement = document.getElementById(
      "avatar"
    ) as HTMLInputElement;
    const previewImage: HTMLImageElement = document.getElementById(
      "img-preview"
    ) as HTMLImageElement;
  }

  selectImg(event: any): void {
    this.file = event.target.files[0];
    const fileSizeInMB = this.file.size; // Convert size to MB
    const maxFileSizeInMB = 3; // Maximum file size in MB
    if (fileSizeInMB <= maxFileSizeInMB * 1024 * 1024) {
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e: any) => {
        this.imgLink = e.target.result;
      };
      const errorMessage = document.getElementById("error-message");
      if (errorMessage) {
        errorMessage.textContent = ""; // Clear error message
      }
    } else {
      const errorMessage = document.getElementById("error-message");
      if (errorMessage) {
        errorMessage.textContent = "Kích thước file vượt quá giới hạn 3MB."; // Display error message
      }
    }
  }

  private getCurrentDateTime(): string {
    return new Date().getTime().toString();
  }

}
