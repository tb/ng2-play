import {Component, View, NgFor} from 'angular2/angular2';
import {Http} from 'angular2/http';

@Component({
  selector: 'users'
})
@View({
  templateUrl: 'components/users/users.html',
  directives: [NgFor]
})
export class Users {
  users: Array;

  constructor(http: Http) {
    http.get( 'http://localhost:3002/users.json')
      //.map(res => res.json())
      //.subscribe(users => this.users = users);
  }
}
