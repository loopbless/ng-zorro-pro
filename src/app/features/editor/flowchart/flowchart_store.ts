import { Injectable } from '@angular/core';
import {
  FCDirection,
  FCGraph,
  FCGraphProvider,
  FCLine,
  FCPoint,
  FCShape,
} from './flowchart_view';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export type FCStoreGraph = FCGraph | FCLine;

export interface FCRelation {
  lineId: number | string;
  lineIndex: number;
  graphId: number | string;
  linePos: 'start' | 'end';
  pointIndex: number;
  dir: FCDirection;
}

export class FCStoreList<T> {
  private graphs: T[] = [];

  constructor() {}

  get length() {
    return this.graphs.length;
  }

  find(graph: T | number | string) {
    const id = typeof graph === 'object' ? (graph as any).id : graph;
    return this.graphs.find((item: any) => item.id === id);
  }

  findIndex(graph: FCStoreGraph | number | string) {
    const id = typeof graph === 'object' ? (graph as FCStoreGraph).id : graph;
    return this.graphs.findIndex((item: any) => item.id === id);
  }

  clear() {
    this.graphs = [];
  }

  getAll() {
    return this.graphs;
  }

  findGraph(point: FCPoint) {
    for (const graph of this.graphs as any[]) {
      const ps = this._handleGraphPoints(graph);
      if (
        point.x > ps.x1 &&
        point.x < ps.x2 &&
        point.y > ps.y1 &&
        point.y < ps.y2
      ) {
        return graph;
      }
    }
  }

  private _handleGraphPoints(graph: any) {
    let vas;
    let x1 = graph.x1 || graph.x;
    let x2 = graph.x2 || graph.x + graph.width;
    vas = x1;
    if (x1 > x2) {
      x1 = x2;
      x2 = vas;
    }
    let y1 = graph.y1 || graph.y;
    let y2 = graph.y2 || graph.y + graph.height;
    vas = y1;
    if (y1 > y2) {
      y1 = y2;
      y2 = vas;
    }
    return {
      x1,
      x2,
      y1,
      y2,
    };
  }

  add(data: T, index = this.graphs.length) {
    this.graphs.splice(index, 0, data);
  }

  get(index: number) {
    return this.graphs[index];
  }

  remove(index: number) {
    this.graphs.splice(index, 1);
  }

  delete(data: FCStoreGraph | number) {
    const id = typeof data === 'object' ? (data as FCStoreGraph).id : data;
    const index = this.graphs.findIndex((graph: any) => graph.id === id);
    this.graphs.splice(index, 1);
  }

  set(index: number, data: T) {
    const preData = this.graphs[index] as any;
    this.graphs[index] = { ...preData, ...(data as any) };
  }
}

@Injectable()
export class FCStoreFactory {
  private storeGraphs = new FCStoreList<FCGraph>();
  private storeLines = new FCStoreList<FCLine>();
  private graphPoints: FCPoint[] = [];
  private relations: FCRelation[] = [];
  private storeGraphs$ = new BehaviorSubject<FCGraph[]>(null);
  private storeLines$ = new BehaviorSubject<FCLine[]>(null);

  readonly graphs$ = this.storeGraphs$.pipe(debounceTime(10));
  readonly lines$ = this.storeLines$.pipe(debounceTime(10));

  constructor(private fGraph: FCGraphProvider) {}

  add(data: FCStoreGraph): FCStoreGraph {
    data.id = 'fc_' + new Date().getTime().toString();
    const graph = this.fGraph.getGraphData(data);
    if (graph.type === FCShape.line) {
      this.storeLines.add(graph);
      this.storeLines$.next(this.storeLines.getAll());
      return graph;
    } else {
      this.storeGraphs.add(graph as any);
      this.graphPoints.push(
        ...Object.values(this.fGraph.getGraphPoints(graph as FCGraph)),
      );
      this.storeGraphs$.next(this.storeGraphs.getAll());
      return graph;
    }
  }

  update(data: FCStoreGraph) {
    const index = this.findIndex(data.id, data.type);
    this.set(index, data);
  }

  set(index, data: FCStoreGraph) {
    if (data.type === FCShape.line) {
      this.storeLines.set(index, data);
      this.storeLines$.next(this.storeLines.getAll());
    } else {
      this.storeGraphs.set(index, data as any);
      const item = this.storeGraphs.get(index) as FCGraph;
      const points = Object.values(this.fGraph.getGraphPoints(item));
      this.graphPoints.splice(index * points.length, points.length, ...points);
      this.storeGraphs$.next(this.storeGraphs.getAll());
    }
  }

  getAllLines() {
    return this.storeLines.getAll();
  }

