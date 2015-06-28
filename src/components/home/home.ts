import {Component, View, NgIf, formDirectives} from 'angular2/angular2';

@Component({
  selector: 'home'
})
@View({
  templateUrl: 'components/home/home.html',
  directives: [NgIf, formDirectives]
})
export class Home {
  name: string;
}
