import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicLayoutComponent } from './layout/basic-layout/basic-layout.component';

const routes: Routes = [
  {
    path: '', component: BasicLayoutComponent, children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {
        path: 'dashboard',
        loadChildren: './features/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'list',
        loadChildren: './features/list/list.module#ListModule'
      },
      {
        path: 'form',
        loadChildren: './features/form/form.module#FormModule'
      },
      {
        path: 'tree',
        loadChildren: './features/tree/tree.module#TreeModule'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
