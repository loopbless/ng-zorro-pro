import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuApi } from '../../core/apis/menu.api';
import { Layout, LayoutStore } from '../layout.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

const layoutId = 'main';

@Component({
  selector: 'pro-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: [
    './basic-layout.component.less',
    '../navigation-bar/navigation-bar.component.less'
  ],
})
export class BasicLayoutComponent implements OnInit {

  layout: Layout = {layoutId, mode: 'left'};

  menus$: Observable<any[]>;
  currentUrl: string;

  constructor(private menu: MenuApi,
              private router: Router,
              private store: LayoutStore) {
    this.router.events.pipe(
      filter(event => (event instanceof NavigationEnd))
    ).subscribe((event: any) => {
      if (this.currentUrl !== event.url) {
        this.currentUrl = event.url;
      }
    });
  }

  ngOnInit() {
    this.menus$ = this.menu.list();
    this.store.layoutChange(layoutId).subscribe(data => {
      this.layout = data;
    });
  }

  onChangeCollapsed(event: any) {
    this.store.dispatch({collapsed: event, layoutId});
  }

  onGoPage(menu: any) {
    this.router.navigate([menu.router]);
  }
}
