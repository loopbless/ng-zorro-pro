import { FlowchartUtil } from './flowchart_util';
import { Injectable } from '@angular/core';

export enum FCShape {
  rect = 'rect',
  diamond = 'diamond',
}


export interface RectOptions {
  width?: number;
  height?: number;
  radius?: number;
  borderWidth?: number;
  color?: string;
  fontSize?: number;
}

export interface Position {
  x: number;
  y: number;
}

@Injectable()
export class FCGraphProvider {

  getGraphData(data: any) {
    switch (data.type) {
      case 'rect': {
        const opts = {width: 100, height: 34, color: '#ccc', fontSize: 12, x: 0, y: 0, data: null, ...data};
        const rw = opts.width - data.radius * 2;
        const rh = opts.height - data.radius * 2;
        opts.dx = data.width / 2;
        opts.dy = (data.height - opts.fontSize) / 2;
        opts.data = `M0,0m${data.radius + 1},1h${rw}a${data.radius},${data.radius},0,0,1,${data.radius},
              ${data.radius}v${rh}a${data.radius},${data.radius},0,0,1,-${data.radius},${data.radius}
              h-${rw}a${data.radius},${data.radius},0,0,1,-${data.radius},-${data.radius}v-${rh}
              a${data.radius},${data.radius},0,0,1,${data.radius},-${data.radius}z`;
        return opts;
      }
      case 'diamond': {
        const opts = {width: 100, color: '#ccc', fontSize: 12, x: 0, y: 0, data: null, ...data};
        const w = opts.width / 2;
        const h = parseInt(Math.sqrt(w * w / 3).toFixed(2), 0);
        opts.dx = w + 1;
        opts.dy = h - 6;
        opts.data = `M${w + 1},1m-4,1.53a6,6,0,0,1,8,0
              l${w - 5.53},${h - 3.53}a6,3,0,0,1,0,4l${-w + 5.53},${h - 3.53}
              a6,6,0,0,1,-8,0l${-w + 5.53},${-h + 3.53}a6,3,0,0,1,0,-4z`;
        return opts;
      }
    }
  }


  rect(text: string, options?: RectOptions, position: Position = {x: 0, y: 0}) {
    const opts = {width: 100, height: 34, radius: 5, borderWidth: 1, color: '#ccc', fontSize: 12, ...options};
    const rw = opts.width - opts.radius * 2;
    const rh = opts.height - opts.radius * 2;
    return `<g class="nzo-rect-box" transform="translate(${position.x}, ${position.y})">
              <path fill="${FlowchartUtil.gradientColor(opts.color, '#fff', .1)}" stroke-width="${opts.borderWidth}" stroke="${opts.color}"
              d='M0,0m${opts.radius + 1},1h${rw}a${opts.radius},${opts.radius},0,0,1,${opts.radius},
              ${opts.radius}v${rh}a${opts.radius},${opts.radius},0,0,1,-${opts.radius},${opts.radius}
              h-${rw}a${opts.radius},${opts.radius},0,0,1,-${opts.radius},-${opts.radius}v-${rh}
              a${opts.radius},${opts.radius},0,0,1,${opts.radius},-${opts.radius}z' />
              <text class="iconfont" text-rendering="inherit" fill="rgba(0,0,0,.65)" text-anchor="middle" x="${opts.width / 2}"
              font-size="${opts.fontSize}" dominant-baseline="text-before-edge" dy="0"
              y="${(opts.height - opts.fontSize) / 2}">${text}</text>
            </g>`;
  }

  diamond() {
    const w = 50;
    const h = Math.sqrt(w * w / 3);
    return `<g>
              <path fill='#fff' stroke='#aaa' stroke-width='1' d='M${w + 1},81m-4,1.53a6,6,0,0,1,8,0
              l${w - 5.53},${h - 3.53}a6,3,0,0,1,0,4l${-w + 5.53},${h - 3.53}
              a6,6,0,0,1,-8,0l${-w + 5.53},${-h + 3.53}a6,3,0,0,1,0,-4z'/>
              <text text-rendering="inherit" fill="rgba(0,0,0,.65)" text-anchor="middle"
              font-size='12' dominant-baseline="text-before-edge" dy="${h - 9}" dx='${w + 1}' y='81'>判断</text>
            </g>`;
  }

}
