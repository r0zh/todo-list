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
    if (event.previousContainer === event.container) {
      const movedItem = event.container.data[event.previousIndex];

      // Move the item in the array
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      // Update the position of the moved item
      movedItem.position = event.currentIndex;
      this.reorderList(event.previousIndex, event.currentIndex)
      this.TodoService.updateItem({ ...movedItem });


    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  reorderList(previousIndex: number, currentIndex: number) {
    if (previousIndex < currentIndex) {
      for (let i = previousIndex; i <= currentIndex; i++) {
        this.items[i].position = i;
        this.TodoService.updateItem(this.items[i])
      }
    } else if (previousIndex > currentIndex) {
      for (let i = currentIndex; i <= previousIndex; i++) {
        this.items[i].position = i;
        this.TodoService.updateItem(this.items[i])
      }
    }
  }

  trackItem(index: number, item: any): any {
    return item.id; // Assuming each item has a unique 'id' property
  }
}
