import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Item } from '../../interfaces/item';
import { TodoService } from '../../services/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-item-list',
  templateUrl: './todo-item-list.component.html',
})
export class TodoItemListComponent {
  constructor(private TodoService: TodoService) { }

  // Get items from local storage
  todos: Item[] = [];
  doings: Item[] = [];
  dones: Item[] = [];

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription = this.TodoService.items$.subscribe((items) => {
      this.todos = items.filter((item) => item.status === 0);
      this.doings = items.filter((item) => item.status === 1);
      this.dones = items.filter((item) => item.status === 2);
    });
  }

  /**
  * Handles the drop event for the todo list.
  */
  dropTodo(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      const movedItem = event.container.data[event.previousIndex];
      // Move the item in the array
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // Update the position of the moved item
      movedItem.position = event.currentIndex;
      this.reorderList(event.previousIndex, event.currentIndex, this.todos)
      this.TodoService.updateItem({ ...movedItem });

    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      const movedItem = event.container.data[event.currentIndex];
      movedItem.status = 0;
      movedItem.position = this.TodoService.getTodosLastPosition()
      this.TodoService.updateItem({ ...movedItem });
    }
  }

  /**
  * Handles the drop event for the doing list.
  */
  dropDoing(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      const movedItem = event.container.data[event.previousIndex];
      // Move the item in the array
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // Update the position of the moved item
      movedItem.position = event.currentIndex - this.TodoService.getTodosLastPosition()
      this.reorderList(event.previousIndex, event.currentIndex, this.doings)
      this.TodoService.updateItem({ ...movedItem });

    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      const movedItem = event.container.data[event.currentIndex];
      movedItem.status = 1;
      movedItem.position = this.TodoService.getDoingsLastPosition()
      this.TodoService.updateItem({ ...movedItem });
    }
  }

  /**
  * Handles the drop event for the done list.
  */
  dropDone(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      const movedItem = event.container.data[event.previousIndex];
      // Move the item in the array
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // Update the position of the moved item
      movedItem.position = event.currentIndex;
      this.reorderList(event.previousIndex, event.currentIndex, this.dones)
      this.TodoService.updateItem({ ...movedItem });
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      const movedItem = event.container.data[event.currentIndex];
      movedItem.status = 2;
      movedItem.position = this.TodoService.getDonesLastPosition()
      this.TodoService.updateItem({ ...movedItem });
    }
  }

  /**
  * Reorders the list of items.
  */
  reorderList(previousIndex: number, currentIndex: number, items: Item[]) {
    if (previousIndex < currentIndex) {
      for (let i = previousIndex; i <= currentIndex; i++) {
        items[i].position = i;
        this.TodoService.updateItem(items[i])
      }
    } else if (previousIndex > currentIndex) {
      for (let i = currentIndex; i <= previousIndex; i++) {
        items[i].position = i;
        this.TodoService.updateItem(items[i])
      }
    }
  }

  /**
  * Track the items by their id.
  */
  trackItem(index: number, item: any): any {
    return item.id;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
