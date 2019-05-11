import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AnalysisComponent } from './analysis/analysis.component';
import { MonitorComponent } from './monitor/monitor.component';
import { WorkplaceComponent } from './workplace/workplace.component';

@NgModule({
  declarations: [
    AnalysisComponent,
    MonitorComponent,
    WorkplaceComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
