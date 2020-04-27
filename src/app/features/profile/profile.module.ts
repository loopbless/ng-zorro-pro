import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { ProfileRoutingModule } from './profile-routing.module';
import { BasicComponent } from './basic/basic.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [BasicComponent, AdvancedComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NzLayoutModule,
    SharedModule
  ]
})
export class ProfileModule { }
