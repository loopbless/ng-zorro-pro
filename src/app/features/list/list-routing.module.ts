import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { QueryTableComponent } from './table/query-table.component';

const routes: Routes = [
  {path: 'basic', component: BasicComponent},
  {path: 'table', component: QueryTableComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
