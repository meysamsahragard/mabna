import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mabna-login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  @Input() title = 'login';
  @Input() submitButtonText = 'login';

  @Output() submitForm = new EventEmitter();

  form: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern('[-_a-zA-Z0-9]*')
    ]),
    password: new FormControl('', [Validators.required])
  });

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
