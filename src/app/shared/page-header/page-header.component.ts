import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nzo-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.less'],
  host: {
    class: 'nzo-layout-header'
  },
})
export class PageHeaderComponent implements OnInit {

  @Input()  @ViewChild('contentTmpl') content: TemplateRef<any>;

  @Input() breadcrumbs = [];

  @Input() title: string;

  @Input() description: string;

  constructor() {
  }

  ngOnInit() {
  }

}
