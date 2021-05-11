import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'lib-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() error: string | null;
  @Output() submitForm = new EventEmitter();

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('[-_a-zA-Z0-9]*')]),
    password: new FormControl('', [Validators.required]),
  });

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
