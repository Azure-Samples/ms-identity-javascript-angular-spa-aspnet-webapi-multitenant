import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Configuration } from "./models/configuration";
import * as auth from './auth-config.json';

@Injectable({
    providedIn: 'root'
  })
  export class ConfigurationsService {
    
    apiUri = auth.resources.getConfigApi.resourceUri;

    constructor(private http: HttpClient) { }
    
    getConfigurations() { 
      return this.http.get<Configuration>(this.apiUri);
    }

  }