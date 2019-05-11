import { NgModule } from '@angular/core';
import { BasicComponent } from './basic/basic.component';
import { QueryTableComponent } from './table/query-table.component';
import { ListRoutingModule } from './list-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    BasicComponent,
    QueryTableComponent
  ],
  imports: [
    SharedModule,
    ListRoutingModule
  ]
})
export class ListModule {
}
