import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzoGraphShadowComponent } from './nzo-graph-shadow.component';
import { NzoGraphComponent } from './nzo-graph.component';
import { NzoLineComponent } from './nzo-line.component';
import { NzoFlowchartComponent } from './flowchart.component';
import { CommonModule } from '@angular/common';
import { FCStoreFactory } from './flowchart_store';
import { FCGraphProvider } from './flowchart_view';
import { ContextmenuComponent } from './contextmenu.component';

const COMPONENTS = [
  NzoFlowchartComponent,
  NzoLineComponent,
  NzoGraphComponent,
  NzoGraphShadowComponent,
  ContextmenuComponent,
];

const PROVIDERS = [FCStoreFactory, FCGraphProvider];

@NgModule({
  imports: [CommonModule, DragDropModule],
  exports: [NzoFlowchartComponent],
  declarations: [...COMPONENTS],
  providers: [PROVIDERS],
})
export class NzoFlowChartModule {}
