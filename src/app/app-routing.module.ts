import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/pages/todo.component';

const routes: Routes = [
  { path: 'todo', component: TodoComponent },
  { path: '', redirectTo: '/todo', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
