import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface Layout {
  collapsed?: boolean;
  layoutId: string;
  mode?: 'left' | 'top';
}

@Injectable()
export class LayoutStore {

  private layout$ = new Subject<Layout>();
  private store: Map<string, Layout>;

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

  toggleCollapsed(is) {

  }
}
