import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { delay } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { NzMenuModeType } from 'ng-zorro-antd/menu';

export interface Menu {
  name: string;
  icon?: string;
  router?: string;
  open?: boolean;
  selected?: boolean;
  children?: Menu[];
}

@Component({
  selector: 'nzo-levels-menu',
  templateUrl: './levels-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host {
      width: 100%;
    }
  `]
})
export class LevelsMenuComponent implements OnInit, OnChanges, OnDestroy {
  @Input() menus: Menu[] = [];
  @Input() selected: string;
  @Input() theme: 'light' | 'dark';
  @Input() mode: NzMenuModeType;
  @Input() inlineCollapsed: boolean;
  media$: Observable<BreakpointState>;
  cancelMedia$: Subscription;
  selectedMenus: Menu[];
  private maxWidth: number;
  private cacheMenus: Menu[];
  private selectedMenu: Menu;

  constructor(private router: Router,
              private elem: ElementRef,
              private cdr: ChangeDetectorRef,
              private breakpointObserver: BreakpointObserver) {
    this.media$ = this.breakpointObserver.observe([
      '(min-width: 1200px)',
      '(min-width: 1080px)',
      '(min-width: 960px)',
      '(min-width: 840px)',
      '(min-width: 720px)',
      '(min-width: 600px)',
    ]).pipe(delay(200));
    this._mediaMenus();
  }

  ngOnInit() {
    this.selectedMenus = this.selectMenus(this.menus);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.menus && changes.menus.currentValue) {
      this.cacheMenus = this.menus;
    }
    if (changes.mode) {
      if (this.mode === 'horizontal') {
        this._mediaMenus();
      } else {
        this.ngOnDestroy();
      }
    }
  }

  private _mediaMenus() {
    if (!this.cancelMedia$) {
      this.cancelMedia$ = this.media$.subscribe(this.changeMenuWidth());
    }
  }

  ngOnDestroy(): void {
    if (this.cancelMedia$) {
      this.cancelMedia$.unsubscribe();
      this.cancelMedia$ = null;
    }
  }

  onGoPage(menu: any) {
    if (this.selectedMenu) {
      this.selectedMenu.selected = false;
      this.selectedMenu = null;
    }
    this.router.navigate([menu.router]);
  }

  changeMenuWidth() {
    const elem = this.elem.nativeElement;
    return () => {
      const width = elem.firstChild.offsetWidth;
      this.maxWidth = this.maxWidth > width ? this.maxWidth : width;
      const relativeWidth = this.maxWidth - elem.offsetWidth;
      const len = Math.ceil(relativeWidth / 100);
      if (len > 0) {
        const menus = this.cacheMenus.slice(0, this.cacheMenus.length - len);
        const submenus = this.cacheMenus.slice(this.cacheMenus.length - len);
        menus.push({ name: '...', children: submenus });
        this.menus = menus;
      } else {
        this.menus = [...this.cacheMenus];
      }
      this.cdr.detectChanges();
    };
  }

  private selectMenus(menus: Menu[] = []) {
    let currMenus = menus;
    let prevMenus = [];
    let nextMenus = [];
    let currLengths = [];
    let prevLengths = [];
    while (currMenus.length > 0) {
      for (let i = 0, len = currMenus.length; i < len; i++) {
        const menu = currMenus[i];
        if (menu.router === this.selected) {
          menu.selected = true;
          let al = 0;
          for (let y = 0, preLen = prevLengths.length; y < preLen; y++) {
            if (i + 1 - al <= prevLengths[y]) {
              prevMenus[y].open = this.mode === 'vertical';
              break;
            }
            al += prevLengths[y];
          }
          this.selectedMenu = menu;
          return menus;
        } else if (menu.children && menu.children.length > 0) {
          nextMenus.push(...menu.children);
        }
        currLengths.push(menu.children ? menu.children.length : 0);
      }
      prevMenus = currMenus;
      currMenus = nextMenus;
      nextMenus = [];
      prevLengths = currLengths;
      currLengths = [];
    }
    return menus;
  }
}
