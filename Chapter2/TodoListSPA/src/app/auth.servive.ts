import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as auth from './auth-config.json';
import { AuthCode } from "./models/authcode";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {

    apiUri = auth.resources.authApi.resourceUri;

    constructor(private http: HttpClient) { }

    postAuthCode(authCode: AuthCode)
    {
      console.log("calling zoom auth servive");
      return this.http.post<AuthCode>(this.apiUri, authCode)
    }

  }