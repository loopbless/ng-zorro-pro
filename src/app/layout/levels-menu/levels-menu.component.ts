import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input, NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { NzDirectionVHIType } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { delay } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

export interface Menu {
  name: string;
  icon?: string;
  router?: string;
  children?: Menu[];
}

@Component({
  selector: 'ant-pro-levels-menu',
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
  @Input() mode: NzDirectionVHIType;
  @Input() inlineCollapsed: boolean;
  media$: Observable<BreakpointState>;
  destroyMedia$: Subscription;
  private maxWidth: number;
  private cacheMenus: Menu[];

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
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.menus && changes.menus.currentValue) {
      this.cacheMenus = changes.menus.currentValue;
    }
    if (changes.mode && this.mode === 'horizontal') {
      this.destroyMedia$ = this.media$.subscribe(this.changeMenuWidth());
    }
  }

  ngOnDestroy(): void {
    if (this.destroyMedia$) {
      this.destroyMedia$.unsubscribe();
    }
  }

  onGoPage(menu: any) {
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
        menus.push({name: '...', children: submenus});
        this.menus = menus;
      } else {
        this.menus = [...this.cacheMenus];
      }
      this.cdr.detectChanges();
    };
  }
}
