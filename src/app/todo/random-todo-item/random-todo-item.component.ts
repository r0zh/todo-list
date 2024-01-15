import { Component, EventEmitter, Output } from '@angular/core';
import { RANDOM_ITEMS } from './random-items';
import { Item } from '../interfaces/item';

@Component({
  selector: 'app-random-todo-item',
  templateUrl: './random-todo-item.component.html',
  styleUrls: ['./random-todo-item.component.css'],
})
export class RandomTodoItemComponent {
  @Output() onAddItem = new EventEmitter<Item>();

  numTasks = 1;
  addRandomItems() {
    for (let i = 0; i < this.numTasks; i++) {
      let randomItem =
        RANDOM_ITEMS[Math.floor(Math.random() * RANDOM_ITEMS.length)];
      this.onAddItem.emit({ ...randomItem });
    }
  }
}
