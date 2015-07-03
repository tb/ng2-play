import {Attribute, Component, Directive, View, formDirectives} from 'angular2/angular2';
import {ObservableWrapper, EventEmitter, ElementRef, NgModel, Query, QueryList} from 'angular2/angular2';
import {Highlight} from 'directives/highlight';
import {Select2} from 'directives/select2';


@Component({
  selector: 'select2'
})
@View({
  templateUrl: 'components/selects/selects.html',
  directives: [formDirectives, Select2, Highlight]
})
export class Selects {
  country: String;
  tags: Array;

  constructor() {
    this.country = '';
    this.tags = [];
  }

  onChange($event) {
    this.country = $event.target.value;
    console.log('onChange (country)', this.country);
  }
}
