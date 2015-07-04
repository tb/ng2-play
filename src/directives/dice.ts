import {
  Directive,
  ElementRef
  } from 'angular2/angular2';

@Directive({
  selector: "[dice]"
})
export class Dice {
  model: any;
  el: ElementRef;

  constructor(el:ElementRef) {
    this.el = el;
    this.roll();
  }

  roll() {
    setTimeout(() => {
      this.model = Math.floor((Math.random() * 10) + 1);
      console.log('roll', this.model);
      this.roll();
    }, 1000);
  }
}
