import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ant-pro-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.less'],
  host: {
    class: 'ant-pro-page-content ant-layout-content '
  }
})

export class PageContentComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
