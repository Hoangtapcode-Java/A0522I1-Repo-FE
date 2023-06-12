import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { CreateComponent } from './create/create.component';
import {AngularFireModule} from "@angular/fire";

import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import { ListComponent } from './list/list.component';
import {ArticlePageModule} from "../../article-page/article-page.module";


@NgModule({
  declarations: [ CreateComponent, ListComponent],
    imports: [
        CommonModule,
        ArticleRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        ReactiveFormsModule,
        FormsModule,
        ArticlePageModule
    ]
})
export class ArticleModule { }
