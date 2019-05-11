import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExceptionRoutingModule } from './exception-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotPermissionComponent } from './not-permission/not-permission.component';
import { ServerErrorComponent } from './server-error/server-error.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    NotPermissionComponent,
    ServerErrorComponent
  ],
  imports: [
    CommonModule,
    ExceptionRoutingModule
  ]
})
export class ExceptionModule {
}
