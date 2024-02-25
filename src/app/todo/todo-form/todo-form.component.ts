import { Item } from '../../interfaces/item';
import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent {
  constructor(private TodoService: TodoService) { }

  // Create blank item to add to list later
  item: Item = {
    name: '',
    position: 0,
    status: false,
  };

  /**
   * Adds a new item to the todo list.
   */
  addItem() {
    if (this.item.name != '') {
      this.TodoService.addItem({ ...this.item });
      this.item = {
        name: '',
        status: false,
        // Set position to end of list
        position: 0,
      };
    }
  }
}
