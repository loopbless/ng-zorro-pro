import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {
  FCDiamond,
  FCDirection,
  FCGraph,
  FCGraphProvider,
  FCLine,
  FCPoint,
  FCRect,
  FCShape,
} from './flowchart_view';
import { CdkDrag, CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import { FCStoreFactory, FCStoreGraph } from './flowchart_store';

@Component({
  selector: 'nzo-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class NzoFlowchartComponent implements OnInit, OnChanges, OnDestroy {
  @Input('nzoRadius') radius = 3;
  @Input('nzoBorderWidth') borderWidth = 1;
  @Input('nzoFontSize') fontSize = 12;
  @Input('nzoSideWidth') sideWidth = 110;
  @Input('nzoHeader') header: TemplateRef<any>;

  @Input('nzoMode')
  set mode(data: 'view' | 'edit') {
    this.isEditMode = data === 'edit';
  }

  isEditMode = true;
  private menuSelectedGraph: any;

  @Input()
  set nzoModelGraphs(data) {
    this.modalGraphs = this.handleData(data);
  }

  @Input()
  set nzoFlowData(data: FCStoreGraph[]) {
    this.fcStore.clear();
    if (data && data.length > 0) {
      const lines = [];
      const graphs = [];
      data.forEach(item => {
        if (item.type === FCShape.line) {
          lines.push({
            ...item,
            x: item.x2,
          });
        } else {
          graphs.push({
            ...item,
            style: {...item.style, radius: this.radius},
          });
        }
      });
      this.fcStore.addAllGraphs(graphs);
      this.fcStore.addAllLines(lines);
      this.handleFlowLineRelation(lines);
    }
  }

  @Output('nzoFlowChange') flowChange = new EventEmitter();
  @Output('nzoGraphDblclick') dblclickGraph = new EventEmitter();
  @Output('nzoLineDblclick') dblclickLine = new EventEmitter();
  @Output('nzoContextMenu') contextMenu = new EventEmitter();
  @Output('nzoAppendGraph') appendGraph = new EventEmitter();
  @Output('nzoChangeRelation') changeRelation = new EventEmitter();
  lineStartPos: any;
  linePrePos: any;
  lineIndex: number;
  modalGraphs: FCGraph[];
  private canCopy = false;

  copyData: FCRect | FCDiamond;

  selectedGraph: number;
  selectedLine: number;

  copyIndex: number;
  moveIndex: number;

  selectedRelations: any;

  contextPosition: any;
  clipboard: any;
  flow: any;
  @ViewChild('rootCvs') rootCvs: ElementRef;

  @ViewChildren(CdkDrag) private cdkDrags: QueryList<CdkDrag>;

  constructor(
    private fcStore: FCStoreFactory,
    private fGraph: FCGraphProvider,
  ) {
    this.modalGraphs = this.handleData([
      {
        type: FCShape.ellipse,
        text: '开始',
        width: 68,
        height: 30,
        x: 20,
        y: 0,
        style: {
          color: '#1590ff',
        },
      },
      {
        type: FCShape.rect,
        text: '条件',
        width: 68,
        height: 30,
        style: {
          color: '#b786ec',
        },
        x: 20,
        y: 50,
      },
      {
        type: FCShape.diamond,
        text: '判断',
        width: 68,
        style: {
          color: '#65ddd5',
        },
        x: 20,
        y: 100,
      },
    ]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.flow = {graphs$: this.fcStore.graphs$, lines$: this.fcStore.lines$};
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.fcStore.clear();
  }

  private handleData(list: FCGraph[]) {
    return list.map(item => {
      return this.fGraph.getGraphData({
        ...item,
        style: {...item.style, radius: this.radius},
      }) as FCGraph;
    });
  }

  private handleFlowLineRelation(lines: FCLine[]) {
    lines.forEach((item, index) => {
      const index1 = this.fcStore.findIndex(item.id1, FCShape.rect);
      this.fcStore.addRelation({
        lineId: item.id,
        linePos: 'start',
        lineIndex: index,
        dir: item.dir1,
        graphId: item.id1,
        pointIndex: index1 * 4 + item.dir1,
      });
      const index2 = this.fcStore.findIndex(item.id2, FCShape.rect);
      this.fcStore.addRelation({
        lineId: item.id,
        linePos: 'end',
        lineIndex: index,
        dir: item.dir2,
        graphId: item.id2,
        pointIndex: index2 * 4 + item.dir2,
      });
    });
  }

  onCopyGraphDragStart(event, data, i) {
    this.copyIndex = i;
    this.copyData = data;
    const {x} = this.fGraph.getPosition(event.source);
    this.canCopy = x <= this.sideWidth;
  }

  onCopyGraphDragEnd(event: CdkDragEnd, offset: FCPoint) {
    const pos = this.fGraph.getPosition(event.source, offset);
    if (this.canCopy && pos.x > this.sideWidth) {
      let graph: any = {...this.copyData, ...pos};
      graph = this.graphCalibAlign(graph);
      this.appendGraph.emit({...graph});
    }
    this.flowChange.emit();
    event.source.reset();
    this.copyIndex = null;
    this.copyData = null;
  }

  onDragGraphStart(event, data, i) {
    this.moveIndex = i;
    const {x} = this.fGraph.getPosition(event.source);
    this.canCopy = x <= this.sideWidth;
  }

  onDragGraphEnd(event: CdkDragEnd, data) {
    const pos = this.fGraph.getPosition(event.source);
    this.moveIndex = null;
    this.flowChange.emit();
    const graph = this.graphCalibAlign({...data, ...pos});
    this.setRelationLineByGraph(graph);
  }

  setRelationLineByGraph(data) {
    const relations = this.fcStore.getRelations(
      item => item.graphId === data.id,
    );
    if (relations.length > 0) {
      relations.forEach(relation => {
        const line = this.fcStore.find(relation.lineId, FCShape.line);
        const pos = this.fcStore.getPoint(relation.pointIndex);
        this.setLine(line, pos, relation.linePos, relation.dir);
      });
    }
  }

  /**
   * 图形校正对齐
   * @param graph 图形
   */
  private graphCalibAlign(graph: FCGraph) {
    const gap = 5;
    let isUpdate = false;
    const graphs = this.fcStore.getAllGraphs();
    for (const data of graphs) {
      if (graph.id !== data.id) {
        if (data.x + gap > graph.x && data.x - gap < graph.x) {
          graph.x = data.x;
          isUpdate = true;
          this.setStoreData(graph);
          return graph;
        }
        if (data.y + gap > graph.y && data.y - gap < graph.y) {
          graph.y = data.y;
          isUpdate = true;
          this.setStoreData(graph);
          return graph;
        }
      }
    }
    if (!isUpdate) {
      this.setStoreData(graph);
    }
    return graph;
  }

  private setStoreData(graph: FCStoreGraph) {
    const index = this.fcStore.findIndex(graph.id, graph.type);
    if (index > -1) {
      this.fcStore.set(index, graph);
    } else {
      this.fcStore.add(graph);
    }
  }

  onDragLinePointStart(event, data) {
    const index = this.fcStore.findRelationIndex(item => {
      return item.lineId === data.id && item.linePos === event.linePos;
    });
    if (index > -1) {
      this.fcStore.removeRelation(index);
    }
  }

  onDragLinePointEnd(event, data, index) {
    const pos = this.fGraph.getPosition(event.source);
    this.flowChange.emit();
    this.setRelation(pos, data, index, event.linePos, true);
  }

  onDragGraphPointStart(event: any) {
    this.selectedLine = null;
    this.linePrePos = this.lineStartPos = this.fGraph.getPosition(
      event.source.element.nativeElement.parentElement.parentElement,
    );
    const line = this.fcStore.add(
      this.fGraph.drawLine({
        x1: event.data.x + this.lineStartPos.x,
        y1: event.data.y + this.lineStartPos.y,
        x2: event.data.x + this.lineStartPos.x,
        y2: event.data.y + this.lineStartPos.y,
        dir1: event.data.direction,
        dir2: (event.data.direction + 2) % 4,
        type: FCShape.line,
      }),
    );
    this.lineIndex = this.fcStore.findIndex(line.id, line.type);
  }

  onDragGraphPointEnd(event: CdkDragEnd) {
    const line: any = this.fcStore.get(this.lineIndex, FCShape.line);
    let pos = this.fGraph.getPosition(event.source, this.lineStartPos);
    const rsl = this.setRelation(pos, line, this.lineIndex, 'end', true);
    if (rsl) {
      line.dir2 = rsl ? rsl.dir : line.dir2;
      this.setLine(line, rsl.point);
    }
    this.flowChange.emit();
    event.source.reset();
    pos = this.fGraph.getPosition(event.source, this.lineStartPos);
    this.setRelation(pos, line, this.lineIndex, 'start');
    this.lineStartPos = null;
    this.lineIndex = null;
  }

  onDragGraphPointMove(event: CdkDragMove) {
    const pos = this.fGraph.getPosition(event.source, this.lineStartPos);
    const line = this.fcStore.get(this.lineIndex, FCShape.line) as FCLine;
    this.setLine(line, pos);
  }

  setLine(
    line,
    pos,
    linePoint: 'start' | 'end' = 'end',
    direction?: FCDirection,
  ) {
    if (linePoint === 'end') {
      line.x2 = pos.x;
      line.y2 = pos.y;
      const data = this.fGraph.getGraphData({
        ...line,
        x2: pos.x,
        y2: pos.y,
        dir2: direction ? direction : line.dir2,
      });
      line.x = data.x;
      line.y = data.y;
      line.data = data.data;
      this.linePrePos = pos;
    } else if (linePoint === 'start') {
      const dir = direction || this.fGraph.getDirection(this.linePrePos, pos);
      line.x1 = pos.x;
      line.y1 = pos.y;
      const data = this.fGraph.getGraphData({
        ...line,
        dir1: dir ? dir : line.dir1,
        dir2: line.dir2 || (dir + 2) % 4,
        x1: pos.x,
        y1: pos.y,
      });
      line.x = data.x;
      line.y = data.y;
      line.data = data.data;
    }
  }

  getGraphDirPoint(graph: FCGraph, dir: FCDirection): FCPoint {
    if (graph) {
      if (graph.type === 'diamond') {
        graph.height = this.fGraph.getDiamondHeight(graph.width);
      }
      switch (dir) {
        case FCDirection.bottom: {
          return {
            x: graph.x + graph.width / 2 + 1,
            y: graph.y + graph.height + 1,
          };
        }
        case FCDirection.left: {
          return {x: graph.x + 1, y: graph.y + graph.height / 2 + 1};
        }
        case FCDirection.right: {
          return {
            x: graph.x + graph.width + 1,
            y: graph.y + graph.height / 2 + 1,
          };
        }
        case FCDirection.top: {
          return {x: graph.x + graph.width / 2 + 1, y: graph.y + 1};
        }
      }
    }
  }

  onSelectedGraph(event, i) {
    this.selectedGraph = i;
  }

  setRelation(pos, line, index, linePos, isCalib = false) {
    const data = this.fcStore.findPoint(pos);
    if (data) {
      this.fcStore.addRelation({
        graphId: data.graph.id,
        dir: data.dir,
        lineId: line.id,
        linePos,
        lineIndex: index,
        pointIndex: data.pointIndex,
      });
      if (isCalib) {
        line[linePos === 'end' ? 'dir2' : 'dir1'] = data
          ? data.dir
          : data[linePos === 'end' ? 'dir2' : 'dir1'];
        this.setLine(line, data.point, linePos);
      }
      if (linePos === 'start') {
        this.changeRelation.emit([data.graph, line]);
      } else {
        this.changeRelation.emit([line, data.graph]);
      }
      return data;
    } else {
      const centerPos = this.fGraph.getLabelCenterPosition(line);
      line.x = centerPos.x;
      line.y = centerPos.y;
    }
  }

  onSelectedLine(event, data, i: number) {
    this.selectedLine = i;
    this.menuSelectedGraph = data;
    this.selectedRelations = this.fcStore.getRelations(
      item => item.lineId === data.id,
    );
  }

  onClickCvs(event) {
    if (event.button !== 2) {
      this.selectedGraph = null;
      this.selectedLine = null;
      this.selectedRelations = null;
      this.menuSelectedGraph = null;
    }
  }

  getRelationByGraph(relations: any[], data: any) {
    return relations ? relations.find(item => item.graphId === data.id) : null;
  }

  onContextmenu(event: PointerEvent) {
    event.preventDefault();
    if (event.button === 2 && event.offsetX > this.sideWidth) {
      const graph = this.fcStore.findGraphByPoint({
        x: event.offsetX,
        y: event.offsetY,
      });
      this.menuSelectedGraph = graph || this.menuSelectedGraph;
      this.contextMenu.emit(event);
      this.contextPosition = {x: event.clientX, y: event.clientY};
    }
  }

  onMenuDelete(graph: any = this.menuSelectedGraph) {
    if (graph) {
      this.fcStore.delete(graph);
      this.flowChange.emit();
    }
  }

  getLine(line: FCLine | string) {
    return this.fcStore.find(line, FCShape.line);
  }

  getGraph(graph: FCGraph | string) {
    return this.fcStore.find(graph);
  }

  getAllGraphs() {
    return this.fcStore.getAllGraphs();
  }

  getAllLines() {
    return this.fcStore.getAllLines();
  }

  setGraphData(data: FCStoreGraph) {
    this.fcStore.update(data);
  }

  onMenuCopy() {
    this.clipboard = {...this.menuSelectedGraph};
  }

  onMenuPaste() {
    if (this.clipboard) {
      const data = this.clipboard;
      if (data.x || data.y) {
        data.x = data.x + 20;
        data.y = data.y + 20;
      }

      if (data.x1 || data.y1) {
        data.x1 = data.x1 + 20;
        data.y1 = data.y1 + 20;
        data.x2 = data.x2 + 20;
        data.y2 = data.y2 + 20;
      }
      this.flowChange.emit();
      this.fcStore.add({...data});
    }
  }

  onAddLabel($event: MouseEvent) {
    this.flowChange.emit();
    this.dblclickLine.emit(this.menuSelectedGraph);
  }

  onContextLine(event, data: any) {
    if (event.button === 2) {
      this.menuSelectedGraph = data;
    }
  }
}
