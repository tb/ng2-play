import {Component, View, formDirectives, NgControl, Validators, NgFormModel, FormBuilder} from 'angular2/angular2';

@Component({
  selector: 'login',
  appInjector: [FormBuilder]
})
@View({
  templateUrl: 'components/login/login.html',
  directives: [formDirectives]
})
export class Login {
  form;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    alert(JSON.stringify(this.form.value));
  }
}
