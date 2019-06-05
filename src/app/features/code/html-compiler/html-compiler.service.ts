import { Component, ComponentFactory, NgModule, Injectable, Compiler } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import { SharedModule } from '@shared/shared.module';

@Injectable()
export class DynamicHtmlCompiler {

  constructor(
    protected compiler: Compiler
  ) {
  }

  public createComponentFactory(template: string, clearCache: boolean = false)
    : Observable<ComponentFactory<any>> {

    const type = this.createNewComponent(template);
    const module = this.createComponentModule(type);

    if (clearCache) {
      this.compiler.clearCache();
    }

    return fromPromise(this.compiler.compileModuleAndAllComponentsAsync(module)).pipe(map(moduleWithFactories => {
      return moduleWithFactories.componentFactories.find(cf => cf.componentType === type);
    }));
  }

  protected createNewComponent(tmpl: string) {
    @Component({
      selector: 'dynamic-html-compiler',
      template: tmpl,
    })
    class DynamicHtmlCompilerComponent {
    }
    return DynamicHtmlCompilerComponent;
  }

  protected createComponentModule(componentType: any) {
    @NgModule({
      imports: [
        SharedModule
      ],
      declarations: [
        componentType
      ],
    })
    class RuntimeComponentModule {
    }

    return RuntimeComponentModule;
  }
}
