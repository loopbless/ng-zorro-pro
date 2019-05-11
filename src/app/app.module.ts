import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, NZ_ICONS, zh_CN } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LayoutModule } from './layout/layout.module';
import { ANT_ICONS } from '../ant-icons';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: zh_CN},
    {provide: NZ_ICONS, useValue: ANT_ICONS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
