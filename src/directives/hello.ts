import {
  Directive,
  Attribute,
  ElementRef,
  onChange
  } from 'angular2/angular2';

@Directive({
  selector: "[hello]",
  properties: ['name'],
  lifecycle: [onChange]
})
export class Hello {
  name: string;
  el: ElementRef;

  constructor(el:ElementRef) {
    this.name = '';
    this.el = el;
  }

  onChange() {
    this.el.nativeElement.innerHTML = `<h1>Hello ${this.name}!</h1> with directive with lifecycle: [onChange]`;
  }
}
