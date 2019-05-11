import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'ant-pro-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.less'],
  host: {
    class: 'ant-pro-layout-header'
  }
})
export class PageHeaderComponent implements OnInit {

  @Input() pageHeader: TemplateRef<any>;

  @Input() breadcrumbs = [];

  @Input() title: string;

  @Input() description: string | TemplateRef<any>;

  constructor() {
  }

  ngOnInit() {
  }

}
