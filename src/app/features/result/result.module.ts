import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultRoutingModule } from './result-routing.module';
import { SuccessComponent } from './success/success.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [SuccessComponent, ErrorComponent],
  imports: [
    CommonModule,
    ResultRoutingModule
  ]
})
export class ResultModule { }
