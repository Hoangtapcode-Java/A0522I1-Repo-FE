<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Status } from 'src/app/models/status/Status';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Customer } from 'src/app/models/customer/Customer';
import { ValidationErrors } from '@angular/forms';
import { CustomerServiceService } from 'src/app/service/customer-service.service';
import {ContractService} from "../../../../service/contract.service";
import {StatusService} from "../../../../service/status.service";
import {CategoryServiceService} from "../../../../service/category-service.service";
import {Category} from "../../../../models/category/Category";

declare const Swal: any;
=======
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CategoryServiceService} from 'src/app/service/category-service.service';
import {CustomerServiceService} from 'src/app/service/customer-service.service';
import {Category} from 'src/app/models/category/Category';
import {Status} from 'src/app/models/status/Status';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {Customer} from 'src/app/models/customer/Customer';
import {ValidationErrors} from '@angular/forms';
import {ContractService} from '../../../../service/contract.service';
import {StatusService} from '../../../../service/status.service';

declare const Swal: any;

>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
// ThuongVTH
export class CreateComponent implements OnInit {

<<<<<<< HEAD
  page: any;
  customer: Customer;
  categories: Category[] = [];
  statuses: Status[] = [];
  status: Status;
  task: any;
  percentage: any;
  file: any;
  paginationArray: number[];
  errorMessage: string;
  interest: any;
  filePath: string;
  checkImg: boolean = false;
  checkCustomer: boolean = false;

  customers: any[]; // Danh sách khách hàng
  currentPage: number = 0; // Trang hiện tại
  totalPages: number; // Tổng số trang
  pageNumbers: number[];

=======
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02
  constructor(private customerService: CustomerServiceService,
              private categoryService: CategoryServiceService,
              private statusService: StatusService,
              private contractService: ContractService,
              private fireStorage: AngularFireStorage,
              private router: Router
  ) {
    this.customerService.getAll(0, '').subscribe(next => {
      this.page = next;
<<<<<<< HEAD
      this.pageNumbers = Array.from({ length: this.page.totalPages }, (_, i) => i + 1);
      console.log(this.page)
    })
    console.log(this.pageNumbers)
  }

  goToPage(page: number = 0, nameCustomer: string = ''): void {
    this.customerService.getAll(page, nameCustomer).subscribe(next => { this.page = next; this.totalPages = this.page.totalPages; console.log(this.page) })
    this.currentPage = page;
    console.log(nameCustomer)
  }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe(next => { this.categories = next; });
    this.statusService.findAll().subscribe(next => { this.statuses = next; });
  }
=======
      this.pageNumbers = Array.from({length: this.page.totalPages}, (_, i) => i + 1);
      console.log(this.page);
    });
    console.log(this.pageNumbers);
  }

  page: any;
  customer: Customer;
  categories: Category[] = [];
  category: Category;
  statuses: Status[] = [];
  status: Status;
  task: any;
  percentage: any;
  file: any;
  paginationArray: number[];
  errorMessage: string;
  interest: any;
  filePath: string;
  checkImg = false;
  checkCustomer = false;

  customers: any[]; // Danh sách khách hàng
  currentPage = 0; // Trang hiện tại
  totalPages: number; // Tổng số trang
  pageNumbers: number[];
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02


  contractForm: FormGroup = new FormGroup({
    nameProduct: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    beginDate: new FormControl('', [Validators.required, this.validatePastDate]),
    endDate: new FormControl('', [Validators.required, this.validatePastDate]),
<<<<<<< HEAD
    price: new FormControl('', [Validators.required, Validators.min(500000), Validators.max(1000000000), Validators.pattern("[0-9]+")]),
=======
    price: new FormControl('', [Validators.required, Validators.min(500000), Validators.max(1000000000), Validators.pattern('[0-9]+')]),
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02
    imgPath: new FormControl(),
    interest: new FormControl(),
    category: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    username: new FormControl(localStorage.getItem('username')),
    customer: new FormControl()
  }, [this.validateDateRange]);

