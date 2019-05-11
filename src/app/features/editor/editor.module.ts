import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { FlowComponent } from './flow/flow.component';
import { MindComponent } from './mind/mind.component';

@NgModule({
  declarations: [FlowComponent, MindComponent],
  imports: [
    CommonModule,
    EditorRoutingModule
  ]
})
export class EditorModule { }
