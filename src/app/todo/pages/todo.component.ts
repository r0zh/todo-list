import { Component } from '@angular/core';
import { Item } from '../../interfaces/item';
import { LocalStorageService } from '../../services/localStorageService';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent {
  items: Item[] = [];
  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.items = this.localStorageService.loadItems();
    // order the array so that the completed items are at the bottom
    this.sortItems();
  }

  onAddItem(item: Item) {
    console.log('onAddItem', item);
    this.items.push(item);
    this.sortItems();
    this.updateItems();
  }

  onRemoveItem(item: Item) {
    console.log('removeItem', item);
    // get index of the item
    const index = this.items.indexOf(item);
    // if item exists
    if (index > -1) {
      this.items.splice(index, 1);
    }
    // update the items in local storage
    this.updateItems();
  }

  onChangeStatus(item: Item) {
    console.log('onChangeStatus', item);
    // get index of the item
    const index = this.items.indexOf(item);

    // if item exists
    if (index > -1) {
      this.items[index].status = item.status;
    }

    // reorder the list of items so that the completed items are at the bottom
    this.sortItems();

    // update the items in local storage
    this.updateItems();
  }

  onChangeName(item: Item) {
    console.log('onChangeName', item);
    // get index of the item
    const index = this.items.indexOf(item);
    // if item exists
    if (index > -1) {
      this.items[index].name = item.name;
    }
    // update the items in local storage
    this.updateItems();
  }

  private updateItems() {
    this.localStorageService.saveItems(this.items);
  }

  private compareItems(a: Item, b: Item): number {
   if (a.status === b.status) {
      return 0;
   } else if (a.status) {
      return 1;
   } else {
      return -1;
   }
  }

  private sortItems() {
   this.items.sort(this.compareItems);
  }
}
