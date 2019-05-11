import { NgModule } from '@angular/core';
import { BasicComponent } from './basic/basic.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { SharedModule } from '@shared/shared.module';
import { FormRoutingModule } from './form-routing.module';
import { StepComponent } from './step/step.component';

@NgModule({
  declarations: [
    BasicComponent,
    AdvancedComponent,
    StepComponent
  ],
  imports: [
    SharedModule,
    FormRoutingModule
  ]
})
export class FormModule {
}
