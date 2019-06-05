import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    SharedModule
  ]
})
export class ResultModule { }
