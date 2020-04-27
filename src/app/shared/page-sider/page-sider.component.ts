/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';

import { NzBreakpointService } from 'ng-zorro-antd/core/services';
import { NzSiderComponent } from 'ng-zorro-antd';

@Component({
  selector: 'nzo-page-sider',
  exportAs: 'nzoPageSider',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./page-sider.component.html`,
  host: {
    '[class.ant-layout-sider]': 'true',
    '[class.ant-layout-sider-zero-width]': `nzCollapsed && nzCollapsedWidth === 0`,
    '[class.ant-layout-sider-light]': `nzTheme === 'light'`,
    '[class.ant-layout-sider-dark]': `nzTheme === 'dark'`,
    '[class.ant-layout-sider-collapsed]': `nzCollapsed`,
    '[style.flex]': 'flexSetting',
    '[style.maxWidth]': 'widthSetting',
    '[style.minWidth]': 'widthSetting',
    '[style.width]': 'widthSetting'
  }
})
export class PageSiderComponent extends NzSiderComponent {
}
