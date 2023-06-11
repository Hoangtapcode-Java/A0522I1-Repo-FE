import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import {AngularFireModule} from "@angular/fire";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import { EditEmployeeInforComponent } from './edit-employee-infor/edit-employee-infor.component';
import {ReactiveFormsModule} from "@angular/forms";
import {environment} from "../../../../environments/environment";



@NgModule({
  declarations: [  EditEmployeeInforComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
  ]
})
export class EmployeeModule { }
