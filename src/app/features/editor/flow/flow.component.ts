import { Component, OnInit } from '@angular/core';
import { FCGraph, FCShape } from '../flowchart';

@Component({
  selector: 'nzo-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.less']
})
export class FlowComponent implements OnInit {
  graphs: FCGraph[];

  constructor() {
  }

  ngOnInit() {
    this.graphs = [
      {
        type: FCShape.ellipse,
        text: '开始',
        width: 68,
        height: 30,
        style: {
          color: '#1590ff',
        },
        params: {
        },
        x: 20,
      },
      {
        type: FCShape.ellipse,
        text: '结束',
        width: 68,
        height: 30,
        style: {
          color: '#1590ff',
        },
        params: {
        },
        x: 20,
        y: 50,
      },
      {
        type: FCShape.rect,
        text: '数据',
        width: 68,
        height: 30,
        style: {
          color: '#65ddd5',
        },
        params: {
        },
        x: 20,
        y: 100,
      },
      {
        type: FCShape.rect,
        text: '类型',
        width: 68,
        height: 30,
        style: {
          color: '#b786ec',
        },
        params: {
        },
        x: 20,
        y: 150,
      },
      {
        type: FCShape.rect,
        text: '参数',
        width: 68,
        height: 30,
        style: {
          color: '#faad14',
        },
        params: {
        },
        x: 20,
        y: 200,
      },
      {
        type: FCShape.diamond,
        text: '判断',
        width: 68,
        style: {
          color: '#777',
        },
        params: {
        },
        x: 20,
        y: 250,
      },
    ];

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
