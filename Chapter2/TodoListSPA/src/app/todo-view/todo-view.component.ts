import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css']
})
export class TodoViewComponent implements OnInit {
  
  todo!: Todo
  
  todos: Todo[] = [];

  users: string[] = [];

  displayedColumns = ['status', 'description', 'user', 'edit', 'remove'];
  
  constructor(private authService: MsalService, private service: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
    this.getUsers();
  }

  getTodos(): void {
    this.service.getTodos()
      .subscribe((todos: Todo[]) => {
        this.todos = todos;
      });
  }

  getUsers(): void {
    this.service.getUsers()
    .subscribe((response: any) => {
      this.users = response.value.map((user: any) => user.displayName);
    });
  }

  addTodo(add: NgForm): void {
    this.service.postTodo(add.value).subscribe(() => {
      this.getTodos();
    })
    add.resetForm();
  }

  checkTodo(todo: Todo): void {
    this.service.editTodo(todo).subscribe();
  }

  removeTodo(id: string): void {
    this.service.deleteTodo(+id).subscribe(() => {
      this.getTodos();
    })
  }

}
