import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export type ProModeType = 'vertical' | 'horizontal';

export interface Layout {
  collapsed?: boolean;
  layoutId: string;
  mode?: ProModeType;
}

@Injectable()
export class LayoutService {

  private layout$ = new Subject<Layout>();
  private menu$ = new Subject();
  private menu: any;
  private store: Map<string, Layout> = new Map<string, any>();

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
}
