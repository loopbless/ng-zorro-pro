import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplatesComponent } from './templates/templates.component';
import { ThemeComponent } from './theme/theme.component';
import { SettingComponent } from './setting/setting.component';
import { TemplateFormComponent } from './template-form/template-form.component';

const routes: Routes = [
  {path: '', redirectTo: 'template', pathMatch: 'full'},
  {path: 'theme', component: ThemeComponent},
  {path: 'template', component: TemplatesComponent},
  {path: 'template/new', component: TemplateFormComponent},
  {path: 'setting/:code', component: SettingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeRoutingModule { }
