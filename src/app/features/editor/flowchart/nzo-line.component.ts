import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FCGraphProvider, FCLine } from './flowchart_view';
import { CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { FCRelation } from './flowchart_store';

@Component({
  selector: '[nzo-line]',
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg:g class="nzo-fc-line">
      <svg:path
        (click)="click.emit($event)"
        (mousedown)="mousedown.emit($event)"
        (dblclick)="dblclick.emit($event)"
        [attr.stroke]="nzoSelected ? '#455FF7' : '#aaa'"
        fill="transparent"
        stroke-width="1"
        [attr.d]="nzoData.data"
        marker-end="url(#markerArrow)"
      />
      <svg:text
        fill="rgba(0, 0, 0, 0.65)"
        fontSize="12"
        [attr.x]="nzoData.x"
        [attr.y]="nzoData.y"
        [innerHTML]="nzoData.text"
      />
      <svg:g *ngIf="!dragDisabled && relation?.lineId !== nzoData.id">
        <svg:circle
          cdkDrag
          [class.nzo-fc-connect-point]="!nzoSelected"
          [ngStyle]="{
            transform:
              'translate3d(' + nzoData.x1 + 'px, ' + nzoData.y1 + 'px, 0)'
          }"
          [attr.transform]="'translate(' + nzoData.x1 + ',' + nzoData.y1 + ')'"
          r="3.5"
          stroke="#1590ff"
          stroke-width="1"
          fill="#fff"
          (cdkDragStarted)="onDragLineStarted($event, 'start')"
          (cdkDragEnded)="onDragEndedLine($event, 'start')"
          (cdkDragMoved)="onDragLineMoved($event, 'start')"
        />
        <svg:circle
          cdkDrag
          [class.nzo-fc-connect-point]="!nzoSelected"
          [ngStyle]="{
            transform:
              'translate3d(' + nzoData.x2 + 'px, ' + nzoData.y2 + 'px, 0)'
          }"
          [attr.transform]="'translate(' + nzoData.x2 + ',' + nzoData.y2 + ')'"
          r="3.5"
          stroke="#1590ff"
          stroke-width="1"
          fill="#fff"
          (cdkDragStarted)="onDragLineStarted($event, 'end')"
          (cdkDragEnded)="onDragEndedLine($event, 'end')"
          (cdkDragMoved)="onDragLineMoved($event, 'end')"
        />
      </svg:g>
    </svg:g>
  `,
})
export class NzoLineComponent implements OnInit {
  @Input() nzoData: FCLine;
  @Input('nzoDragDisabled') dragDisabled = false;
  @Input('nzoSelectedRelation') relation: FCRelation;
  @Output('nzoDragPointStarted') pointStart = new EventEmitter();
  @Output('nzoDragPointEnded') pointEnd = new EventEmitter();
  @Output('nzoDblclick') dblclick = new EventEmitter();
  @Output('nzoClick') click = new EventEmitter();
  @Output('nzoMousedown') mousedown = new EventEmitter();

  @Input() nzoSelected = false;

  constructor(private fGraph: FCGraphProvider) {}

  ngOnInit() {}

  onDragLineStarted(event: CdkDragStart, linePos) {
    this.pointStart.emit({ ...event, linePos });
  }

  onDragEndedLine(event: CdkDragEnd, linePos) {
    this.pointEnd.emit({ ...event, linePos });
  }

  onDragLineMoved(event: CdkDragMove, linePos) {
    const { x, y } = this.fGraph.getPosition(event.source);
    if (linePos === 'start') {
      const data = this.fGraph.drawLine({
        ...this.nzoData,
        x1: x,
        y1: y,
      }) as FCLine;
      this.nzoData.x1 = data.x1;
      this.nzoData.y1 = data.y1;
      this.nzoData.data = data.data;
    } else {
      const data = this.fGraph.drawLine({
        ...this.nzoData,
        x2: x,
        y2: y,
      }) as FCLine;
      this.nzoData.x2 = data.x2;
      this.nzoData.y2 = data.y2;
      this.nzoData.data = data.data;
    }
  }
}
