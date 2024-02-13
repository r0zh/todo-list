import { Component, Input, Renderer2 } from '@angular/core';

import { Item } from '../../interfaces/item';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
})

export class TodoItemComponent {
  constructor(private TodoService: TodoService, private renderer: Renderer2) {
    this.renderer.listen('window', 'beforeunload', () => this.changeName());
  }
  private timeoutId: any;
  @Input() item?: Item;

  /**
    Changes the status of the todo item.
   */
  changeStatus() {
    if (this.item) {
      this.item.status = !this.item.status;
      this.TodoService.changeStatus({ ...this.item });
    }
  }

  /**
   * Changes the name of the todo item. It waits 5 seconds before executing, so it doesn't change the name too often.
   * @param name - The new name for the todo item.
   */
  changeName(name?: string) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      if (this.item) {
        this.item.name = name || this.item.name;
        this.TodoService.changeName({ ...this.item });
      }
    }, 5000); // wait 5 second before executing
  }

  /**
   * Removes the todo item.
   */
  removeItem() {
    if (this.item) {
      this.TodoService.removeItem({ ...this.item });
    }
  }

  /**
   * Saves the changes to the todo item.
   * @param name - The new name for the todo item.
   */
  saveChanges(name?: string) {
    if (this.timeoutId) {
      if (this.item && name) {
        this.item.name = name;
        this.TodoService.changeName({ ...this.item });
      }
    }
  }
}
