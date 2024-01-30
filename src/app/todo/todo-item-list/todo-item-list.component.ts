import { Component} from '@angular/core';
import { Item } from '../../interfaces/item';
import { TodoService } from '../../services/todo.service';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        stagger('60ms', animate('600ms ease-out', style({ opacity: 1 }))),
      ],
      { optional: true }
    ),
    query(':leave', animate('200ms', style({ opacity: 0 })), {
      optional: true,
    }),
  ]),
]);

@Component({
  selector: 'app-todo-item-list',
  templateUrl: './todo-item-list.component.html',
  animations: [listAnimation],
})
export class TodoItemListComponent {
  constructor(private TodoService: TodoService) {}

  items: Item[] = this.TodoService.items;
  // get items from local storage
}