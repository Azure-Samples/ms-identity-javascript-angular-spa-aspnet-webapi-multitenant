// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js

$('.toast').toast({})

const myMSALObj = new Msal.UserAgentApplication(msalConfig);

function adminConsent() {
  myMSALObj.loginPopup(loginRequest)
    .then(loginResponse => {
      console.log("id_token acquired at: " + new Date().toString());

      const state = Math.floor(Math.random() * 90000) + 10000; // state parameter for anti token forgery

      // admin consent endpoint. visit X for more info
      const adminConsetUri = "https://login.microsoftonline.com/" + 
      `${loginResponse.idTokenClaims.tid}` + "/v2.0/adminconsent?client_id=" + 
      `${msalConfig.auth.clientId}` + "&state=" + `${state}` + "&redirect_uri=" + `${msalConfig.auth.redirectUri}` +
      "&scope=https://graph.microsoft.com/.default";

      // redirecting...
      window.location.replace(adminConsetUri);

      if (myMSALObj.getAccount()) {
        showWelcomeMessage(myMSALObj.getAccount());
      }

    }).catch(error => {
      console.log(error);
    });
}

function signIn() {
  myMSALObj.loginPopup(loginRequest)
    .then(loginResponse => {
      console.log("id_token acquired at: " + new Date().toString());
      console.log(loginResponse);
      
      if (myMSALObj.getAccount()) {
        showWelcomeMessage(myMSALObj.getAccount());
      }
    }).catch(error => {
      console.log(error);
    });
}

function signOut() {
  myMSALObj.logout();
}

// in case of page refresh
if (myMSALObj.getAccount()) {
  showWelcomeMessage(myMSALObj.getAccount());
}

function getTokenPopup(request) {
  return myMSALObj.acquireTokenSilent(request)
    .catch(error => {
      console.log(error);
      console.log("silent token acquisition fails. acquiring token using popup");
          
      // fallback to interaction when silent call fails
        return myMSALObj.acquireTokenPopup(request)
          .then(tokenResponse => {
            return tokenResponse;
          }).catch(error => {
            console.log(error);
          });
    });
}

function seeProfiles() {
  if (myMSALObj.getAccount()) {
    getTokenPopup(tokenRequest)
      .then(response => {
        callMSGraph(graphConfig.graphUsersEndpoint, response.accessToken, updateUI);
        profileButton.classList.add("d-none");
      }).catch(error => {
        console.log(error);
      });
  }
}
