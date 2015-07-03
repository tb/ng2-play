import {
  Directive,
  ElementRef,
  Query,
  QueryList,
  NgModel
  } from 'angular2/angular2';

@Directive({
  selector: '[select2]'
})
export class Select2{
  value: any;
  el: ElementRef;

  // Query only directives on self https://github.com/angular/angular/issues/2603
  constructor(el:ElementRef){
    this.value = '';
    this.el = el;

    this.el.nativeElement.addEventListener('change', this.onChangeNative, false);

    $(el.nativeElement).select2().on('change', this.onChange);
  }

  onChange($event){
    console.log('Select2.onChange value', $($event.target).val());
  }

  onChangeNative($event){
    console.log('Select2.onChangeNative value', $($event.target).val());
  }
}
