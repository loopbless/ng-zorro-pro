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
      {
        path: 'profile',
        loadChildren: './features/profile/profile.module#ProfileModule'
      },
      {
        path: 'result',
        loadChildren: './features/result/result.module#ResultModule'
      },
      {
        path: 'exception',
        loadChildren: './features/exception/exception.module#ExceptionModule'
      },
      {
        path: 'account',
        loadChildren: './features/account/account.module#AccountModule'
      },
      {
        path: 'editor',
        loadChildren: './features/editor/editor.module#EditorModule'
      },
      {
        path: 'code',
        loadChildren: './features/code/code.module#CodeModule'
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
