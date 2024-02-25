import { Component, Input } from '@angular/core';

import { Item } from '../../interfaces/item';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
})

export class TodoItemComponent {
  constructor(private TodoService: TodoService) {
  }
  @Input() item?: Item;
  confirmButton = false;
  name = '';

  /**
    Changes the status of the todo item.
   */
  changeStatus() {
    if (this.item) {
      if (this.item.status == 0 || this.item.status == 1) {
        this.item.status = 2;
      } else {
        this.item.status = 0;
      }
      this.TodoService.updateItem({ ...this.item });
    }
  }

  /**
   * Changes the name of the todo item. It waits 5 seconds before executing, so it doesn't change the name too often.
   * @param name - The new name for the todo item.
   */
  changeName(name: string) {
    if (this.item) {
      this.name = name;
      this.item.name = name;
      this.TodoService.updateItem({ ...this.item });
    }
  }

  /**
   * Changes the position of the todo item.
   * @param position - The new position for the todo item.
   */
  changePosition(position: number) {
    if (this.item) {
      this.item.position = position;
      this.TodoService.updateItem({ ...this.item });
    }
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
  * Change the value of the confirm button, with a delay of 100ms.
  * @param value - The value of the confirm button.
  */
  toggleConfirmButton() {
    if (this.confirmButton) {
      setTimeout(() => {
        // reset the value of the name input
        if (this.item) {
          this.item.name = this.name;
        }
        this.confirmButton = !this.confirmButton;
      }, 300);
    } else {
      this.confirmButton = !this.confirmButton;
      this.name = this.item?.name || '';
    }
  }
}
