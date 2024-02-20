import { Component } from '@angular/core';
import { Item } from '../../interfaces/item';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item-list',
  templateUrl: './todo-item-list.component.html',
})
export class TodoItemListComponent {
  constructor(private TodoService: TodoService) { }

  // Get items from local storage
  items: Item[] = [];
  ngOnInit() {
    this.TodoService.items$.subscribe((items) => {
      this.items = items;
    });
  }
}
