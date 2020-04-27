import { NgModule } from '@angular/core';
import { NzTreeModule } from 'ng-zorro-antd/tree';

import { SharedModule } from '@shared/shared.module';
import { TreeRoutingModule } from './tree-routing.module';
import { BasicComponent } from './basic/basic.component';
import { AdvancedComponent } from './advanced/advanced.component';

@NgModule({
  declarations: [BasicComponent, AdvancedComponent],
  imports: [
    SharedModule,
    NzTreeModule,
    TreeRoutingModule
  ]
})
export class TreeModule { }