<<<<<<< HEAD
=======
  goToPage(page: number = 0, nameCustomer: string = ''): void {
    this.customerService.getAll(page, nameCustomer).subscribe(next => {
      this.page = next;
      this.totalPages = this.page.totalPages;
      console.log(this.page);
    });
    this.currentPage = page;
  }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe(next => {
      this.categories = next;
    });
    this.statusService.findAll().subscribe(next => {
      this.statuses = next;
    });
  }


  // onFileChange($event) {
  //   this.file = $event.target.files[0];
  //   if (this.file != null) {
  //     this.checkImg = true;
  //   }
  //   const reader = new FileReader();
  //   reader.readAsDataURL(this.file);
  //   reader.onload = (e: any) => {
  //     this.filePath = e.target.result;
  //   }
  // }

  // onFileChange($event) {
  //   this.file = $event.target.files[0];
  //   if (this.file != null) {
  //     // Kiểm tra dung lượng tệp tin
  //     const fileSizeInMB = this.file.size / (1024 * 1024);
  //     const maxFileSizeInMB = 5; // Giới hạn dung lượng ảnh là 5MB
  //     if (fileSizeInMB > maxFileSizeInMB) {
  //       Swal.fire({
  //         icon: 'Lỗi!!',
  //         title: 'Oops...',
  //         text: 'Dung lượng ảnh vượt quá giới hạn cho phép.',
  //       })
  //       return;
  //     }

  //     this.checkImg = true;

  //     const reader = new FileReader();
  //     reader.readAsDataURL(this.file);
  //     reader.onload = (e: any) => {
  //       this.filePath = e.target.result;
  //     }
  //   }
  // }
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02

  onFileChange($event) {
    this.file = $event.target.files[0];
    if (this.file != null) {
<<<<<<< HEAD
      this.checkImg = true;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (e: any) => {
      this.filePath = e.target.result;
=======
      // Kiểm tra dung lượng tệp tin
      const fileSizeInMB = this.file.size / (1024 * 1024);
      const maxFileSizeInMB = 5; // Giới hạn dung lượng ảnh là 5MB
      if (fileSizeInMB > maxFileSizeInMB) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Dung lượng ảnh vượt quá giới hạn cho phép.',
        });
        this.file = null;
        return;
      }

      // Kiểm tra phần mở rộng của tệp tin
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      const fileExtension = this.file.name.toLowerCase().substring(this.file.name.lastIndexOf('.'));
      if (!allowedExtensions.includes(fileExtension)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Tệp tin không phải là ảnh.',
        });
        this.file = null;
        return;
      }

      this.checkImg = true;

      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e: any) => {
        this.filePath = e.target.result;
      };
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02
    }
  }

  selectCustomer(customer: Customer) {
    this.checkCustomer = true;
    this.customer = customer;
    this.contractForm.controls.customer.setValue(customer);
<<<<<<< HEAD
    console.log("CHọn khách hàng")
=======
    console.log('CHọn khách hàng');
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02
    console.log(this.contractForm.controls.customer.value);
  }

  async submit() {
    const buttonLoad: HTMLElement | null = document.getElementById('submit_button');
    buttonLoad.innerHTML =
      `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="color: darkseagreen"></span>
      <span class="visually-hidden">Loading...</span>`;
    try {
<<<<<<< HEAD
      const uploadTask = await this.fireStorage.upload("/productImg" + Math.random() + this.file, this.file);
      const url = await uploadTask.ref.getDownloadURL();
      this.filePath = url;
      this.contractForm.controls.imgPath.setValue(url);
    }
    catch {
=======
      const uploadTask = await this.fireStorage.upload('/productImg' + Math.random() + this.file, this.file);
      const url = await uploadTask.ref.getDownloadURL();
      this.filePath = url;
      this.contractForm.controls.imgPath.setValue(url);
    } catch {
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02
      Swal.fire({
        icon: 'Lỗi!!',
        title: 'Oops...',
        text: 'Chưa upload ảnh!',
<<<<<<< HEAD
      }); buttonLoad.innerHTML = 'Gửi'
    }

    this.contractForm.controls.interest.setValue(this.interest);
    console.log("Summit()")
    console.log(this.contractForm.value)
    if (this.contractForm.valid && this.checkCustomer == true && this.checkImg == true) {
      console.log("okkkkkk")
=======
      });
      buttonLoad.innerHTML = 'Gửi';
    }

    this.contractForm.controls.interest.setValue(this.interest);
    console.log('Summit()');
    console.log(this.contractForm.value);
    if (this.contractForm.valid && this.checkCustomer === true && this.checkImg === true) {
      console.log('okkkkkk');
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02
      this.contractService.saveContract(this.contractForm.value).subscribe(
        next => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          });
          Toast.fire({
            icon: 'success',
            title: 'Thêm mới thành công! Vui lòng kiểm tra email'
<<<<<<< HEAD
          });;
          this.router.navigateByUrl('/admin/contract')
        }, err => {buttonLoad.innerHTML = 'Gửi';})
    } else if (this.checkCustomer == false) {
=======
          });
          this.router.navigateByUrl('/admin/contract');
        }, err => {
          buttonLoad.innerHTML = 'Gửi';
        });
    } else if (this.checkCustomer === false) {
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02
      Swal.fire({
        icon: 'Lỗi',
        title: 'Oops...',
        text: 'Chưa chọn khách hàng',
<<<<<<< HEAD
      }); buttonLoad.innerHTML = 'Gửi';
=======
      });
      buttonLoad.innerHTML = 'Gửi';
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02
    }
  }

  validatePastDate(control: FormControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
<<<<<<< HEAD
      return { pastDate: true };
=======
      return {pastDate: true};
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02
    }

    return null;
  }

  validateDateRange(group: FormGroup): ValidationErrors | null {
    const beginDate = group.get('beginDate')?.value;
    const endDate = group.get('endDate')?.value;

    if (beginDate && endDate && beginDate > endDate) {
<<<<<<< HEAD
      return { dateRangeInvalid: true };
=======
      return {dateRangeInvalid: true};
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02
    }

    return null;
  }

  setInterestValue(value: any) {
<<<<<<< HEAD
    this.interest = value * 0.1;
=======
    this.interest = (value * 0.1).toFixed(1);
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02
  }
}
