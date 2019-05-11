import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { StepComponent } from './step/step.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'basic'},
  {path: 'basic', component: BasicComponent},
  {path: 'advanced', component: AdvancedComponent},
  {path: 'step', component: StepComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
