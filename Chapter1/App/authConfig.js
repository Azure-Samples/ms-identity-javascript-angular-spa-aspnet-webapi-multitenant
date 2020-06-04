 
// Config object to be passed to Msal on creation.
// For a full list of msal.js configuration parameters, 
// visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
const msalConfig = {
  auth: {
    clientId: "Enter_Your_Client_ID_Here",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:3000/",
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
};  
  
// Scopes you add here will be consented once the user authenticates
const loginRequest = {
  scopes: ["openid", "profile", "User.Read.All"]
};

// Add here scopes for access token to be used at MS Graph API endpoint.
const tokenRequest = {
  scopes: ["User.Read.All"]
};