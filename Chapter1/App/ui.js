// Select DOM elements to work with
const welcomeDiv = document.getElementById("welcomeMessage");
const infoDiv = document.getElementById("infoMessage");
const signInButton = document.getElementById("signIn");
const signOutButton = document.getElementById('signOut');
const cardDiv = document.getElementById("card-div");
const profileButton = document.getElementById("seeProfiles");
const profileDiv = document.getElementById("profile-div");

// a little JQuery to enable bootstrap toasts
$(document).ready(function() {
  if (!myMSALObj.getAccount()) {
    $(".toast").toast("show");
  }
});

function showWelcomeMessage(account) {
    // Reconfiguring DOM elements
    cardDiv.classList.remove('d-none');
    welcomeDiv.innerHTML = `Welcome ${account.name}`;
    welcomeDiv.classList.remove('alert-secondary');
    welcomeDiv.classList.add('alert-success');
    infoDiv.innerHTML = `You belong to the tenant: ${account.idTokenClaims.tid}`
    infoDiv.classList.remove('d-none');
    signInButton.classList.add('d-none');
    signOutButton.classList.remove('d-none');
    profileButton.classList.remove('d-none');
    $(".toast").toast("hide");
}

function updateUI(data) {
  console.log('Graph API responded at: ' + new Date().toString());
  $(".toast").toast("hide");

  data.value.map(user => {
    const name = document.createElement('p');
    name.innerHTML = user.displayName;
    name.classList.add('alert')
    name.classList.add('alert-dark');
    profileDiv.appendChild(name);
  })
}