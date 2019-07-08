import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FCGraph } from './flowchart_view';
import { FlowchartUtil } from './flowchart_util';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { FCRelation } from './flowchart_store';

@Component({
  selector: '[nzo-graph-shadow]',
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg:g
      class="nzo-fc-rect-box nzo-fc-drag"
      cdkDrag
      (cdkDragStarted)="onMoveDragStart($event)"
      (dblclick)="dblclick.emit($event)"
      [ngStyle]="{
        transform: 'translate3d(' + nzoData.x + 'px, ' + nzoData.y + 'px, 0)'
      }"
      [attr.transform]="'translate(' + nzoData.x + ',' + nzoData.y + ')'"
      (click)="click.emit($event)"
      (cdkDragEnded)="onMoveDragEnd($event)"
    >
      <svg:path
        [attr.fill]="isMoving ? opacity(nzoData.style.color) : 'transparent'"
        [attr.stroke-width]="nzoBorder"
        stroke-dasharray="5,5"
        [attr.stroke]="isMoving ? nzoData.style.color : 'transparent'"
        [attr.d]="nzoData.data"
      />
      <svg:g *ngIf="nzoPoint && relation?.graphId !== nzoData.id">
        <svg:circle
          [class.nzo-fc-connect-point]="!nzoSelected"
          cdkDrag
          *ngIf="!isMoving"
          (cdkDragStarted)="
            onDragStart($event, {
              x: nzoData.width / 2 + 1,
              y: 1,
              direction: 0
            })
          "
          (cdkDragEnded)="onDragEnd($event)"
          (cdkDragMoved)="onDragMoved($event)"
          [ngStyle]="{
            transform: 'translate3d(' + (nzoData.width / 2 + 1) + 'px, 1px, 0)'
          }"
          [attr.transform]="'translate(' + (nzoData.width / 2 + 1) + ',1)'"
          r="3.5"
          stroke="#1590ff"
          stroke-width="1"
          fill="#fff"
          (mousedown)="preventEvent($event)"
        />
        <svg:circle
          [class.nzo-fc-connect-point]="!nzoSelected"
          cdkDrag
          *ngIf="!isMoving"
          (cdkDragStarted)="
            onDragStart($event, {
              x: nzoData.width / 2 + 1,
              y: nzoData.height + 1,
              direction: 2
            })
          "
          (cdkDragEnded)="onDragEnd($event)"
          (cdkDragMoved)="onDragMoved($event)"
          [ngStyle]="{
            transform:
              'translate3d(' +
              (nzoData.width / 2 + 1) +
              'px, ' +
              (nzoData.height + 1) +
              'px, 0)'
          }"
          [attr.transform]="
            'translate(' +
            (nzoData.width / 2 + 1) +
            ',' +
            (nzoData.height + 1) +
            ')'
          "
          r="3.5"
          stroke="#1590ff"
          stroke-width="1"
          fill="#fff"
          (mousedown)="preventEvent($event)"
        />
        <svg:circle
          [class.nzo-fc-connect-point]="!nzoSelected"
          cdkDrag
          *ngIf="!isMoving"
          (cdkDragStarted)="
            onDragStart($event, {
              x: 1,
              y: nzoData.height / 2 + 1,
              direction: 3
            })
          "
          (cdkDragEnded)="onDragEnd($event)"
          (cdkDragMoved)="onDragMoved($event)"
          [ngStyle]="{
            transform: 'translate3d(1px, ' + (nzoData.height / 2 + 1) + 'px, 0)'
          }"
          [attr.transform]="'translate(1,' + (nzoData.height / 2 + 1) + ')'"
          r="3.5"
          stroke="#1590ff"
          stroke-width="1"
          fill="#fff"
          (mousedown)="preventEvent($event)"
        />
        <svg:circle
          [class.nzo-fc-connect-point]="!nzoSelected"
          cdkDrag
          *ngIf="!isMoving"
          (cdkDragStarted)="
            onDragStart($event, {
              x: nzoData.width + 1,
              y: nzoData.height / 2 + 1,
              direction: 1
            })
          "
          (cdkDragEnded)="onDragEnd($event)"
          (cdkDragMoved)="onDragMoved($event)"
          [ngStyle]="{
            transform:
              'translate3d(' +
              (nzoData.width + 1) +
              'px, ' +
              (nzoData.height / 2 + 1) +
              'px, 0)'
          }"
          [attr.transform]="
            'translate(' +
            (nzoData.width + 1) +
            ',' +
            (nzoData.height / 2 + 1) +
            ')'
          "
          r="3.5"
          stroke="#1590ff"
          stroke-width="1"
          fill="#fff"
          (mousedown)="preventEvent($event)"
        />
      </svg:g>
    </svg:g>
  `,
})
export class NzoGraphShadowComponent implements OnInit {
  @Input() nzoData: FCGraph;
  @Input() nzoBorder = 1;
  @Input() nzoSelected = false;
  @Input() nzoPoint = false;
  @Input('nzoSelectedRelation') relation: FCRelation;
  @Output('nzoClick') click = new EventEmitter();
  @Output('nzoDblclick') dblclick = new EventEmitter();
  @Output('nzoDragGraphStarted') started = new EventEmitter();
  @Output('nzoDragGraphEnded') ended = new EventEmitter();
  @Output('nzoDragPointStarted') pointStarted = new EventEmitter();
  @Output('nzoDragPointMoved') pointMoved = new EventEmitter();
  @Output('nzoDragPointEnded') pointEnded = new EventEmitter();

  isMoving = false;

  constructor() {}

  ngOnInit() {}

  opacity(color) {
    return FlowchartUtil.hex2Rgba(color, 0.1);
  }

  onMoveDragStart(event) {
    this.isMoving = true;
    this.started.emit(event);
  }

  onMoveDragEnd(event: CdkDragEnd) {
    this.isMoving = false;
    this.ended.emit(event);
  }

  preventEvent(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  onDragStart(event, param: any) {
    this.pointStarted.emit({ ...event, data: param });
  }

  onDragMoved(event) {
    this.pointMoved.emit(event);
  }

  onDragEnd(event) {
    this.pointEnded.emit(event);
    event.source.reset();
  }
}
