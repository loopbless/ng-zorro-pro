import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nzo-basic-form',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.less']
})
export class BasicComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator()]],
      nickname: [null, [Validators.required]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required]],
      website: [null, [Validators.required]],
      captcha: [null, [Validators.required]],
      agree: [false]
    });
  }

  confirmationValidator() {
    return (control: FormControl): { [s: string]: boolean } => {
      if (!control.value) {
        return {required: true};
      } else if (control.value !== this.validateForm.controls.password.value) {
        return {confirm: true, error: true};
      }
      return null;
    };
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  getCaptcha($event: MouseEvent) {

  }

  onSubmit() {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
