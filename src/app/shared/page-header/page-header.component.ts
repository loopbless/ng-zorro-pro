import { Component, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { nzoLayoutService } from '../../layout/nzo-layout.service';

@Component({
  selector: 'nzo-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.less'],
  host: {
    class: 'nzo-layout-header'
  },
})
export class PageHeaderComponent implements OnInit {

  @Input() @ViewChild('contentTmpl', {static: true}) content: TemplateRef<any>;

  @Input() breadcrumbs: any[] = [];

  @Input() title: string;

  @Input() description: string;

  constructor(private layout: nzoLayoutService) {
  }

  ngOnInit() {
    this.breadcrumbs = this.layout.getBreadcrumbs();
    console.log(this.breadcrumbs);
  }

}
