import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nzo-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.less'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'nzo-page-content ant-layout-content '
  }
})

export class PageContentComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
