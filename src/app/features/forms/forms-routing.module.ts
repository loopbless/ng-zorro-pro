import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { AdvancedFormComponent } from './advanced-form/advanced-form.component';

const routes: Routes = [
  {path: 'basic-form', component: BasicFormComponent},
  {path: 'advanced-form', component: AdvancedFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
