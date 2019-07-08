import { NzoBaseList } from './base_list';
import { FormConfig, FormOptions, NzoBaseForm } from '../form';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Mixins } from '@utils/mixins';

export class NzoFormList extends NzoBaseList implements NzoBaseForm {


  nzoFb: FormBuilder;
  nzoForm: FormGroup;

  query: { [key: string]: any };

  get params() {
    return {...this.query, ...this.pagination};
  }

  constructor(controlsConfig?: FormConfig,
              options?: FormOptions) {
    super();
    Mixins.apply(this, [NzoBaseForm]);
  }


  valid: (form?: FormGroup) => boolean;
  validKey: (key, validKey?: string) => boolean;

  reset: (form?: FormGroup, value?: any) => void;

  resetStatus: (form?: FormGroup) => void;

  onSearch(event?: KeyboardEvent) {
    if (event && event instanceof KeyboardEvent) {
      if (event.key === 'Enter') {
        this.loadData();
      }
    }
  }
}
