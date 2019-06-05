import { NgModule } from '@angular/core';

import { HtmlCompilerDirective } from './html-compiler.directive';
import { DynamicHtmlCompiler } from './html-compiler.service';

@NgModule({
  imports: [],
  exports: [
    HtmlCompilerDirective
  ],
  declarations: [HtmlCompilerDirective],
  providers: [DynamicHtmlCompiler],
})
export class HtmlCompilerModule {
}
