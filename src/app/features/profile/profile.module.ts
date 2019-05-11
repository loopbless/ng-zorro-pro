import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { BasicComponent } from './basic/basic.component';
import { AdvancedComponent } from './advanced/advanced.component';

@NgModule({
  declarations: [BasicComponent, AdvancedComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
