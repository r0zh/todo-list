import { Component } from '@angular/core';
import { RANDOM_ITEMS } from './random-items';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-random-todo-item',
  templateUrl: './random-todo-item.component.html',
})
export class RandomTodoItemComponent {
  constructor(private TodoService: TodoService) { }

  numTasks = 1;

  /**
  * Adds random items to the todo list.
  * This method is asynchronous to ensure that the items are added one at a time.
  */
  async addRandomItems() {
    for (let i = 0; i < this.numTasks; i++) {
      let randomItem =
        RANDOM_ITEMS[Math.floor(Math.random() * RANDOM_ITEMS.length)];
      this.TodoService.addItem({ ...randomItem });
    }
  }
}
