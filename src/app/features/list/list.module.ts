import { NgModule } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SharedModule } from '@shared/shared.module';
import { BasicComponent } from './basic/basic.component';
import { QueryTableComponent } from './table/query-table.component';
import { ListRoutingModule } from './list-routing.module';
import { CardComponent } from './card/card.component';
import { QueryTablesComponent } from './query-tables/query-tables.component';

@NgModule({
  declarations: [
    BasicComponent,
    QueryTableComponent,
    CardComponent,
    QueryTablesComponent
  ],
  imports: [
    SharedModule,
    NzTableModule,
    NzFormModule,
    NzDatePickerModule,
    NzTabsModule,
    NzInputNumberModule,
    NzInputModule,
    NzGridModule,
    NzAlertModule,
    NzMessageModule,
    NzIconModule,
    NzButtonModule,
    ListRoutingModule
  ]
})
export class ListModule {
}
