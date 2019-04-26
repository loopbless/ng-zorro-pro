import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { TreesRoutingModule } from './trees-routing.module';
import { BasicTreeComponent } from './basic-tree/basic-tree.component';

@NgModule({
  declarations: [BasicTreeComponent],
  imports: [
    SharedModule,
    TreesRoutingModule
  ]
})
export class TreesModule { }
