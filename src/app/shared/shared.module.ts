import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '../layout/layout.module';

const COMPONENTS = [
];

const IMPORT_MODULE = [
  CommonModule,
  NgZorroAntdModule,
  LayoutModule
];

const EXPORT_MODULE = [
  HttpClientModule,
  ...COMPONENTS,
  ...IMPORT_MODULE
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: IMPORT_MODULE,
  exports: EXPORT_MODULE
})
export class SharedModule {
}
