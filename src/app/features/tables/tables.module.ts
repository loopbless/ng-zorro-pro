import { NgModule } from '@angular/core';
import { BasicTableComponent } from './basic-table/basic-table.component';
import { QueryTableComponent } from './query-table/query-table.component';
import { TablesRoutingModule } from './tables-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    BasicTableComponent,
    QueryTableComponent
  ],
  imports: [
    SharedModule,
    TablesRoutingModule
  ]
})
export class TablesModule {
}
