import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlowComponent } from './flow/flow.component';
import { MindComponent } from './mind/mind.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'flow'},
  {path: 'flow', component: FlowComponent},
  {path: 'mind', component: MindComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
