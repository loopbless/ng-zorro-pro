import { NgModule } from '@angular/core';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { LayoutService } from './layout.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SettingDrawerComponent } from './setting-drawer/setting-drawer.component';
import { GlobalHeaderComponent } from './global-header/global-header.component';
import { GlobalFooterComponent } from './global-footer/global-footer.component';
import { ThemeColorComponent } from './theme-color/theme-color.component';
import { LevelsMenuComponent } from './levels-menu/levels-menu.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    BasicLayoutComponent,
    NavigationBarComponent,
    SettingDrawerComponent,
    GlobalHeaderComponent,
    GlobalFooterComponent,
    ThemeColorComponent,
    LevelsMenuComponent,
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule,
    ScrollingModule
  ],
  providers: [
    LayoutService
  ]
})
export class LayoutModule {
}
