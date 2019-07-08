import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nzo-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.less'],
})
export class GlobalHeaderComponent implements OnInit {

  menus: any[] = [];

  @Input() theme: 'dark' | 'light' = 'light';

  user = {avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'};

  constructor() {
  }

  ngOnInit() {
  }

}
