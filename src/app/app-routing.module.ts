import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicLayoutComponent } from './layout/basic-layout/basic-layout.component';

const routes: Routes = [
  {
    path: '', component: BasicLayoutComponent, children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./features/list/list.module').then(m => m.ListModule)
      },
      {
        path: 'form',
        loadChildren: () => import('./features/form/form.module').then(m => m.FormModule)
      },
      {
        path: 'tree',
        loadChildren: () => import('./features/tree/tree.module').then(m => m.TreeModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'result',
        loadChildren: () => import('./features/result/result.module').then(m => m.ResultModule)
      },
      {
        path: 'exception',
        loadChildren: () => import('./features/exception/exception.module').then(m => m.ExceptionModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule)
      },
      {
        path: 'editor',
        loadChildren: () => import('./features/editor/editor.module').then(m => m.EditorModule)
      },
      {
        path: 'code',
        loadChildren: () => import('./features/code/code.module').then(m => m.CodeModule)
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
