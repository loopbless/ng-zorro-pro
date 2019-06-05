import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';

@Component({
  selector: 'nzo-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.less']
})
export class ResultComponent implements OnInit, OnChanges {
  @Input() title: string;

  @Input() subtitle: string;

  @Input() description: string;
  @Input() actions: TemplateRef<any>;

  @Input()
  set type(type: 'success' | 'error') {
    switch (type) {
      case 'error': {
        this.status = {
          icon: 'close-circle',
          type: 'error'
        };
        return;
      }
      default: {
        this.status = {
          icon: 'check-circle',
          type: 'success'
        };
      }
    }
  }

  status: {
    icon: string;
    type: string
  } = {} as any;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.actions) {
    }
  }

}
