import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserHasRoleRoutingModule } from './user-has-role-routing.module';
import { UserHasRoleComponent } from './user-has-role.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';


@NgModule({
  declarations: [UserHasRoleComponent, CreateComponent, ListComponent, UpdateComponent, DeleteComponent],
  imports: [
    CommonModule,
    UserHasRoleRoutingModule
  ]
})
export class UserHasRoleModule { }
