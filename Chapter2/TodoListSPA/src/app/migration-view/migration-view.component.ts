import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { environment } from "src/environments/environment";
import { ConfigurationsService } from "../configurations.service";
import { Configuration } from "../models/configuration";

@Component({
    selector: 'migration-view',
    templateUrl: './migration-view.component.html',
    styleUrls: ['./migration-view.component.css']
  })
  export class MigrationViewComponent implements OnInit {
   
  calendar: string = "";
  zoomClientId: string = "";
  
  constructor(private configService : ConfigurationsService){}

  ngOnInit(): void {
    this.calendar = 'outlook'
    this.fetchZoomClientId();
  }

  private fetchZoomClientId() : void
  {
    var zoomClientIdInSession = sessionStorage.getItem('zoom_client_id');
    if(zoomClientIdInSession && zoomClientIdInSession.length > 0)
    {
      this.zoomClientId = zoomClientIdInSession;
    }
    else
    {
      var config = this.configService.getConfigurations().subscribe((config: Configuration) => {
        this.zoomClientId = config.zoomAppId;
        sessionStorage.setItem("zoom_client_id", config.zoomAppId);
      });
    }
  }

  public onSignInToZoomsClickEvent() : void
  {
    sessionStorage.setItem("current_login_attempt", "zoom");
    window.open(this.getZoomAuthorizationEndPoint(), '_self');
  }

  public onSignInToTeamsClickEvent() : void
  {
    sessionStorage.setItem("current_login_attempt", "zoom");
    window.open(this.getZoomAuthorizationEndPoint(), '_self');
  }
  
  private getZoomAuthorizationEndPoint() : string
  {
    return "https://zoom.us/oauth/authorize?response_type=code&client_id=" + this.zoomClientId + "&redirect_uri=" + environment.redirectUri
  }
}