import {Component, View, NgIf} from 'angular2/angular2';

@Component({
  selector: 'home'
})
@View({
  templateUrl: 'components/home/home.html',
  directives: [NgIf]
})
export class Home {
  name: string = 'World';
  constructor() {
    setTimeout(() => {
      this.name = 'NEW World'
    }, 2000);
  }
}
