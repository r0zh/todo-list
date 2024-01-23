import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../interfaces/item';
import { LocalStorageService } from '../../services/localStorageService';
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
  constructor(private localStorageService: LocalStorageService) {}

  @Input() items: Item[] = [];
  // get items from local storage

  @Output() onRemoveItem = new EventEmitter<Item>();
  @Output() onChangeStatus = new EventEmitter<Item>();
  @Output() onChangeName = new EventEmitter<Item>();

  removeItem(item: Item) {
    this.onRemoveItem.emit(item);
  }

  changeStatus(item: Item) {
    this.onChangeStatus.emit(item);
  }

  changeName(item: Item) {
    this.onChangeName.emit(item);
  }
}
