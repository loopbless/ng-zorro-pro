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
        path: 'table',
        loadChildren: './features/tables/tables.module#TablesModule'
      },
      {
        path: 'form',
        loadChildren: './features/forms/forms.module#FormsModule'
      },
      {
        path: 'tree',
        loadChildren: './features/trees/trees.module#TreesModule'
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
