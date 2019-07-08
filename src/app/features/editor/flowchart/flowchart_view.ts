import { Injectable } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { generateConnectionPoints } from './connection_line';

export enum FCShape {
  rect = 'rect',
  diamond = 'diamond',
  ellipse = 'ellipse',
  line = 'line',
}

export enum FCDirection {
  top = 0,
  right = 1,
  bottom = 2,
  left = 3,
}

export interface FCPoint {
  x?: number;
  y?: number;
}

interface FCGraphOptions extends FCPoint {
  id?: number | string;
  type: FCShape;
  text?: string;
  data?: any;
  style?: any;
  params?: { [key: string]: any };
}

export interface FCDiamond extends FCGraphOptions {
  type: FCShape.rect;
  width?: number;
  height?: number;
}

export interface FCRect extends FCGraphOptions {
  type: FCShape.diamond;
  width?: number;
  height?: number;
}

export interface FCEllipse extends FCGraphOptions {
  type: FCShape.ellipse;
  width?: number;
  height?: number;
}

export interface FCLine extends FCGraphOptions {
  id1?: string | number;
  dir1: FCDirection;
  x1: number;
  y1: number;
  id2?: string | number;
  dir2?: FCDirection;
  x2?: number;
  y2?: number;
}

export type FCGraph = FCRect | FCDiamond | FCEllipse;

@Injectable()
export class FCGraphProvider {
  getGraphData(data: FCGraph | FCLine): FCGraph | FCLine {
    switch (data.type) {
      case FCShape.rect: {
        const graph = {
          width: 100,
          height: 34,
          x: 0,
          y: 0,
          ...(data as FCRect),
        };
        const style: any = { color: '#ccc', fontSize: 12, ...graph.style };
        const rw = graph.width - style.radius * 2;
        const rh = graph.height - style.radius * 2;
        style.dx = graph.width / 2;
        style.dy = (graph.height - style.fontSize) / 2;
        graph.data = `M0,0m${style.radius + 1},1h${rw}a${style.radius},
              ${style.radius},0,0,1,${style.radius},${style.radius}v${rh}a
              ${style.radius},${style.radius},0,0,1,-${style.radius},
              ${style.radius}h-${rw}a${style.radius},${style.radius},0,0,1,-
              ${style.radius},-${style.radius}v-${rh}a${style.radius},
              ${style.radius},0,0,1,${style.radius},-${style.radius}z`.replace(
          /\s/g,
          '',
        );
        return { ...graph, style };
      }
      case FCShape.diamond: {
        const graph = {
          width: 100,
          height: 34,
          x: 0,
          y: 0,
          ...(data as FCDiamond),
        };
        const style: any = { color: '#ccc', fontSize: 12, ...graph.style };
        const w = graph.width / 2;
        const h = parseInt(Math.sqrt((w * w) / 3).toFixed(2), 0);
        style.dx = w + 1;
        style.dy = h - 6;
        graph.height = h * 2;
        graph.data = `M${w + 1},1m-4,1.53a6,6,0,0,1,8,0
              l${w - 5.53},${h - 3.53}a6,3,0,0,1,0,4l${-w + 5.53},${h - 3.53}
              a6,6,0,0,1,-8,0l${-w + 5.53},${-h +
          3.53}a6,3,0,0,1,0,-4z`.replace(/\s/g, '');
        return { ...graph, style };
      }
      case FCShape.ellipse: {
        const graph: FCGraph = {
          width: 100,
          height: 34,
          x: 0,
          y: 0,
          ...(data as FCEllipse),
        };
        const style: any = { color: '#ccc', fontSize: 12, ...graph.style };
        style.dx = graph.width / 2;
        const rx = graph.height / 2;
        style.dy = (graph.height - style.fontSize) / 2;
        graph.data = `M0,0m${rx},${graph.height}a${rx},${rx},0,0,1,0,-${
          graph.height
        }l
        ${graph.width - graph.height},0a${rx},${rx},0,0,1,0,${
          graph.height
        }z`.replace(/\s/g, '');
        return { ...graph, style };
      }
      case FCShape.line: {
        return this.drawLine(data);
      }
    }
  }

  getDiamondHeight(width: number) {
    const w = width / 2;
    const h = parseInt(Math.sqrt((w * w) / 3).toFixed(2), 0);
    return h * 2;
  }

  drawLine(data: FCLine) {
    const graph: FCLine = { ...data };
    const style = { color: '#aaa', ...graph.style };
    const pathPoints: any = generateConnectionPoints({
      entryPoint: [graph.x1, graph.y1],
      entryDirection: this.convertDirToVector(graph.dir1),
      entryExt: 10,
      exitPoint: [graph.x2, graph.y2],
      exitDirection: this.convertDirToVector(graph.dir2),
      exitExt: 10,
    }).map(item => `L${item.position.toString()}`);
    const index = Math.ceil(pathPoints.length / 2);
    const pos = this.getLabelCenterPosition(graph);
    graph.data = pathPoints
      .toString()
      .replace(/^L/, 'M')
      .replace(/,L/g, 'L');
    return { ...graph, style, ...pos };
  }

  getLabelCenterPosition(line: FCLine) {
    return {
      x: (line.x1 - line.x2) / 2 + line.x2 + 3,
      y: (line.y1 - line.y2) / 2 + line.y2 - 3,
    };
  }

  getPosition(
    drag: CdkDrag | HTMLElement,
    offset: FCPoint = { x: 0, y: 0 },
  ): FCPoint {
    const elem = drag instanceof CdkDrag ? drag.element.nativeElement : drag;
    let transforms = elem.style.transform.replace(/,\s/g, ',').split(' ');
    transforms = transforms.map(tram =>
      tram.replace(/.+\((-?\d+)px,(-?\d+).+/, '$1,$2'),
    );
    const pos = { x: 0, y: 0 };
    transforms.forEach(item => {
      if (item) {
        const arr = item.replace(/\s/g, '').split(',');
        pos.x += parseInt(arr[0], 0);
        pos.y += parseInt(arr[1], 0);
      }
    });
    return {
      x: pos.x + offset.x,
      y: pos.y + offset.y,
    };
  }

  getDirection(startPoint: FCPoint, endPoint: FCPoint) {
    const dx = endPoint.x - startPoint.x;
    const dy = endPoint.y - startPoint.y;
    const dirX = dx > 0 ? FCDirection.right : FCDirection.left;
    const dirY = dy > 0 ? FCDirection.bottom : FCDirection.top;
    return Math.abs(dx) > Math.abs(dy) ? dirX : dirY;
  }

  private convertDirToVector(dir: FCDirection) {
    const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    return dirs[dir];
  }

  getGraphPoints(graph: FCGraph) {
    const { x, y, width, height } = graph;
    const top = this.offsetPoint({ x, y }, { x: width / 2 + 1, y: 1 });
    const right = this.offsetPoint(
      { x, y },
      { x: width + 1, y: height / 2 + 1 },
    );
    const bottom = this.offsetPoint(
      { x, y },
      { x: width / 2 + 1, y: height + 1 },
    );
    const left = this.offsetPoint({ x, y }, { x: 1, y: height / 2 + 1 });
    return { top, right, bottom, left };
  }

  offsetPoint(point: FCPoint, offset: FCPoint) {
    return {
      x: point.x + offset.x,
      y: point.y + offset.y,
    };
  }
}
