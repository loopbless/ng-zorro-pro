import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './setting/setting.component';
import { CenterComponent } from './center/center.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'setting'},
  {path: 'setting', component: SettingComponent},
  {path: 'center', component: CenterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
