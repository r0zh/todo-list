import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Item } from '../../interfaces/item';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item-list',
  templateUrl: './todo-item-list.component.html',
})
export class TodoItemListComponent {
  constructor(private TodoService: TodoService) { }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  // Get items from local storage
  items: Item[] = [];
  ngOnInit() {
    this.TodoService.items$.subscribe((items) => {
      this.items = items;
    });
  }
  drop(event: CdkDragDrop<Item[]>) {
    console.log(this.items)
    if (event.previousContainer === event.container) {
      console.log(event.previousIndex, event.currentIndex)
      let item1 = event.container.data[event.previousIndex]
      let item2 = event.container.data[event.currentIndex]
      console.log(item1, item2)
      item1.position = event.currentIndex
      item2.position = event.previousIndex
      console.log(item1, item2)
      this.TodoService.updateItem({ ...item1 })
      this.TodoService.updateItem({ ...item2 })
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  trackItem(index: number, item: any): any {
    return item.id; // Assuming each item has a unique 'id' property
  }
}
