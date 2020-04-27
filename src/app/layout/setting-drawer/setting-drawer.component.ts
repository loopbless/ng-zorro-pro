import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { nzoLayoutService, ProModeType } from '../nzo-layout.service';
import { GLOBAL_LAYOUT_ID } from '../basic-layout/basic-layout.component';

@Component({
  selector: 'nzo-setting-drawer',
  templateUrl: './setting-drawer.component.html',
  styleUrls: ['./setting-drawer.component.less']
})
export class SettingDrawerComponent implements OnInit {
  visible = false;

  @Input() setting: any;

  constructor(private layout: nzoLayoutService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const { mode } = this.route.snapshot.queryParams;
    if (mode) {
      this.setting.layoutMode = mode;
      this.layout.dispatch({ layoutId: GLOBAL_LAYOUT_ID, mode });
    }
  }

  changeNavMode(mode: ProModeType) {
    this.setting.layoutMode = mode;
    this.router.navigate([this.router.url.replace(/^(.+)\?.+/, '$1')], { queryParams: { mode } });
    this.layout.dispatch({ layoutId: GLOBAL_LAYOUT_ID, mode });
  }
}
