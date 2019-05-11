import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { TreeRoutingModule } from './tree-routing.module';
import { BasicComponent } from './basic/basic.component';
import { AdvancedComponent } from './advanced/advanced.component';

@NgModule({
  declarations: [BasicComponent, AdvancedComponent],
  imports: [
    SharedModule,
    TreeRoutingModule
  ]
})
export class TreeModule { }
