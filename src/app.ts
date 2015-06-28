import {Component, View, bootstrap} from 'angular2/angular2';import {RouteConfig, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';import {Http, httpInjectables} from 'angular2/http';import {Home} from 'components/home/home';import {Login} from 'components/login/login';import {Users} from 'components/users/users';import {CheckoutForm} from 'components/checkout_form/checkout_form';@Component({  selector: 'app'})@RouteConfig([  { path: '/', component: Home, as: 'home' },  { path: '/login', component: Login, as: 'login' },  { path: '/users', component: Users, as: 'users' },  { path: '/checkout_form', component: CheckoutForm, as: 'checkout_form' }])@View({  templateUrl: './app.html',  directives: [RouterOutlet, RouterLink]})export class App {  constructor() {    $('#side-menu').metisMenu();  }}bootstrap(App, [routerInjectables, httpInjectables]);