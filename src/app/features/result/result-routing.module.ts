import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuccessComponent } from './success/success.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'success'},
  {path: 'success', component: SuccessComponent},
  {path: 'error', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultRoutingModule { }
