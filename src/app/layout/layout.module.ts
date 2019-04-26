import { NgModule } from '@angular/core';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { LayoutStore } from './layout.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { PageSiderComponent } from './page-sider/page-sider.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageContentComponent } from './page-content/page-content.component';
import { LayoutSettingComponent } from './layout-setting/layout-setting.component';

const EXPORT_COMPONENTS = [
  PageLayoutComponent,
  PageSiderComponent,
  PageHeaderComponent,
  PageContentComponent
];

@NgModule({
  declarations: [
    BasicLayoutComponent,
    NavigationBarComponent,
    ...EXPORT_COMPONENTS,
    LayoutSettingComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule
  ],
  exports: EXPORT_COMPONENTS,
  providers: [
    LayoutStore
  ]
})
export class LayoutModule {
}
