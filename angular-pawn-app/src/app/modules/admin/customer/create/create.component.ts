import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {finalize} from "rxjs/operators";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {CustomerServiceService} from "../../../../service/customer-service.service";
import {Customer} from "../../../../models/customer/Customer";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild("imgPreview") imgPreview: ElementRef;

  customer: Customer[] = [];
  customerFormCreate: FormGroup;
  file = null;
  loading = false;
  downloadURL: string;
  imgLink: string = null;
  submitted = false;
  customerCodeError: string;
  emailError: string;
  phoneError: string;
  idCardError: string;

  constructor(
    private customerService: CustomerServiceService,
    private fireStorage: AngularFireStorage,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerFormCreate = new FormGroup(
      {
        customerCode: new FormControl("", [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(8),
          Validators.pattern("^KH - \\d{4}$"),
        ]),
        name: new FormControl("", [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(45),
        ]),
        dateOfBirth: new FormControl("", [
          Validators.required,
          Validators.pattern(
            "^(19[0-9]{2}|200[0-5])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$"
          ),
        ]),
        gender: new FormControl("", [Validators.required]),
        email: new FormControl("", [
          Validators.required,
          Validators.pattern("^[^\\s@]+@gmail\\.com$"),
          Validators.maxLength(256),
        ]),
        address: new FormControl("", [
          Validators.required,
          Validators.pattern("^.{5,100}$"),
        ]),
        phone: new FormControl("", [
          Validators.required,
          Validators.pattern("^(0\\d{9,10})$"),
        ]),
        identityCard: new FormControl("", [
          Validators.required,
          Validators.pattern("^\\d{12}$"),
        ]),
        avatar: new FormControl(""),
      },
      []
    );
  }

  ngAfterViewInit() {
    const fileInput: HTMLInputElement = document.getElementById(
      "avatar"
    ) as HTMLInputElement;
    const previewImage: HTMLImageElement = document.getElementById(
      "img-preview"
    ) as HTMLImageElement;
  }

  removeForm(): void {
    this.customerFormCreate.reset();
    this.router.navigateByUrl("/admin/customer");
  }

  selectImg(event: any): void {
    this.file = event.target.files[0];
    const fileSizeInMB = this.file.size; // Convert size to MB
    const maxFileSizeInMB = 3145728; // Maximum file size in MB
    if (fileSizeInMB <= maxFileSizeInMB) {
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

  submit(): void {
    console.log("bắt đầu");
    if (this.customerFormCreate.controls.customerCode.invalid) {
      this.submitted = true;
    } else {
      this.submitted = false;
    }

    if (this.file) {
      console.log('test', this.file.name);
      const avatarName = this.getCurrentDateTime() + this.file.name;
      const fileRef = this.fireStorage.ref(avatarName);
      this.fireStorage
        .upload(avatarName, this.file)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              console.log("url", url);
              console.log('form begin save:', this.customerFormCreate.value);
              this.customerFormCreate.controls.avatar.setValue(url);
              console.log(this.customerFormCreate.controls.avatar.setValue(url));
              this.saveCustomer();
            });
          })
        )
        .subscribe();
    } else {
      this.saveCustomer();
    }
  }

  saveCustomer(): void {
    this.customerCodeError = '';
    this.emailError = '';
    this.phoneError = '';
    this.idCardError = '';
    this.customerService
      .save(this.customerFormCreate.value)
      .subscribe(
        (response) => {
          console.log(response);
          this.customerFormCreate.reset();
          this.router.navigateByUrl("/customer/list");
        },
        (error) => {
          console.log(error);
          if (error.status === 400) {
            const errorMessage = error.error;
            if (errorMessage.includes('Mã khách hàng đã tồn tại.')) {
              this.customerCodeError = errorMessage;
            } else if (errorMessage.includes('Email đã tồn tại.')) {
              this.emailError = errorMessage;
            } else if (errorMessage.includes('Số điện thoại đã tồn tại.')) {
              this.phoneError = errorMessage;
            } else if (errorMessage.includes('CMND hoặc Hộ chiếu đã tồn tại.')) {
              this.idCardError = errorMessage;
            }
          }
        }
      );
  }
}
