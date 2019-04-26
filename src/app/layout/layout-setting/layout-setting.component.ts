import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Layout } from '../layout.service';

@Component({
  selector: 'pro-layout-setting',
  templateUrl: './layout-setting.component.html',
  styleUrls: ['./layout-setting.component.less']
})
export class LayoutSettingComponent implements OnInit {
  visible = false;

  @Input() layout: Layout;
  @Output() layoutChange = new EventEmitter<Layout>();

  constructor() {
  }

  ngOnInit() {
  }

  changeNavMode(mode: 'left' | 'top') {
    this.layout.mode = mode;
    console.log(this.layout)
    this.layoutChange.emit(this.layout);
  }
}
