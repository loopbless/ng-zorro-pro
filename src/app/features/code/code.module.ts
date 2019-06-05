import { NgModule } from '@angular/core';

import { CodeRoutingModule } from './code-routing.module';
import { TemplatesComponent } from './templates/templates.component';
import { SharedModule } from '@shared/shared.module';
import { ThemeComponent } from './theme/theme.component';
import { SettingComponent } from './setting/setting.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { HtmlCompilerModule } from './html-compiler/html-compiler.module';

@NgModule({
  declarations: [
    TemplatesComponent,
    ThemeComponent,
    SettingComponent,
    TemplateFormComponent
  ],
  imports: [
    SharedModule,
    HtmlCompilerModule,
    CodeRoutingModule
  ]
})
export class CodeModule {
}
