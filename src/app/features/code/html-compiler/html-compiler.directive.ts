import { Directive, Input, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import { DynamicHtmlCompiler } from './html-compiler.service';

@Directive({selector: '[htmlCompiler]'})
export class HtmlCompilerDirective implements OnChanges {

  @Input() htmlCompiler: string;

  constructor(private dynamicCompiler: DynamicHtmlCompiler,
              private view: ViewContainerRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const html = changes.htmlCompiler;
    console.log(html.currentValue)
    if (html.currentValue && html.currentValue !== html.previousValue) {
      this.dynamicCompiler.createComponentFactory(this.htmlCompiler, true).subscribe(cf => {
        this.view.clear();
        this.view.createComponent(cf);
      });
    }
  }
}
