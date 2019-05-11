import { NzoBasicList } from './basic_list';
import { NzoBasicForm } from '@utils/form';
import { FormGroup } from '@angular/forms';
import { Mixins } from '@utils/mixins';

export class NzoFormList extends NzoBasicList implements NzoBasicForm {

  constructor() {
    super();
    Mixins.apply(this, [NzoBasicForm]);
  }

  formGroup: FormGroup;

  formValid: (form?: FormGroup) => boolean;

  resetForm: (form?: FormGroup, value?: any) => void;

  resetFormStatus: (form?: FormGroup) => void;

  onSearch(event?: KeyboardEvent) {
    if (event && event instanceof KeyboardEvent) {
      if (event.key === 'Enter') {
        this.loadData();
      }
    }
  }
}
