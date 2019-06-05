import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FCShape } from '../flowchart';

@Component({
  selector: 'nzo-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.less']
})
export class FlowComponent implements OnInit {
  html: string;
  modals: any[];

  private flowGraph: any;
  graphs: any[];

  constructor(private dom: DomSanitizer) {
  }

  ngOnInit() {
    this.graphs = [{
      type: FCShape.rect,
      text: '&#xe65e;开始',
      width: 68,
      height: 30,
      color: '#1590ff',
      x: 20
    }, {
      type: FCShape.rect,
      text: '&#xe60d;结束',
      width: 68,
      height: 30,
      color: '#1590ff',
      x: 20,
      y: 50
    }, {
      type: FCShape.rect,
      text: '并行',
      width: 68,
      height: 30,
      color: '#faad14',
      x: 20,
      y: 100
    }, {
      type: FCShape.rect,
      text: '&#xe64c;聚合',
      width: 68,
      height: 30,
      color: '#faad14',
      x: 20,
      y: 150
    }, {
      type: FCShape.rect,
      text: '&#xe69c;接口',
      width: 68,
      height: 30,
      color: '#b786ec',
      x: 20,
      y: 200
    }, {
      type: FCShape.rect,
      text: '规则',
      width: 68,
      height: 30,
      color: '#b786ec',
      x: 20,
      y: 250
    }, {
      type: FCShape.rect,
      text: '&#xe64c;模型',
      width: 68,
      height: 30,
      color: '#b786ec',
      x: 20,
      y: 300
    }, {
      type: FCShape.diamond,
      text: '判断',
      width: 68,
      color: '#65ddd5',
      x: 20,
      y: 350
    }];

  }

  svgCanvas() {
    // this.flowGraph.canvas();
  }

  generate() {
    // return this.modals.map(({color, text}, index) => {
    //   return this.flowGraph.rect(text, {
    //     width: 100,
    //     height: 35,
    //     radius: 6,
    //     borderWidth: 1,
    //     color,
    //     fontSize: 12
    //   }, {x: 0, y: 40 * index});
    // }).join('');
  }
}
