import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Layout, LayoutService, ProModeType } from '../layout.service';
import { GLOBAL_LAYOUT_ID } from '../basic-layout/basic-layout.component';

@Component({
  selector: 'ant-pro-setting-drawer',
  templateUrl: './setting-drawer.component.html',
  styleUrls: ['./setting-drawer.component.less']
})
export class SettingDrawerComponent implements OnInit {
  visible = false;

  @Input() setting: any;

  constructor(private layout: LayoutService) {
  }

  ngOnInit() {
  }

  changeNavMode(mode: ProModeType) {
    this.setting.layoutMode = mode;
    this.layout.dispatch({layoutId: GLOBAL_LAYOUT_ID, mode});
  }
}
