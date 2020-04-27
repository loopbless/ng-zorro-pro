import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { PageSiderComponent } from './page-sider/page-sider.component';
import { PageContentComponent } from './page-content/page-content.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagePaginationComponent } from './page-pagination/page-pagination.component';
import { NozFnValuePipe } from './pipes/fn-value.pipe';
import { SiderTriggerComponent } from './page-sider/sider-trigger.component';

const COMPONENTS = [
  PageLayoutComponent,
  PageSiderComponent,
  PageHeaderComponent,
  PageContentComponent,
  SiderTriggerComponent,
  NozFnValuePipe,
];

const IMPORT_MODULE = [
  CommonModule,
  NzTableModule,
  NzCardModule,
  NzDividerModule,
  NzBreadCrumbModule
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
