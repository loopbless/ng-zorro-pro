import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { SettingComponent } from './setting/setting.component';
import { CenterComponent } from './center/center.component';

@NgModule({
  declarations: [SettingComponent, CenterComponent],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
