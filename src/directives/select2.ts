import {
  Directive,
  ElementRef
  } from 'angular2/angular2';

@Directive({
  selector: '[select2]'
})
export class Select2{
  value: any;
  el: ElementRef;

  constructor(el:ElementRef){
    this.value ='';
    this.el = el;

    $(el.nativeElement).select2().on('change', this.onChange);
  }
  onChange($event){
    console.log('Select2.onChange value', $($event.target).val());
  }
}
