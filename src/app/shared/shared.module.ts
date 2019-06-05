import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { PageSiderComponent } from './page-sider/page-sider.component';
import { PageContentComponent } from './page-content/page-content.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagePaginationComponent } from './page-pagination/page-pagination.component';
import { NozFnValuePipe } from '@shared/pipes/fn-value.pipe';

const COMPONENTS = [
  PageLayoutComponent,
  PageSiderComponent,
  PageHeaderComponent,
  PageContentComponent,
  NozFnValuePipe
];

const IMPORT_MODULE = [
  CommonModule,
  NgZorroAntdModule
];

const EXPORT_MODULE = [
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  ...COMPONENTS,
  ...IMPORT_MODULE
];

@NgModule({
  declarations: [...COMPONENTS, PagePaginationComponent],
  imports: IMPORT_MODULE,
  exports: [
    EXPORT_MODULE,
    PagePaginationComponent
  ]
})
export class SharedModule {
}
