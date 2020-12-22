import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import * as auth from '../auth-config.json';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.css']
})
export class ConsentComponent {
  
  constructor(private authService: MsalService) { }

  adminConsent() {

    // if you want to work with multiple accounts, add your account selection logic below
    let account = this.authService.instance.getAllAccounts()[0];

    if (account) {
      const state = Math.floor(Math.random() * 90000) + 10000; // state parameter for anti token forgery
      
        // admin consent endpoint. visit X for more info
        const adminConsentUri = "https://login.microsoftonline.com/" + 
        `${account.tenantId}` + "/v2.0/adminconsent?client_id=" + 
        `${auth.credentials.clientId}` + "&state=" + `${state}` + "&redirect_uri=" + `${auth.configuration.redirectUri}` +
        "&scope=https://graph.microsoft.com/.default";
  
      // redirecting...
      window.location.replace(adminConsentUri);
      
    } else {
      window.alert('Please sign-in first.')
    }
  }
}
