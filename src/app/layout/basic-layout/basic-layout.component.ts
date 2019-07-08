import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { nzoLayoutService } from '../nzo-layout.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuApi } from '@apis/menu';
import { setting } from '../../../setting';

export const GLOBAL_LAYOUT_ID = 'main';

@Component({
  selector: 'nzo-basic-layout',
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
  @ViewChild('header', {static: false}) header: ElementRef;

  constructor(private menu: MenuApi,
              private router: Router,
              private cdr: ChangeDetectorRef,
              private layout: nzoLayoutService) {
    this.router.events.pipe(
      filter(event => (event instanceof NavigationEnd))
    ).subscribe((event: any) => {
      if (this.currentUrl !== event.url) {
        this.currentUrl = event.url;
      }
      this.layout.setCurrentRouter(event.url);
    });
    this.layout.layoutChange(GLOBAL_LAYOUT_ID).subscribe(data => {
      this.setting.layoutMode = data.mode || this.setting.layoutMode;
      this.isCollapsed = data.collapsed || this.isCollapsed;
    });
  }

  ngOnInit() {
    this.menu.list().subscribe(data => {
      this.menus = data;
      this.layout.cacheMenus(data);
    });
  }

  onChangeCollapsed(event: any) {
    this.layout.dispatch({collapsed: event, layoutId: GLOBAL_LAYOUT_ID});
  }
}
