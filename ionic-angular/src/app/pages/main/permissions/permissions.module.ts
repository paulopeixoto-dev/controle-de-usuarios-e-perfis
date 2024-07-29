import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermissionsPageRoutingModule } from './permissions-routing.module';

import { PermissionsPage } from './permissions.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermissionsPageRoutingModule,
    SharedModule
  ],
  declarations: [PermissionsPage]
})
export class PermissionsPageModule {}
