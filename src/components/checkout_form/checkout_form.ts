//import {Component, View, formDirectives, NgControl, Validators, NgFormModel, FormBuilder} from 'angular2/angular2';

import {
  bootstrap,
  onChange,
  NgIf,
  NgFor,
  Component,
  Directive,
  View,
  Ancestor
  } from 'angular2/angular2';

import {formDirectives, NgControl, Validators, NgFormModel, FormBuilder} from 'angular2/forms';

import {RegExpWrapper, print, isPresent} from 'angular2/src/facade/lang';

//import {reflector} from 'angular2/src/reflection/reflection';
//import {ReflectionCapabilities} from 'angular2/src/reflection/reflection_capabilities';

/**
 * Custom validator.
 */
function creditCardValidator(c): StringMap<string, boolean> {
  if (isPresent(c.value) && RegExpWrapper.test(new RegExp("^\\d{16}$"), c.value)) {
    return null;
  } else {
    return {"invalidCreditCard": true};
  }
}

/**
 * This is a component that displays an error message.
 *
 * For instance,
 *
 * <show-error control="creditCard" [errors]="['required', 'invalidCreditCard']"></show-error>
 *
 * Will display the "is required" error if the control is empty, and "invalid credit card" if the
 * control is not empty
 * but not valid.
 *
 * In a real application, this component would receive a service that would map an error code to an
 * actual error message.
 * To make it simple, we are using a simple map here.
 */
@Component({selector: 'show-error', properties: ['controlPath: control', 'errorTypes: errors']})
@View({
  template: `
    <span *ng-if="errorMessage !== null">{{errorMessage}}</span>
  `,
  directives: [NgIf]
})
export class ShowError {
  formDir;
  controlPath: string;
  errorTypes: List<string>;

  constructor(@Ancestor() formDir: NgFormModel) { this.formDir = formDir; }

  get errorMessage() {
    var c = this.formDir.form.find(this.controlPath);
    for (var i = 0; i < this.errorTypes.length; ++i) {
      if (isPresent(c) && c.touched && c.hasError(this.errorTypes[i])) {
        return this._errorMessage(this.errorTypes[i]);
      }
    }
    return null;
  }

  _errorMessage(code) {
    var config = {'required': 'is required', 'invalidCreditCard': 'is invalid credit card number'};
    return config[code];
  }
}


@Component({
  selector: 'model-driven-forms',
  appInjector: [FormBuilder]
})
@View({
  templateUrl: 'components/checkout_form/checkout_form.html',
  directives: [formDirectives, NgFor, ShowError]
})
export class CheckoutForm {
  form;
  countries = ['US', 'Canada'];

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      firstName: ["Tony", Validators.required],
      middleName: [""],
      lastName: ["Stark", Validators.required],
      country: ["US", Validators.required],
      creditCard: ["1234567891234567", Validators.compose([Validators.required, creditCardValidator])],
      amount: [100, Validators.required],
      email: ["user@example.com", Validators.required],
      comments: [""]
    });
  }

  onSubmit() {
    print("Submitting:");
    print(this.form.value);
  }
}
