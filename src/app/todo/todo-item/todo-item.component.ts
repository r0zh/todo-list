import { Component, Input } from '@angular/core';

import { Item } from '../../interfaces/item';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
})

export class TodoItemComponent {
  constructor(private TodoService: TodoService) {}
  @Input() item?: Item;

  /**
   * Changes the status of the todo item.
   */
  changeStatus() {
    if (this.item) {
      this.item.status = !this.item.status;
      this.TodoService.changeStatus({ ...this.item });
    }
  }

  /**
   * Changes the name of the todo item.
   * @param name - The new name for the todo item.
   */
  changeName(name: string) {
    if (this.item) {
      this.item.name = name;
      this.TodoService.changeName({ ...this.item });
    }
  }

  /**
   * Removes the todo item.
   */
  removeItem() {
    if (this.item) {
      this.TodoService.removeItem( this.item );
    }
  }
}
