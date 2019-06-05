import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { FlowComponent } from './flow/flow.component';
import { MindComponent } from './mind/mind.component';
import { SharedModule } from '@shared/shared.module';
import { FlowchartComponent } from './flowchart/flowchart.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FCGraphProvider, FCStateFactory } from './flowchart';

@NgModule({
  declarations: [
    FlowComponent,
    MindComponent,
    FlowchartComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    SharedModule,
    DragDropModule
  ],
  providers: [
    FCGraphProvider,
    FCStateFactory
  ]
})
export class EditorModule { }
