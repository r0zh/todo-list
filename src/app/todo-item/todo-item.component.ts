import { Component } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  item: Item = {
    id: 1,
    name: 'Buy Milk',
    status: false,
  };
}
