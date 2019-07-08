import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { FlowComponent } from './flow/flow.component';
import { MindComponent } from './mind/mind.component';
import { SharedModule } from '@shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzoFlowChartModule } from './flowchart';

@NgModule({
  declarations: [
    FlowComponent,
    MindComponent,
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    SharedModule,
    DragDropModule,
    NzoFlowChartModule
  ],
})
export class EditorModule { }
