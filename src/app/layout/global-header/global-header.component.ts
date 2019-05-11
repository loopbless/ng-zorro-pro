import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ant-pro-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.less'],
})
export class GlobalHeaderComponent implements OnInit {

  menus: any[] = [];

  @Input() theme: 'dark' | 'light' = 'light';

  user = {avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'};

  overlayStyle = {width: '160px', marginLeft: '-12px', marginRight: '-12px'};

  constructor() {
  }

  ngOnInit() {
  }

}
