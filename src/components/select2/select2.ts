import {Component, View, formDirectives} from 'angular2/angular2';

@Component({
  selector: 'select2'
})
@View({
  templateUrl: 'components/select2/select2.html',
  directives: [formDirectives]
})
export class Select2 {
  country = '';
  tags = [];

  constructor() {
    $('#country').select2()
      .on("change", (e) => {
        console.log("$on change", e.target.value);
      }).on("select2:select", (e) => {
        console.log("$on select2:select", e.target.value);
      });

    $('#tags').select2({
      tags: true
    });
  }

  onChange($event) {
    console.log('ng2 onChange', $event.target.value);
  }
}
