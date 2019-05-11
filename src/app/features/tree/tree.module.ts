import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { TreeRoutingModule } from './tree-routing.module';
import { BasicComponent } from './basic/basic.component';

@NgModule({
  declarations: [BasicComponent],
  imports: [
    SharedModule,
    TreeRoutingModule
  ]
})
export class TreeModule { }
