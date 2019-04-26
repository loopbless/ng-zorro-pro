import { NgModule } from '@angular/core';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { AdvancedFormComponent } from './advanced-form/advanced-form.component';
import { SharedModule } from '@shared/shared.module';
import { FormsRoutingModule } from './forms-routing.module';

@NgModule({
  declarations: [
    BasicFormComponent,
    AdvancedFormComponent
  ],
  imports: [
    SharedModule,
    FormsRoutingModule
  ]
})
export class FormsModule {
}
