import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FCGraphProvider, FCShape } from './flowchart_view';
import { FlowchartUtil } from './flowchart_util';

export interface FCGraph {
  type: string;
  text: string;
  width?: number;
  height?: number;
  color: string;
  x?: number;
  y?: number;
}

@Component({
  selector: 'nzo-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.less']
})
export class FlowchartComponent implements OnInit {

  @ViewChild('panel') panel: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;

  @Input() radius = 3;
  @Input() borderWidth = 1;
  @Input() fontSize = 12;
  @Input() siderWidth = 110;
  modalGraphs: FCGraph[];
  private canCopy = false;

  @Input()
  set graphs(data) {
    this.modalGraphs = this.handleData(data);
  }

  copyData: FCGraph;

  selectedIndex: number;

  flowGraphs = [];

  constructor(private fGraph: FCGraphProvider) {
    this.modalGraphs = this.handleData([{
      type: FCShape.rect,
      text: '开始',
      width: 68,
      height: 30,
      color: '#1590ff',
      x: 20
    }, {
      type: FCShape.rect,
      text: '聚合',
      width: 68,
      height: 30,
      color: '#faad14',
      x: 20,
      y: 50
    }, {
      type: FCShape.rect,
      text: '结束',
      width: 68,
      height: 30,
      color: '#b786ec',
      x: 20,
      y: 100
    }, {
      type: FCShape.diamond,
      text: '判断',
      width: 68,
      color: '#65ddd5',
      x: 20,
      y: 150
    }]);
  }

  ngOnInit() {
  }


  handleData(list: FCGraph[]) {
    return list.map(item => {
      return this.fGraph.getGraphData({...item, radius: this.radius});
    });
  }

  gradient(color, gradient: number = .1) {
    return FlowchartUtil.gradientColor(color, '#fff', gradient);
  }

  opacity(color) {
    return FlowchartUtil.hex2Rgba(color, .1);
  }

  onCopyGraph(data: any) {
    this.copyData = data;
  }

  onDragStart(event) {
    const elem = event.source.element.nativeElement;
    const x = elem.transform.baseVal[0] ? elem.transform.baseVal[0].matrix.e : 0;
    this.canCopy = (x <= this.siderWidth);
  }

  onDragEnd(event) {
    const elem = event.source.element.nativeElement;
    const matrix = elem.transform.baseVal[0].matrix;
    if (this.canCopy && matrix.e > this.siderWidth) {
      this.flowGraphs.push({...this.copyData, x: matrix.e, y: matrix.f});
    }
    this.copyData = null;
  }

  onSelected(event, i: number) {
    event.stopPropagation();
    this.selectedIndex = i;
  }


}
