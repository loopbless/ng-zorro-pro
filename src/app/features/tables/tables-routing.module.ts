import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicTableComponent } from './basic-table/basic-table.component';
import { QueryTableComponent } from './query-table/query-table.component';

const routes: Routes = [
  {path: 'basic-table', component: BasicTableComponent},
  {path: 'query-table', component: QueryTableComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
