import {Component, View, NgIf, formDirectives} from 'angular2/angular2';
import {Hello} from 'directives/hello';

@Component({
  selector: 'home'
})
@View({
  templateUrl: 'components/home/home.html',
  directives: [NgIf, formDirectives, Hello]
})
export class Home {
  name: string;

  constructor(){
    this.name = 'Tom';
  }
}
