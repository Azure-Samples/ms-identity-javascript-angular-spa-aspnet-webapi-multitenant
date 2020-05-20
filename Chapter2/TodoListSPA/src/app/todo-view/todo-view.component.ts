import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionRequiredAuthError, AuthError } from 'msal';
import * as config from '../app-config.json';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css']
})
export class TodoViewComponent implements OnInit {
  
  todo: Todo = {
    id: undefined,
    description: undefined,
    user: undefined,
    status: undefined,
  };
  
  todos: Todo[];

  users: string[];

  displayedColumns = ['status', 'description', 'user', 'edit', 'remove'];
  
  constructor(private authService: MsalService, private service: TodoService, private broadcastService: BroadcastService) { }

  ngOnInit(): void {
    this.broadcastService.subscribe('msal:acquireTokenSuccess', (payload) => {
      console.log(payload);
      console.log('access token acquired: ' + new Date().toString());
    });
 
    this.broadcastService.subscribe('msal:acquireTokenFailure', (payload) => {
      console.log(payload);
      console.log('access token acquisition fails');
    });

    this.getTodos();
    this.getUsers();
  }

  getTodos(): void {
    this.service.getTodos().subscribe({
      next: (response: Todo[]) => {
        this.todos = response;
      },
      error: (err: AuthError) => {
        // If there is an interaction required error,
        // call one of the interactive methods and then make the request again.
        if (InteractionRequiredAuthError.isInteractionRequiredError(err.errorCode)) {
          this.authService.acquireTokenPopup({
            scopes: this.authService.getScopesForEndpoint(config.resources.todoListApi.resourceUri)
          })
          .then(() => {
            this.service.getTodos()
              .toPromise()
              .then((response: Todo[])  => {
                this.todos = response;
              });
          });
        }
      }
    });
  }

  getUsers(): void {
    this.service.getUsers().subscribe({
      next: (response: any) => {
        this.users = response.value.map((user) => user.displayName);
      },
      error: (err: AuthError) => {
        // If there is an interaction required error,
        // call one of the interactive methods and then make the request again.
        if (InteractionRequiredAuthError.isInteractionRequiredError(err.errorCode)) {
          this.authService.acquireTokenPopup({
            scopes: this.authService.getScopesForEndpoint(config.resources.graphApi.resourceUri)
          })
          .then(() => {
            this.service.getUsers()
              .toPromise()
              .then((response: any)  => {
                this.users = response.value.map((user) => user.displayName);
              });
          });
        }
      }
    });
  }

  addTodo(add: NgForm): void {
    this.service.postTodo(add.value).subscribe(() => {
      this.getTodos();
    })
    add.resetForm();
  }

  checkTodo(todo): void {
    this.service.editTodo(todo).subscribe();
  }

  removeTodo(id): void {
    this.service.deleteTodo(id).subscribe(() => {
      this.getTodos();
    })
  }

}
