import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NzSiderTriggerComponent } from 'ng-zorro-antd/layout/sider-trigger.component';
import { NzBreakpointKey } from 'ng-zorro-antd';

@Component({
  selector: '[nzo-sider-trigger]',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="isZeroTrigger">
      <ng-template [ngTemplateOutlet]="nzZeroTrigger || defaultZeroTrigger"></ng-template>
    </ng-container>
    <ng-container *ngIf="isNormalTrigger">
      <ng-template [ngTemplateOutlet]="nzTrigger || defaultTrigger"></ng-template>
    </ng-container>
    <ng-template #defaultTrigger>
      <i nz-icon [nzType]="nzCollapsed ? 'right' : 'left'" *ngIf="!nzReverseArrow"></i>
      <i nz-icon [nzType]="nzCollapsed ? 'left' : 'right'" *ngIf="nzReverseArrow"></i>
    </ng-template>
    <ng-template #defaultZeroTrigger>
      <i nz-icon nzType="bars"></i>
    </ng-template>
  `,
  host: {
    '[class.ant-layout-sider-trigger]': 'isNormalTrigger',
    '[style.width]': 'isNormalTrigger ? siderWidth : null',
    '[class.ant-layout-sider-zero-width-trigger]': 'isZeroTrigger',
    '[class.ant-layout-sider-zero-width-trigger-right]': 'isZeroTrigger && nzReverseArrow',
    '[class.ant-layout-sider-zero-width-trigger-left]': 'isZeroTrigger && !nzReverseArrow'
  }
})

export class SiderTriggerComponent implements OnChanges, OnInit {
  @Input() nzCollapsed = false;
  @Input() nzReverseArrow = false;
  @Input() nzZeroTrigger: TemplateRef<void> | null = null;
  @Input() nzTrigger: TemplateRef<void> | undefined | null = undefined;
  @Input() matchBreakPoint = false;
  @Input() nzCollapsedWidth: number | null = null;
  @Input() siderWidth: string | null = null;
  @Input() nzBreakpoint: NzBreakpointKey | null = null;
  isZeroTrigger = false;
  isNormalTrigger = false;
  updateTriggerType(): void {
    this.isZeroTrigger = this.nzCollapsedWidth === 0 && ((this.nzBreakpoint && this.matchBreakPoint) || !this.nzBreakpoint);
    this.isNormalTrigger = this.nzCollapsedWidth !== 0;
  }
  ngOnInit(): void {
    this.updateTriggerType();
  }
  ngOnChanges(): void {
    this.updateTriggerType();
  }
}
