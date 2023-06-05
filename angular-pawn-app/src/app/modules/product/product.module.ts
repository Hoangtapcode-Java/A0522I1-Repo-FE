import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {ProductComponent} from './product.component';
import {CreateComponent} from './create/create.component';
import {ListComponent} from './list/list.component';
import {UpdateComponent} from './update/update.component';
import {DeleteComponent} from './delete/delete.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DetailComponent} from './detail/detail.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from "../../../environments/environment";
import {AngularFireStorageModule} from '@angular/fire/storage';


@NgModule({
  declarations: [ProductComponent, CreateComponent, ListComponent, UpdateComponent, DeleteComponent, DetailComponent],
  imports: [
      CommonModule,
      ProductRoutingModule,
      ReactiveFormsModule,
      FormsModule,
      CommonModule,
      ProductRoutingModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireStorageModule,

    ]
})
export class ProductModule {
}
