import { Item } from '../../interfaces/item';
import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent {
  constructor(private TodoService: TodoService) {}

  item: Item = {
    name: '',
    status: false,
  };

  addItem() {
    if (this.item.name != '') {
      this.TodoService.addItem({ ...this.item });
      this.item = {
        name: '',
        status: false,
      };
    }
  }
}
