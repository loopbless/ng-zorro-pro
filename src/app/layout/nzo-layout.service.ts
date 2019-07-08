import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Menu } from './levels-menu/levels-menu.component';

export type ProModeType = 'vertical' | 'horizontal';

export interface Layout {
  collapsed?: boolean;
  layoutId: string;
  mode?: ProModeType;
}

@Injectable()
export class nzoLayoutService {

  private layout$ = new Subject<Layout>();
  private menus: Menu[];
  private menusHeap: any[];
  private menu$ = new Subject();
  private menu: any;
  private store: Map<string, Layout> = new Map<string, any>();
  private router: string;

  constructor() {
  }

  dispatch(layout: Layout) {
    const lastLayout = this.store.get(layout.layoutId);
    if (lastLayout) {
      layout = {...lastLayout, ...layout};
    }
    this.store.set(layout.layoutId, layout);
    this.layout$.next(layout);
  }

  layoutChange(type: string) {
    return this.layout$.pipe(filter(layout => layout.layoutId === type));
  }

  actived(router: string) {
    this.menu = router;
    this.menu$.next(router);
  }

  isSelected(router) {
    return this.menu === router;
  }

  routerChange() {
    return this.menu$.asObservable();
  }

  cacheMenus(data: Menu[]) {
    this.menus = data;
    this.menusHeap = this.assembleMenusHeap(this.menus);
  }

  private assembleMenusHeap(menus: Menu[], parentIndex = -1) {
    const menusHeap: any[] = [];
    menus.forEach((menu, index) => {
      menusHeap.push({...menu, parentIndex, index: (menusHeap.length - 1)});
      if (menu.children && menu.children.length > 0) {
        menusHeap.push(...this.assembleMenusHeap(menu.children, menusHeap.length - 1));
      }
    });
    return menusHeap;
  }

  getBreadcrumbs(url: string = this.router) {
    const breadcrumbs = [];
    let menu = this.menusHeap.find(item => this.router.includes(item.router));
    while (menu) {
      if (menu) {
        breadcrumbs.unshift(menu);
      }
      menu = this.menusHeap[menu.parentIndex];
    }
    return breadcrumbs;
  }

  setCurrentRouter(router: string) {
    this.router = router;
  }
}
