import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { nzoLayoutService } from './nzo-layout.service';
import { SettingDrawerComponent } from './setting-drawer/setting-drawer.component';
import { GlobalHeaderComponent } from './global-header/global-header.component';
import { GlobalFooterComponent } from './global-footer/global-footer.component';
import { ThemeColorComponent } from './theme-color/theme-color.component';
import { LevelsMenuComponent } from './levels-menu/levels-menu.component';

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
    NzLayoutModule,
    NzAvatarModule,
    NzBadgeModule,
    NzDropDownModule,
    NzIconModule,
    NzDrawerModule,
    NzToolTipModule,
    RouterModule,
    ScrollingModule
  ],
  providers: [
    nzoLayoutService
  ]
})
export class LayoutModule {
}
