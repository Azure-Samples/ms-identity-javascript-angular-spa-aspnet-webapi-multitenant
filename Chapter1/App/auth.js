// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js

$('.toast').toast({})

const myMSALObj = new msal.PublicClientApplication(msalConfig);
let username = "";

const loadPage = () => {

  /**
   * See here for more info on account retrieval: 
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
   */
  const currentAccounts = myMSALObj.getAllAccounts();

  if (currentAccounts === null) {
      return;
  } else if (currentAccounts.length > 1) {
      // Add choose account code here
      console.warn("Multiple accounts detected.");
  } else if (currentAccounts.length === 1) {
      username = currentAccounts[0].username;
      showWelcomeMessage(currentAccounts[0]);
  }
}

const adminConsent = () => {
  myMSALObj.loginPopup(loginRequest)
    .then(loginResponse => {
      console.log(loginRequest)
      console.log("id_token acquired at: " + new Date().toString());

      username = loginResponse.account.username;

      const state = Math.floor(Math.random() * 90000) + 10000; // state parameter for anti token forgery

      // admin consent endpoint. visit X for more info
      const adminConsentUri = "https://login.microsoftonline.com/" + 
      `${loginResponse.idTokenClaims.tid}` + "/v2.0/adminconsent?client_id=" + 
      `${msalConfig.auth.clientId}` + "&state=" + `${state}` + "&redirect_uri=" + `${msalConfig.auth.redirectUri}` +
      "&scope=.default";

      // redirecting...
      window.location.replace(adminConsentUri);

      // if (myMSALObj.getAccountByUsername(username)) {
      //   showWelcomeMessage(loginResponse.account);
      // }

    }).catch(error => {
      console.log(error);
    });
}

const handleResponse = (response) => {
  if (response !== null) {
      username = response.account.username;
      showWelcomeMessage(response.account);
  } else {
      loadPage();
  }
}

const signIn = () => {
  myMSALObj.loginPopup(loginRequest)
    .then(handleResponse)
    .catch(error => {
        console.error(error);
    });
}

const signOut = () => {
  const logoutRequest = {
      account: myMSALObj.getAccountByUsername(username)
  };

  myMSALObj.logout(logoutRequest);
}

const getTokenPopup = (request) => {
  /**
   * See here for more info on account retrieval: 
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
   */
  request.account = myMSALObj.getAccountByUsername(username);
  return myMSALObj.acquireTokenSilent(request).catch(error => {
      console.warn("silent token acquisition fails. acquiring token using redirect");
      if (error instanceof msal.InteractionRequiredAuthError) {
          // fallback to interaction when silent call fails
          return myMSALObj.acquireTokenPopup(request).then(tokenResponse => {
              console.log(tokenResponse);
              
              return tokenResponse;
          }).catch(error => {
              console.error(error);
          });
      } else {
          console.warn(error);   
      }
  });
}

const seeProfiles = () => {
  getTokenPopup(tokenRequest)
    .then(response => {
      callMSGraph(graphConfig.graphUsersEndpoint, response.accessToken, updateUI);
      profileButton.classList.add("d-none");
    }).catch(error => {
      console.log(error);
    });
}

loadPage();