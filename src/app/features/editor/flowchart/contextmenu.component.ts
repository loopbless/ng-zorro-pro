import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'nzo-contextmenu',
  templateUrl: 'contextmenu.component.html',
  styles: [
    `
      ul,
      li {
        list-style: none;
      }
    `,
  ],
})
export class ContextmenuComponent implements OnInit, OnChanges, OnDestroy {
  @Input('nzoPosition') pos: { x: number; y: number };
  @Output('nzoCopy') copy = new EventEmitter();
  @Output('nzoPaste') paste = new EventEmitter();
  @Output('nzoDelete') delete = new EventEmitter();

  constructor(private elemRef: ElementRef) {}

  ngOnInit() {
    this.elemRef.nativeElement.style.position = `fixed`;
    this.hidden();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pos && this.pos) {
      this.setPosition().then(() => {
        this.show();
      });
    }
  }

  setPosition() {
    this.hidden();
    return Promise.resolve().then(() => {
      const elem: any = this.elemRef.nativeElement;
      elem.style.left = this.pos.x + 'px';
      elem.style.top = this.pos.y + 'px';
    });
  }

  @HostListener('document:mousedown', ['$event'])
  onClose(event) {
    if (event.button !== 2) {
      const timer = setTimeout(() => {
        this.hidden();
        clearTimeout(timer);
      }, 150);
    }
  }

  ngOnDestroy(): void {}

  show() {
    this.elemRef.nativeElement.style.display = 'block';
  }

  hidden() {
    this.elemRef.nativeElement.style.display = 'none';
  }

  onEvent($event: MouseEvent, emit: EventEmitter<any>) {
    $event.stopPropagation();
    emit.emit($event);
  }
}
