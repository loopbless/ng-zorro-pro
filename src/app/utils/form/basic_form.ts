import { FormGroup } from '@angular/forms';

export class NzoBasicForm {

  formGroup: FormGroup;

  /**
   * Validates status of the form
   * @param form The form is a group of form instances
   * @return boolean the form status
   */
  formValid(form: FormGroup = this.formGroup): boolean {
    if (form.valid) {
      return true;
    }
    const controls = form.controls;
    for (const i in controls) {
      if (controls.hasOwnProperty(i)) {
        controls[i].markAsDirty();
        controls[i].updateValueAndValidity();
      }
    }
    return false;
  }

  /**
   * Resets the form view status
   * @param form The form is a group of form instances
   */
  resetFormStatus(form: FormGroup = this.formGroup) {
    const controls = form.controls;
    for (const i in controls) {
      if (controls.hasOwnProperty(i)) {
        controls[i].markAsPristine();
        controls[i].updateValueAndValidity();
      }
    }
  }

  /**
   * Resets the form to the initial form and resets the form view status
   * @param form The form is a group of form instances
   * @param value Initial value of form
   */
  resetForm(form: FormGroup = this.formGroup, value?: any) {
    this.resetFormStatus(form);
    form.reset(value);
  }
}