  getAllGraphs() {
    return this.storeGraphs.getAll();
  }

  clear() {
    this.relations = [];
    this.graphPoints = [];
    this.storeGraphs.clear();
    this.storeGraphs$.next([]);
    this.storeLines.clear();
    this.storeLines$.next([]);
  }

  addRelation(data: FCRelation) {
    this.relations.push(data);
  }

  getRelations(fn: (item: FCRelation, index: number) => boolean) {
    return this.relations.filter(fn);
  }

  findGraphByPoint(point: FCPoint) {
    const graph = this.storeGraphs.findGraph(point);
    if (!graph) {
      return this.storeLines.findGraph(point);
    }
    return graph;
  }

  findRelationIndex(fn: (item: FCRelation, index: number) => boolean) {
    return this.relations.findIndex(fn);
  }

  removeRelation(index) {
    return this.relations.splice(index, 1);
  }

  getPoint(index: number) {
    return this.graphPoints[index];
  }

  delete(data) {
    if (data.type === FCShape.line) {
      this.storeLines.delete(data);
      this.storeLines$.next(this.storeLines.getAll());
    } else {
      this.storeGraphs.delete(data);
      this.storeGraphs$.next(this.storeGraphs.getAll());
    }
    this.deleteRelation(data);
  }

  deleteRelation(data) {
    if (data.type === FCShape.line) {
      const relations = this.relations.filter(item => item.lineId === data.id);
      relations.forEach(item => {
        const index = this.relations.findIndex(rs => rs.lineId === item.lineId);
        this.relations.splice(index, 1);
      });
    } else {
      const relations = this.relations.filter(item => item.graphId === data.id);
      relations.forEach(item => {
        const index = this.relations.findIndex(
          rs => rs.graphId === item.graphId,
        );
        this.relations.splice(index, 1);
      });
    }
  }

  findPoint(
    point: FCPoint,
  ): { graph: FCGraph; dir: FCDirection; pointIndex: number; point: FCPoint } {
    const len = this.graphPoints.length;
    for (let i = 0; i < len; i++) {
      const data = this.graphPoints[i];
      if (
        data.x - 10 < point.x &&
        data.x + 10 > point.x &&
        data.y - 10 < point.y &&
        data.y + 10 > point.y
      ) {
        const di = (i + 1) % 4;
        const index = (i + 1 + (di > 0 ? 4 - di : 0)) / 4 - 1;
        const graph = this.storeGraphs.get(index) as FCGraph;
        return { graph, dir: i % 4, pointIndex: i, point: data };
      }
    }
    return null;
  }

  addAll(graphs: FCStoreGraph[]) {
    graphs.forEach(data => {
      data.id = new Date().getTime();
      const graph = this.fGraph.getGraphData(data);
      if (graph.type === FCShape.line) {
        this.storeLines.add(graph);
        this.storeLines$.next(this.storeLines.getAll());
      } else {
        this.storeGraphs.add(graph as any);
        this.graphPoints.push(
          ...Object.values(this.fGraph.getGraphPoints(graph as FCGraph)),
        );
        this.storeGraphs$.next(this.storeGraphs.getAll());
      }
    });
  }

  addAllLines(lines: FCLine[]) {
    lines.forEach(line => {
      this.storeLines.add(this.fGraph.getGraphData(line) as FCLine);
    });
    this.storeLines$.next(this.storeLines.getAll());
  }

  addAllGraphs(graphs: FCGraph[]) {
    graphs.forEach(graph => {
      this.storeGraphs.add(this.fGraph.getGraphData(graph) as FCGraph);
      this.graphPoints.push(
        ...Object.values(this.fGraph.getGraphPoints(graph as FCGraph)),
      );
    });
    this.storeGraphs$.next(this.storeGraphs.getAll());
  }

  find(data: number | string | FCStoreGraph, type?: FCShape) {
    const graph =
      typeof data === 'object'
        ? (data as FCStoreGraph)
        : { id: data, type: type };
    if (graph.type === FCShape.line) {
      return this.storeLines.find(graph.id) as FCLine;
    } else {
      return this.storeGraphs.find(graph.id) as FCGraph;
    }
  }

  findIndex(id: number | string, type: FCShape = FCShape.line) {
    if (type === FCShape.line) {
      return this.storeLines.findIndex(id);
    } else {
      return this.storeGraphs.findIndex(id);
    }
  }

  get(index: number, type: FCShape = FCShape.line) {
    if (type === FCShape.line) {
      return this.storeLines.get(index) as FCLine;
    } else {
      return this.storeGraphs.get(index) as FCGraph;
    }
  }

  removeGraph(index: number) {
    this.storeGraphs.remove(index);
  }
}
