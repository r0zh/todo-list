import { Component } from '@angular/core';
import { Item } from '../../interfaces/item';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent {
  constructor(private TodoService: TodoService) {}
}
