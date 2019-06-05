import { AbstractControlOptions, FormBuilder, FormGroup } from '@angular/forms';
import { Injector } from '@angular/core';

export type FormOptions = AbstractControlOptions | { [key: string]: any; } | null;
export type FormConfig = AbstractControlOptions | { [key: string]: any; } | null;

export class NzoBaseForm {

  nzoForm: FormGroup;

  nzoFb: FormBuilder;

  constructor(controlsConfig?: FormConfig,
              options?: FormOptions) {
    this.nzoFb = Injector.create({
      providers: [{
        provide: FormBuilder,
        useClass: FormBuilder,
        deps: []
      }]
    }).get(FormBuilder);
    if (controlsConfig) {
      this.nzoForm = this.nzoFb.group(controlsConfig, options);
    }
  }

  /**
   * Validates status of the form
   * @param form The form is a group of form instances
   * @return boolean the form status
   */
  nzoFormValid(form: FormGroup = this.nzoForm): boolean {
    if (form.valid) {
      return true;
    }
    const controls = form.controls;
    let validStatus = true;
    for (const i in controls) {
      if (controls.hasOwnProperty(i)) {
        controls[i].markAsDirty();
        controls[i].updateValueAndValidity();
        validStatus = validStatus ? controls[i].valid : validStatus;
      }
    }
    return validStatus;
  }

  /**
   * Resets the form view status
   * @param form The form is a group of form instances
   */
  nzoResetFormStatus(form: FormGroup = this.nzoForm) {
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
  nzoResetForm(form: FormGroup = this.nzoForm, value?: any) {
    this.nzoResetFormStatus(form);
    form.reset(value);
  }
}
