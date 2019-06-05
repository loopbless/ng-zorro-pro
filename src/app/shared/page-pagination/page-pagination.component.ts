import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { NzoCheckList } from '@utils/list';
import { Observable, timer } from 'rxjs';
import { delay, filter, tap } from 'rxjs/operators';
import { InputBoolean } from 'ng-zorro-antd';

export interface NzoPageField {
  title: string;
  fieldKey?: string;
  fieldValue?: string | ((data, index: number) => any);
  template?: TemplateRef<{ $implicit: any, index: number }>;
  actions?: { name: string, action: (data, index: number) => void }[];
}

@Component({
  selector: 'nzo-page-pagination',
  templateUrl: './page-pagination.component.html',
  styleUrls: ['./page-pagination.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagePaginationComponent extends NzoCheckList implements OnInit {
  @Input() nzoFetch: (data) => Observable<{ list: any[], total: number }>;
  @Input() nzoFields: NzoPageField[];
  @Input() nzoFirstLoad = true;
  @Input() nzoBordered = false;
  @Input() @InputBoolean() nzoShowCheckbox = false;

  @Input()
  set nzoData(data: { list: any[], total: number }) {
    this.pageData = data || {list: [], total: 0};
    this.isLoading = false;
  }

  @Output() nzoLoad = new EventEmitter();
  @Output() nzoCheckedChange = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.isLoading = !!this.nzoFirstLoad;
    timer(500)
      .pipe(filter(() => this.nzoFirstLoad))
      .subscribe(() => {
        this.loadData();
      });
  }

  loadData() {
    this.isLoading = true;
    this.nzoFetch(this.pagination).pipe(tap(data => {
      this.pageData = data;
      if (this.nzoShowCheckbox) {
        this.nzoInitCheck(data.list);
      }
      this.cdr.markForCheck();
      this.nzoLoad.emit(this.pagination);
    }), delay(100)).subscribe(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    }, () => this.isLoading = false);
  }

  nzoCheckChange(item) {
   this.nzoCheckedChange.emit(item);
  }
}
