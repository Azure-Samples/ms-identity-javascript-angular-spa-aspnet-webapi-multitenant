import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as auth from '../auth-config.json';

type User = {
  name?: String,
  id?: String,
}

type GraphResponse = {
  value?: string[],
}

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})
export class TenantComponent implements OnInit {
  
  users: User[] = [];

  displayedColumns = ['name', 'id'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.http.get(auth.resources.graphApi.resourceUri)
      .subscribe((response: GraphResponse) => {
        let users: User[] = [];

        response.value?.forEach((element: any ) => {
          users.push({name: element.displayName, id: element.id});
        });
        
        this.users = users;
      });
  }

}
