import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'pro-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.less'],
  host: {
    class: 'pro-layout-header'
  }
})
export class PageHeaderComponent implements OnInit {

  @Input() pageHeader: TemplateRef<any>;

  @Input() breadcrumbs = [];

  @Input() title: string;

  @Input() description: string;

  constructor() {
  }

  ngOnInit() {
  }

}
