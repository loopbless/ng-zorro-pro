import { NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { CodeRoutingModule } from './code-routing.module';
import { TemplatesComponent } from './templates/templates.component';
import { SharedModule } from '@shared/shared.module';
import { ThemeComponent } from './theme/theme.component';
import { SettingComponent } from './setting/setting.component';
import { TemplateFormComponent } from './template-form/template-form.component';

@NgModule({
  declarations: [
    TemplatesComponent,
    ThemeComponent,
    SettingComponent,
    TemplateFormComponent
  ],
  imports: [
    SharedModule,
    NzIconModule,
    NzCardModule,
    NzTabsModule,
    NzButtonModule,
    CodeRoutingModule
  ]
})
export class CodeModule {
}
