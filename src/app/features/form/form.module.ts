import { NgModule } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SharedModule } from '@shared/shared.module';
import { BasicComponent } from './basic/basic.component';
import { AdvancedComponent } from './advanced/advanced.component';
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
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzToolTipModule,
    NzSelectModule,
    NzCheckboxModule,
    NzButtonModule,
    FormRoutingModule
  ]
})
export class FormModule {
}
