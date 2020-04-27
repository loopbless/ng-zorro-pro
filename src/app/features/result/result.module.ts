import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { ResultRoutingModule } from './result-routing.module';
import { SuccessComponent } from './success/success.component';
import { ErrorComponent } from './error/error.component';
import { SharedModule } from '@shared/shared.module';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [SuccessComponent, ErrorComponent, ResultComponent],
  imports: [
    CommonModule,
    ResultRoutingModule,
    SharedModule,
    NzResultModule,
    NzIconModule,
    NzButtonModule,
    NzMessageModule,
    NzLayoutModule,
    NzGridModule,
    NzStepsModule,
  ]
})
export class ResultModule { }
