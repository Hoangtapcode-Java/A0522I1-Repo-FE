import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailComponent } from './detail/detail.component';
import {AngularFireModule} from "@angular/fire";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {environment} from "../../../../environments/environment";


@NgModule({
  declarations: [ CreateComponent, ListComponent, UpdateComponent, DeleteComponent, DetailComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ]
})
export class ProductModule { }
