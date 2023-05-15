import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageRoutingModule } from './image-routing.module';
import { ImageComponent } from './image.component';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [ImageComponent, CreateComponent, DeleteComponent, UpdateComponent, ListComponent],
  imports: [
    CommonModule,
    ImageRoutingModule
  ]
})
export class ImageModule { }
