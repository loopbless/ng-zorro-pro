import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FCGraph } from './flowchart_view';
import { FlowchartUtil } from './flowchart_util';

@Component({
  selector: '[nzo-graph]',
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg:g
      class="nzo-fc-rect-box"
      [ngStyle]="{
        transform: 'translate3d(' + nzoData.x + 'px, ' + nzoData.y + 'px, 0)'
      }"
      [attr.transform]="'translate(' + nzoData.x + ',' + nzoData.y + ')'"
    >
      <svg:path
        [attr.fill]="gradient(nzoData.style.color, nzoSelected ? 1 : 0.1)"
        [attr.stroke-width]="nzoBorder"
        [attr.stroke]="nzoData.style.color"
        [attr.d]="nzoData.data"
      />
      <svg:text
        class="iconfont"
        text-rendering="inherit"
        [attr.fill]="!nzoSelected ? nzoData.style.color : '#fff'"
        [ngStyle]="{ fontSize: nzoData.style.fontSize + 'px' }"
        text-anchor="middle"
        [attr.transform]="
          'translate(' + nzoData.style.dx + ',' + nzoData.style.dy + ')'
        "
        [attr.font-size]="nzoData.style.fontSize"
        dominant-baseline="text-before-edge"
        [innerHTML]="nzoData.text"
      />
    </svg:g>
  `,
})
export class NzoGraphComponent implements OnInit {
  @Input() nzoData: FCGraph;
  @Input() nzoBorder = 1;
  @Input() nzoSelected = false;
  @Input() nzoPoint = false;
  @Input('nzoDragDisabled') dragDisabled = false;

  constructor() {}

  ngOnInit() {}

  gradient(color, gradient: number = 0.1) {
    return FlowchartUtil.gradientColor(color, '#fff', gradient);
  }
}
