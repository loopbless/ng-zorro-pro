import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { PageSiderComponent } from '../page-sider/page-sider.component';

@Component({
  selector: 'ant-pro-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    class: 'ant-layout'
  }
})
export class PageLayoutComponent implements OnInit, AfterViewInit {

  @ContentChild(PageSiderComponent) pageSider !: PageSiderComponent;

  constructor(private elemRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.pageSider) {
      this.renderer.addClass(this.elemRef.nativeElement, 'ant-layout-has-sider');
    }
  }

}
