import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicTreeComponent } from './basic-tree/basic-tree.component';

const routes: Routes = [
  {path:  'basic-tree', component: BasicTreeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreesRoutingModule { }
