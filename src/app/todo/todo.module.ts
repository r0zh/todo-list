import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { RandomTodoItemComponent } from './random-todo-item/random-todo-item.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoItemListComponent } from './todo-item-list/todo-item-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoComponent } from './pages/todo.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TodoItemComponent,
    TodoItemListComponent,
    TodoFormComponent,
    TodoComponent,
    RandomTodoItemComponent,
  ],
  exports: [
    TodoComponent
  ],
  imports: [CommonModule, FormsModule],
})
export class TodoModule {}
