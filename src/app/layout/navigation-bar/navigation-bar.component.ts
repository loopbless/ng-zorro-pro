import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../levels-menu/levels-menu.component';
import { NzMenuModeType } from 'ng-zorro-antd/menu';

@Component({
  selector: 'nzo-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.less'],
  exportAs: 'navigation'
})
export class NavigationBarComponent implements OnInit {

  @Input() collapsed: boolean;
  @Input() selectedUrl: string;
  @Input() menus: Menu[];
  @Input() mode: NzMenuModeType;
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onGoPage(menu: any) {
    this.router.navigate([menu.router]);
  }
}
