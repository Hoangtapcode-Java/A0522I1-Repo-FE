import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../../environments/environment";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import { EditEmployeeInforComponent } from './edit-employee-infor/edit-employee-infor.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [EmployeeComponent, CreateComponent, ListComponent, UpdateComponent, DeleteComponent, EditEmployeeInforComponent],
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
