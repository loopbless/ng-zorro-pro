import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuApi } from '../../core/apis/menu.api';
import { LayoutService } from '../layout.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { setting } from 'src/setting';

export const GLOBAL_LAYOUT_ID = 'main';

@Component({
  selector: 'ant-pro-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: [
    './basic-layout.component.less',
    '../navigation-bar/navigation-bar.component.less'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicLayoutComponent implements OnInit {
  setting = setting;

  isCollapsed = false;
  menus: any[];
  currentUrl: string;
  @ViewChild('header') header: ElementRef;

  constructor(private menu: MenuApi,
              private router: Router,
              private cdr: ChangeDetectorRef,
              private store: LayoutService) {
    this.router.events.pipe(
      filter(event => (event instanceof NavigationEnd))
    ).subscribe((event: any) => {
      if (this.currentUrl !== event.url) {
        this.currentUrl = event.url;
      }
    });
    this.store.layoutChange(GLOBAL_LAYOUT_ID).subscribe(data => {
      this.setting.layoutMode = data.mode || this.setting.layoutMode;
      this.isCollapsed = data.collapsed || this.isCollapsed;
    });
  }

  ngOnInit() {
    this.menu.list().subscribe(data => {
      this.menus = data;
    });
  }

  onChangeCollapsed(event: any) {
    this.store.dispatch({collapsed: event, layoutId: GLOBAL_LAYOUT_ID});
  }
}
