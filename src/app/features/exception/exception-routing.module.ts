import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { NotPermissionComponent } from './not-permission/not-permission.component';

const routes: Routes = [
  {path: '', redirectTo: '404', pathMatch: 'full'},
  {path: '403', component: NotPermissionComponent},
  {path: '404', component: NotFoundComponent},
  {path: '500', component: ServerErrorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExceptionRoutingModule { }
