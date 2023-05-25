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


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
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

  constructor(private customerService: CustomerServiceService,
    private categoryService: CategoryServiceService,
    private statusService: StatusServiceService,
    private contractService: ContractServiceService,
    private fireStorage: AngularFireStorage,
    private router: Router
  ) {
    this.customerService.getAll().subscribe(next => { this.page = next;})
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(next => { this.categories = next;});
    this.statusService.getAll().subscribe(next => { this.statuses = next;});
  }

  contractForm: FormGroup = new FormGroup({
    nameProduct: new FormControl('', [Validators.required]),
    beginDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    interest: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    username: new FormControl(localStorage.getItem('token')),
    customer: new FormControl()
  });
  
  onFileChange($event){
    this.file = $event.target.files[0]
  }

  async uploadImg(){
    console.log(this.file)
    const uploadTask = await this.fireStorage.upload("/productImg"+Math.random()+this.file, this.file);
    const url = await uploadTask.ref.getDownloadURL();
    this.contractForm.controls.img.setValue(url);
  }

  selectCustomer(customer: Customer){
    this.contractForm.controls.customer.setValue(customer);
    // console.log(this.contractForm.controls.customer.value)
  }

  submit() {
    console.log(this.contractForm.value)
    if (this.contractForm.valid) {
      this.contractService.saveContract(this.contractForm.value).subscribe(next =>{
        alert("Product saved");
        this.router.navigateByUrl('/contract/create')})
    }
  }
}
