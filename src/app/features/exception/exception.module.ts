import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';
import { SharedModule } from '@shared/shared.module';
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
    SharedModule,
    NzButtonModule,
    RouterModule,
    NzResultModule,
    ExceptionRoutingModule
  ]
})
export class ExceptionModule {
}
