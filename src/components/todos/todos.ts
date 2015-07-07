import {Component, View, NgFor, formDirectives} from 'angular2/angular2';

export class Todo {
  desc: string;
  done: boolean;

  constructor(params){
    this.desc = params.desc;
  }
}

@Component({
  selector: 'todos'
})
@View({
  templateUrl: 'components/todos/todos.html',
  directives: [formDirectives, NgFor]
})
export class Todos {
  desc: string;
  todos: Array<Todo> = [];

  constructor(){
    this.desc = '';
    this.addTodo('First Todo');
    this.addTodo('Seconds Todo');
  }

  addTodo(desc:string) {
    let todo = new Todo({desc: desc});
    this.todos.push(todo);
    this.desc = '';
  }

  removeTodo(todo) {
    let index = this.todos.indexOf(todo);
    this.todos.splice(index,1);
  }
}
