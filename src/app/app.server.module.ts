import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
// 引入必要的模块
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NZ_I18N, NzI18nModule, zh_CN } from 'ng-zorro-antd/i18n';
import { ANT_ICONS } from '../ant-icons';
import { NZ_ICONS } from 'ng-zorro-antd';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    HttpClientModule,
    NoopAnimationsModule,
    NzI18nModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    {provide: NZ_ICONS, useValue: ANT_ICONS}
  ]
})
export class AppServerModule {}
