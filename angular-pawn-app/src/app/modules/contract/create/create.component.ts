import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { CustomerServiceService } from 'src/app/service/customer-service.service';
import { StatusServiceService } from 'src/app/service/status-service.service';
import { Category } from 'src/app/models/category/Category';
import { Status } from 'src/app/models/status/Status';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContractServiceService } from 'src/app/service/contract-service.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Customer } from 'src/app/models/customer/Customer';
import { ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
// ThuongVTH
export class CreateComponent implements OnInit {

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
  checkImg: boolean = false;
  checkCustomer: boolean = false;

  customers: any[]; // Danh sách khách hàng
  currentPage: number = 0; // Trang hiện tại
  totalPages: number; // Tổng số trang
  pageNumbers: number[];

  constructor(private customerService: CustomerServiceService,
    private categoryService: CategoryServiceService,
    private statusService: StatusServiceService,
    private contractService: ContractServiceService,
    private fireStorage: AngularFireStorage,
    private router: Router
  ) {
    this.customerService.getAll(0, '').subscribe(next => { this.page = next; 
                this.pageNumbers = Array.from({ length:  this.page.totalPages}, (_, i) => i + 1);
                console.log(this.page)})    
    console.log(this.pageNumbers)
  }

  goToPage(page: number = 0, nameCustomer: string = ''): void {
    this.customerService.getAll(page, nameCustomer).subscribe(next => { this.page = next; this.totalPages=this.page.totalPages; console.log(this.page)})
    this.currentPage = page;
    console.log(nameCustomer)
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(next => { this.categories = next;});
    this.statusService.getAll().subscribe(next => { this.statuses = next;});
    }
  
  
  contractForm: FormGroup = new FormGroup({
    nameProduct: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    beginDate: new FormControl('', [Validators.required, this.validatePastDate]),
    endDate: new FormControl('', [Validators.required, this.validatePastDate]),
    price: new FormControl('', [Validators.required, Validators.min(500000), Validators.max(1000000000), Validators.pattern("[0-9]+")]),
    imgPath: new FormControl(),
    interest: new FormControl(),
    category: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    username: new FormControl(localStorage.getItem('username')),
    customer: new FormControl()
  }, [this.validateDateRange]);
  

  onFileChange($event){
    // this.file = $event.target.files[0];
    this.file = $event.target.files[0];
      if (this.file != null){
        this.checkImg = true;
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e: any) => {
      this.filePath = e.target.result;
    }
  }

  selectCustomer(customer: Customer){
    this.checkCustomer = true;
    this.customer = customer;
    this.contractForm.controls.customer.setValue(customer);
    console.log("CHọn khách hàng")
    console.log(this.contractForm.controls.customer.value);
  }

  async submit() {
    try {
    const uploadTask = await this.fireStorage.upload("/productImg"+Math.random()+this.file, this.file);
    const url = await uploadTask.ref.getDownloadURL();
    this.filePath = url;
    this.contractForm.controls.imgPath.setValue(url);} 
    catch {
      alert("Chưa chọn ảnh")
    }
    this.contractForm.controls.interest.setValue(this.interest);
    console.log("Summit()")
    console.log(this.contractForm.value)
    if (this.contractForm.valid && this.checkCustomer==true && this.checkImg==true) {
      console.log("okkkkkk")
      this.contractService.saveContract(this.contractForm.value).subscribe(
        next => {alert("Product saved");
                this.router.navigateByUrl('/contract')})}else if (this.checkCustomer ==false){
                  alert("Chưa chọn khách hàng")
                }
  }

  validatePastDate(control: FormControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      return { pastDate: true };
    }

    return null;
  }

  validateDateRange(group: FormGroup): ValidationErrors | null {
    const beginDate = group.get('beginDate')?.value;
    const endDate = group.get('endDate')?.value;
  
    if (beginDate && endDate && beginDate > endDate) {
      return { dateRangeInvalid: true };
    }
  
    return null;
  }

  setInterestValue(value: any){
    this.interest = value*0.1;
  }
  }
