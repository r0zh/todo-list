import { Component } from '@angular/core';

@Component({
  selector: 'app-random-todo-item',
  templateUrl: './random-todo-item.component.html',
  styleUrls: ['./random-todo-item.component.css'],
})
export class RandomTodoItemComponent {
  numTasks = 0;
  addRandomItems() {
    for (let i = 0; i < this.numTasks; i++) {
      console.log('Adding random item', i + 1);
    }
    const randomTodoItem = {
      title: `Random todo item ${Math.random()}`,
      completed: false,
    };
  }
}
