import {
  Directive,
  ElementRef
  } from 'angular2/angular2';

@Directive({
  selector: "[highlight]",
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class Highlight {
  el: ElementRef;

  constructor(el:ElementRef) {
    this.el = el;
  }

  onMouseEnter() {
    this.outline('red solid 1px');
  }

  onMouseLeave() {
    this.outline();
  }

  outline(outline:string = "") {
    this.el.nativeElement.style.outline = outline;
  }
}
