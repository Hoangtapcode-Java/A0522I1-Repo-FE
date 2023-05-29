import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [ArticleComponent, CreateComponent, UpdateComponent, ListComponent, DeleteComponent],
    exports: [
        ArticleComponent
    ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ArticleModule { }
